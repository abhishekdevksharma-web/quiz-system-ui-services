const API_URL = import.meta.env.VITE_API_URL;

export const handleCreateQuizApi = async (Question, UserQuizMeta) => {
    try {
        const response = await fetch(`${API_URL}/admin/createquiz`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...UserQuizMeta,
                questions: Question,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}
export const handleUpdateQuizApi = async (data) => {
    try {
        const response = await fetch(`${API_URL}/admin/update-quiz-settings`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}