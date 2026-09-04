import { MovieExtended } from "@/types/movies";
import Image from "next/image";
import { SectionTitle } from "../typography/typography";

export const MovieOverview = ({ movie }: { movie: MovieExtended }) => {
  const {
    credits: { crew },
  } = movie;
  const filteredCrew = crew.filter(
    (crewMember, index, arr) =>
      arr.findIndex((m) => m.id === crewMember.id) === index,
  );

  return (
    <section className="flex flex-col gap-8 lg:flex-row w-full">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="italic text-xl text-slate-400">{movie.tagline}</span>
          <SectionTitle>Overview</SectionTitle>
          <p className="text-base z-10 text-gray-400 leading-6">
            {movie.overview}
          </p>
        </div>
        <div className="grid text-gray-500 grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content] gap-y-4 justify-between">
          {filteredCrew.slice(0, 6).map((crewMember) => (
            <div key={crewMember.credit_id}>
              <div className="flex flex-col">
                <span className="text-gray-300">{crewMember.job}</span>
                <span>{crewMember.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4 min-w-80">
        {movie.belongs_to_collection?.backdrop_path && (
          <div className="relative group overflow-hidden self-center w-full rounded-xl aspect-8/1 sm:aspect-8/1 md:aspect-12/1 lg:aspect-6/1 flex items-center justify-center cursor-pointer hover:scale-103 transition duration-300 ring-1 ring-gray-700 hover:ring-gray-600">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie.belongs_to_collection?.backdrop_path}`}
              alt={movie.belongs_to_collection?.name}
              fill
              loading="eager"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-all" />
            <span className="relative z-10 text-gray-200/95 text-xl tracking-wide text-center drop-shadow-md/35">
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
      </div>
    </section>
  );
};
