import { useEffect, useState } from "react";
import type { Review } from "../types/Review";

const STORAGE_KEY = "movie_reviews";

export const useReviews = (movieId: number) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const loadReviews = () => {
    const stored = localStorage.getItem(STORAGE_KEY);

    const allReviews: Review[] = stored
      ? JSON.parse(stored)
      : [];

    setReviews(
      allReviews.filter(
        (review) => review.movieId === movieId
      )
    );
  };

  useEffect(() => {
    loadReviews();
  }, [movieId]);

  const addReview = (review: Omit<Review, "id">) => {
    const stored = localStorage.getItem(STORAGE_KEY);

    const allReviews: Review[] = stored
      ? JSON.parse(stored)
      : [];

    const newReview: Review = {
      ...review,
      id: crypto.randomUUID(),
    };

    const updated = [...allReviews, newReview];

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    loadReviews();
  };

  const deleteReview = (reviewId: string) => {
    const stored = localStorage.getItem(STORAGE_KEY);

    const allReviews: Review[] = stored
      ? JSON.parse(stored)
      : [];

    const updated = allReviews.filter(
      (review) => review.id !== reviewId
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    loadReviews();
  };

  const updateReview = (updatedReview: Review) => {
    const stored = localStorage.getItem(STORAGE_KEY);

    const allReviews: Review[] = stored
      ? JSON.parse(stored)
      : [];

    const updated = allReviews.map((review) =>
      review.id === updatedReview.id ? updatedReview : review
    );

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updated)
    );

    loadReviews();
  };

  return {
    reviews,
    addReview,
    deleteReview,
    updateReview,
  };
};

export type { Review };