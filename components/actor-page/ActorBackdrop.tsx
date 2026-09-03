import Image from "next/image";

type ActorBackdropProps = {
  backdropPath: string | null;
  title: string;
};

export const ActorBackdrop = ({ backdropPath, title }: ActorBackdropProps) => {
  return (
    <div className="absolute w-full min-h-130 z-0">
      <Image
        src={
          backdropPath
            ? `https://image.tmdb.org/t/p/w1280${backdropPath}`
            : "/images/brand-images/filmsbook_backdrop.png"
        }
        alt={`${title} Movie Poster`}
        fill
        loading="eager"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/65 to-[var(--background)]"></div>
    </div>
  );
};
