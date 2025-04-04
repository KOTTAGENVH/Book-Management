import { apiClient } from "../../axios/api";

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