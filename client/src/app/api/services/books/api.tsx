import { apiClient } from "../../axios/api";

export interface BookPayload {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
}

//get all books
export const getAllBooks = async (token: string) => {
  try {
    const response = await apiClient.get(`/books`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
};

//Delete a book
export const deleteBook = async (token: string, id: string) => {
  try {
    const response = await apiClient.delete(`/books/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting book:", error);
    throw error;
  }
}

// Create a book
export const createBook = async (token: string, bookData: BookPayload) => {
  try {
    const response = await apiClient.post(`/books`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

// Update a book
export const updateBook = async (token: string, id: string, bookData: BookPayload) => {
  try {
    const response = await apiClient.patch(`/books/${id}`, bookData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating book:", error);
    throw error;
  }
}

//Get books by email
export const getBooksByEmail = async (token: string) => {
  try {
    const response = await apiClient.get(`/books/email`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching books by email:", error);
    throw error;
  }
}
