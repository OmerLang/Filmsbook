import Image from "next/image";

export const MovieBackdrop = ({
  backdropPath,
  title,
}: {
  backdropPath?: string;
  title: string;
}) => {
  if (!backdropPath) return null;
  return (
    <div className="absolute w-full min-h-130 -z-5">
      <Image
        src={`https://image.tmdb.org/t/p/w1280${backdropPath}`}
        alt={title}
        fill
        loading="eager"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/45 to-[var(--background)]"></div>
    </div>
  );
};
