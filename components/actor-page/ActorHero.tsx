import { ActorExtended } from "@/types/movies";
import Image from "next/image";
import { ActorOverview } from "./ActorOverview";

export const ActorHero = ({ actor }: { actor: ActorExtended }) => {
  const { name, profile_path } = actor;
  return (
    <section
      className="relative flex flex-col relative flex flex-col items-center justify-center w-full p-5 gap-5 lg:flex-row lg:items-start"
      aria-labelledby="actor-name"
    >
      <div className="aspect-[2/3] w-40 sm:w-50 relative z-10 rounded-3xl overflow-hidden shrink-0 ring-2 ring-gray-600">
        <Image
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w500${profile_path}`
              : "/images/actor_placeholder/placeholder.jpg"
          }
          alt={name}
          fill
          loading="eager"
          sizes="(max-width: 640px) 145px, (max-width: 768px) 162px, 182px"
          className="object-cover"
        />
      </div>
      <ActorOverview
        actor={actor}
        className="flex flex-col gap-5 lg:min-h-[300px] font-normal md:text-shadow-md/20 text-slate-200 tracking-wide"
      />
    </section>
  );
};
