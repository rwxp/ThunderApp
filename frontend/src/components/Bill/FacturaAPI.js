const API_URL = "http://127.0.0.1:8000/api/bills/";

export const getBill = async (userId = 0) => {
    return await fetch(`${API_URL}${userId}`);
};