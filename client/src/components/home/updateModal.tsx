/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateBook } from '@/app/api/services/books/api';
import { Bounce, toast } from 'react-toastify';
import { useBackgroundContext } from '@/contextApi/darkModeState';
import useAuth from '@/hooks/useAuth';
import { useQueryClient } from '@tanstack/react-query';

interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ isOpen, onClose, book }) => {
  const { status } = useBackgroundContext();
  const [, token] = useAuth();
  const queryClient = useQueryClient();
  if (!isOpen) return null;

  const initialValues = {
    title: book.title,
    author: book.author,
    genre: book.genre,
    publicationYear: String(book.publicationYear),
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    author: Yup.string().required('Author is required'),
    genre: Yup.string().required('Genre is required'),
    publicationYear: Yup.number()
      .typeError('Must be a number')
      .required('Year is required')
      .min(1000, 'Invalid year'),
  });

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      if (!token) throw new Error('Token is missing');
      await updateBook(token, book.id, {
        ...values,
        publicationYear: Number(values.publicationYear),
      });
      toast.success("Book updated successfully!", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
      queryClient.invalidateQueries({ queryKey: ['id'] });
      resetForm();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update book.", {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl w-full max-w-md p-6 ${status ? "text-white" : "text-black"}`}>
        <h2 className="text-xl font-bold mb-4">Update Book</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Title</label>
              <Field name="title" className="input w-full px-3 py-2 border bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Author</label>
              <Field name="author" className="input w-full px-3 py-2 border bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl" />
              <ErrorMessage name="author" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Genre</label>
              <Field name="genre" className="input w-full px-3 py-2 border bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl" />
              <ErrorMessage name="genre" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label className="block font-medium">Publication Year</label>
              <Field name="publicationYear">
                {({ field }: any) => (
                  <select
                    {...field}
                    className="input w-full px-3 py-2 border bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl"
                  >
                    <option value="" disabled>
                      Select a year
                    </option>
                    {Array.from({ length: 126 }, (_, i) => {
                      const year = new Date().getFullYear() - i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                )}
              </Field>
              <ErrorMessage name="publicationYear" component="div" className="text-red-500 text-sm" />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={onClose} className="px-4 py-2 hover:bg-red-500 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl">
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 hover:bg-green-600 bg-white/10 backdrop-blur-2xl rounded-2xl shadow-xl">
                Update Book
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default UpdateModal;
