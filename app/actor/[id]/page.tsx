import { getQueryClient } from "@/utills/query_client/getQueryClient";
import { getSingleActorOptions } from "@/utills/query_options/options";
import { ActorExtended } from "@/types/movies";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ActorDetails } from "@/components/ActorPage/ActorDetails";

export default async function ActorPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id: actorId } = await params;
  const queryClient = getQueryClient();
  const actor = await queryClient.fetchQuery({
    ...getSingleActorOptions(actorId),
    queryFn: async (): Promise<ActorExtended> => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${actorId}?append_to_response=movie_credits&language=en-US?`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.TMDB_KEY ?? ""}`,
          },
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
