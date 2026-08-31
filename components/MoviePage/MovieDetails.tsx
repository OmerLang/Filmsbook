import { MovieExtended } from "@/types/movies";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const MovieDetails = ({ movie }: { movie: MovieExtended }) => {
  const {
    credits: { crew, cast },
  } = movie;
  console.log(cast);
  const genres = movie.genres
    .flat(1)
    .map((genre) => genre.name)
    .join(" ● ");
  const filteredCrew = crew.filter(
    (crewMember, index, arr) =>
      arr.findIndex((m) => m.id === crewMember.id) === index,
  );
  return (
    <div>
      <div className="relative flex flex-col justify-center w-full p-4 pb-2 min-h-120 md:p-8 md:pt-3">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          fill
          loading="eager"
          className="object-cover [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_30%,transparent_100%)]"
        />
        <div className="z-1 flex flex-col gap-4 md:items-center md:gap-5">
          <div className="aspect-[2/3] w-50 relative z-1 rounded-3xl overflow-hidden">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              loading="eager"
              sizes="(max-width: 640px) 145px, (max-width: 768px) 162px, 182px"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="flex flex-col gap-2">
            <h1 className="flex md:justify-center text-gray-200 text-4xl z-10 font-semibold tracking-tight">
              {movie.title}
            </h1>
            <div className="flex md:justify-center text-gray-300 gap-2">
              <span>| {movie.runtime} Minutes |</span>
              <span>{genres}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5 lg:flex-row w-full p-4 lg:gap-8">
        <div className="flex flex-col gap-5 pt-0">
          <div className="flex flex-col text-gray-300 gap-2">
            <h2 className="font-medium text-3xl">Overview</h2>
            <p className="text-lg z-10 leading-7">{movie.overview}</p>
          </div>
          <div className="grid text-gray-500 grid-cols-[max-content_max-content] sm:grid-cols-[max-content_max-content_max-content] pt-4 gap-y-4 justify-between">
            {filteredCrew.slice(0, 6).map((crewMember) => (
              <div className="flex flex-col" key={crewMember.credit_id}>
                <div className="flex flex-col">
                  <span className="text-gray-300">{crewMember.job}</span>
                  <span>{crewMember.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {movie.belongs_to_collection?.backdrop_path && (
            <div className="relative overflow-hidden self-center w-full rounded-xl aspect-6/1 sm:aspect-8/1 md:aspect-10/1 lg:aspect-6/1 flex items-center justify-center cursor-pointer hover:scale-103 transition duration-300 ring-1 ring-gray-700 hover:ring-gray-600">
              <Image
                src={`https://image.tmdb.org/t/p/w1280${movie.belongs_to_collection?.backdrop_path}`}
                alt={movie.belongs_to_collection?.name}
                fill
                loading="eager"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/65" />
              <span className="relative z-10 text-gray-200 text-xl font-semibold tracking-wide text-center drop-shadow-md">
                {movie.belongs_to_collection?.name}
              </span>
            </div>
          )}
          <div className="[&>div]:flex [&>div]:justify-between grid grid-cols-1 divide-y divide-gray-500/70 [&>div>*:first-child]:text-gray-300 [&>div>*:nth-child(2)]:text-gray-500 border rounded-xl border-gray-500/70 [&>div]:p-3 mb-4 [&>div]:flex-nowrap min-w-100">
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
      </div>
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {cast.map((actor) => (
            <CarouselItem key={actor.cast_id}>
              <div>{actor.name}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
