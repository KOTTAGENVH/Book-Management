import { apiClient } from "../../axios/api";

//get user profile details
export const getUserProfile = async (token: string) => {
    try {
        const response = await apiClient.get(`/profile`, {
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