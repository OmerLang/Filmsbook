import { ActorExtended } from "@/types/movies";
import Image from "next/image";
import { ActorOverview } from "./ActorOverview";

export const ActorDetails = ({ actor }: { actor: ActorExtended }) => {
  return (
    <div className="relative flex flex-col pb-4">
      <div className="absolute w-full min-h-130 -z-5">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${actor.movie_credits.cast[0].backdrop_path}`}
          alt={`${actor.name} Movie Poster`}
          fill
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/65 to-[var(--background)]"></div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 mt-20 mb-5 px-4">
        <section className="relative flex flex-col items-center justify-center w-full gap-5 lg:flex-row lg:items-start">
          <div className="aspect-[2/3] w-40 sm:w-50 relative -z-5 rounded-3xl overflow-hidden shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
              alt={actor.name}
              fill
              loading="eager"
              sizes="(max-width: 640px) 145px, (max-width: 768px) 162px, 182px"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 lg:min-h-[300px]">
            <div className="flex flex-col">
              <h1 className="text-gray-200 text-2xl sm:text-3xl z-10 font-medium lg:text-4xl text-shadow-md/20">
                {actor.name}
              </h1>
              <div className="text-gray-200 text-md gap-2">
                <span className=" md:text-shadow-md">
                  Born: {actor.birthday} | {actor.place_of_birth}
                </span>
              </div>
            </div>
            <ActorOverview
              biography={actor.biography}
              className="font-normal md:text-shadow-md/20 text-slate-200 tracking-wide"
            />
          </div>
        </section>
      </div>
    </div>
  );
};
