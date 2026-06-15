import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from "formik";

import * as Yup from "yup";

import type { Review } from "../types/Review";

interface Props {
  movieId: number;

  onSubmitReview: (review: Omit<Review, "id">) => void;

  editingReview: Review | null;
}

const ReviewForm = ({
  movieId,
  onSubmitReview,
  editingReview,
}: Props) => {
  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: editingReview?.name || "",
        rating: editingReview?.rating || 5,
        comment: editingReview?.comment || "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().required("Nom requis"),
        rating: Yup.number().min(1).max(5).required(),
        comment: Yup.string().required("Commentaire requis"),
      })}
      onSubmit={(values, { resetForm }) => {
        onSubmitReview({
          movieId,
          name: values.name,
          rating: values.rating,
          comment: values.comment,
        });

        resetForm();
      }}
    >
      <Form className="border p-4 rounded-lg mt-8">
        <h2 className="text-xl font-bold mb-4">
          {editingReview ? "Modifier un avis" : "Ajouter un avis"}
        </h2>

        <Field
          name="name"
          placeholder="Nom"
          className="border p-2 w-full mb-2"
        />
        <ErrorMessage name="name" component="div" className="text-red-500" />

        <Field as="select" name="rating" className="border p-2 w-full mb-2">
          <option value={1}>⭐</option>
          <option value={2}>⭐⭐</option>
          <option value={3}>⭐⭐⭐</option>
          <option value={4}>⭐⭐⭐⭐</option>
          <option value={5}>⭐⭐⭐⭐⭐</option>
        </Field>

        <Field
          as="textarea"
          name="comment"
          placeholder="Commentaire"
          className="border p-2 w-full mb-2"
        />
        <ErrorMessage name="comment" component="div" className="text-red-500" />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingReview ? "Mettre à jour" : "Publier"}
        </button>
      </Form>
    </Formik>
  );
};

export default ReviewForm;