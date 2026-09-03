import { Metadata } from "next";
import { getQueryClient } from "@/utils/query_client/getQueryClient";
import { getSingleActorOptions } from "@/utils/query_options/options";
import { ActorExtended } from "@/types/movies";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ActorDetails } from "@/components/actor-page/ActorDetails";

type ActorPageProps = {
  params: Promise<{ id: number }>;
};

const HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${process.env.TMDB_KEY ?? ""}`,
};

export const generateMetadata = async ({
  params,
}: ActorPageProps): Promise<Metadata> => {
  const { id: actorId } = await params;
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${actorId}?append_to_response=movie_credits&language=en-US?`,
      {
        method: "GET",
        headers: HEADERS,
        next: { revalidate: 3600 },
      },
    );
    if (!res.ok) return { title: "Actor Details" };
    const actor: ActorExtended = await res.json();
    const description =
      actor.biography ||
      `Discover actor filmography, career highlights, and movies on Filmsbook.`;
    const imageURL = actor.profile_path
      ? `https://image.tmdb.org/t/p/w780${actor.profile_path}`
      : undefined;
    return {
      title: `${actor.name}`,
      description,
      alternates: {
        canonical: `/actor/${actorId}`,
      },
      openGraph: {
        title: `${actor.name}`,
        description,
        images: imageURL ? [{ url: imageURL, alt: actor.name }] : [],
      },
      twitter: {
        title: `${actor.name}`,
        description,
        images: imageURL ? [imageURL] : [],
      },
    };
  } catch {
    return { title: "Actor Details" };
  }
};

export default async function ActorPage({ params }: ActorPageProps) {
  const { id: actorId } = await params;
  const queryClient = getQueryClient();
  const actor = await queryClient.fetchQuery({
    ...getSingleActorOptions(actorId),
    queryFn: async (): Promise<ActorExtended> => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}?append_to_response=movie_credits&language=en-US?`,
        {
          method: "GET",
          headers: HEADERS,
          next: { revalidate: 3600 },
        },
      );
      if (!res.ok) throw new Error("Failed to fetch actor from local api");

      return res.json();
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ActorDetails actor={actor} />
    </HydrationBoundary>
  );
}
