import { ActorExtended } from "@/types/movies";
import Image from "next/image";

export const ActorDetails = ({ actor }: { actor: ActorExtended }) => {
  return (
    <div className="flex flex-col pb-4">
      <div className="absolute w-full min-h-130 -z-5">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${actor.movie_credits.cast[0].backdrop_path}`}
          alt={`${actor.name} Movie Poster`}
          fill
          loading="eager"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/45 to-[var(--background)]"></div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 mt-12 mb-5 px-4">
        <section className="relative flex flex-col justify-center w-full">
          <div className="z-1 flex pt-10 flex-col gap-4 items-center md:items-start lg:flex-row lg:items-end">
            <div className="aspect-[2/3] w-40 sm:w-50 relative z-1 rounded-3xl overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                fill
                loading="eager"
                sizes="(max-width: 640px) 145px, (max-width: 768px) 162px, 182px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="flex justify-center sm:justify-start text-gray-200 text-2xl sm:text-3xl z-10 font-semibold tracking-tight lg:text-4xl">
                {actor.name}
              </h1>
              <div className="flex justify-center md:justify-start text-gray-300 gap-2">
                <span>| Birthday: {actor.birthday} |</span>
                <span>Born in: {actor.place_of_birth} |</span>
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col gap-8 lg:flex-row w-full">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col text-gray-300 gap-2">
              <h2 className="font-medium text-3xl">Overview</h2>
              <p className="text-lg z-10 leading-7">{actor.biography}</p>
            </div>
            {/* <div className="grid text-gray-500 grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content] gap-y-4 justify-between">
              {filteredCrew.slice(0, 6).map((crewMember) => (
                <div key={crewMember.credit_id}>
                  <div className="flex flex-col">
                    <span className="text-gray-300">{crewMember.job}</span>
                    <span>{crewMember.name}</span>
                  </div>
                </div>
              ))}
            </div> */}
          </div>
          {/* <div className="flex flex-col gap-4 min-w-80">
            {movie.belongs_to_collection?.backdrop_path && (
              <div className="relative group overflow-hidden self-center w-full rounded-xl aspect-6/1 sm:aspect-8/1 md:aspect-10/1 lg:aspect-6/1 flex items-center justify-center cursor-pointer hover:scale-103 transition duration-300 ring-1 ring-gray-700 hover:ring-gray-600">
                <Image
                  src={`https://image.tmdb.org/t/p/w1280${movie.belongs_to_collection?.backdrop_path}`}
                  alt={movie.belongs_to_collection?.name}
                  fill
                  loading="eager"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-all" />
                <span className="relative z-10 text-gray-200 text-xl font-semibold tracking-wide text-center drop-shadow-md/35">
                  {movie.belongs_to_collection?.name}
                </span>
              </div>
            )}
            <div className="[&>div]:flex [&>div]:justify-between grid grid-cols-1 divide-y divide-gray-500/40 [&>div>*:first-child]:text-gray-300 [&>div>*:nth-child(2)]:text-gray-500 border rounded-xl border-gray-500/40 [&>div]:p-3 [&>div]:flex-nowrap w-full">
              <div>
                <span>Status</span>
                <span>{movie.status}</span>
              </div>
              <div>
                <span>Release Date</span>
                <span>{movie.release_date}</span>
              </div>
              <div>
                <span>Revenue</span>
                <span>${movie.revenue.toLocaleString()}</span>
              </div>
              <div>
                <span>Budget</span>
                <span>${movie.budget.toLocaleString()}</span>
              </div>
              <div>
                <span>Original Language</span>
                <span>{movie.original_language.toUpperCase()}</span>
              </div>
              <div>
                <span>Studio</span>
                <span>{movie.production_companies[0]?.name}</span>
              </div>
            </div>
          </div> */}
        </section>
      </div>
      {/* <section className="flex flex-col gap-2">
        <div className="px-4">
          <h2 className="font-medium text-3xl text-gray-300">Cast</h2>
        </div>
        <AutoCarousel cast={cast} className="py-2" />
      </section> */}
    </div>
  );
};
