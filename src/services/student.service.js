const API_URL = import.meta.env.VITE_API_URL;

export const handFetchStudentQuizApi = async (pageNumber, limit) => {

    const response = await fetch(`${API_URL}/api/student/quiz/history?page=${pageNumber}&limit=${limit}`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    return data;
};
