import { SectionTitle } from "@/components/typography/typography";
import { MovieReviewsCarousel } from "./MovieReviewsCarousel";

const fakeReviews = [
  {
    rating: 1,
    content: { title: "title 1", body: "body 1" },
    createdAt: new Date("17/05/2026"),
  },
  {
    rating: 2,
    content: { title: "title 2", body: "body 2" },
    createdAt: new Date("17/05/2026"),
  },
  {
    rating: 3,
    content: { title: "title 3", body: "body 3" },
    createdAt: new Date("17/05/2026"),
  },
  {
    rating: 4,
    content: { title: "title 4", body: "body 4" },
    createdAt: new Date("17/05/2026"),
  },
  {
    rating: 5,
    content: { title: "title 5", body: "body 5" },
    createdAt: new Date("17/05/2026"),
  },
];

export const MovieReviewsSection = () => {
  return (
    <section className="flex flex-col gap-2 min-w-full min-h-30">
      <SectionTitle className="px-4">Reviews</SectionTitle>
      <MovieReviewsCarousel className="py-2" reviews={fakeReviews} />
    </section>
  );
};
