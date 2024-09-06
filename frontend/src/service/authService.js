import { config } from "../config";

const API_BASE_URL = config.base_url;

export const authService = {
    login: async (credentials) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to login');
            }

            const data = await response.json();
            console.log(data.message);
            return data.token; // Return the token if needed
        } catch (error) {
            console.error('Error logging in:', error.message);
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to register user');
            }

            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error('Error registering user:', error.message);
            throw error;
        }
    }
};

export default authService;
