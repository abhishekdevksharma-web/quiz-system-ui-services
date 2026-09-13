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
export const handleSearchQuizApi = async (data) => {
    try {
        const response = await fetch(`${API_URL}/api/student/quiz/search?q=${encodeURIComponent(data.trim())}`);
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const handleFetchQuizQuestionApi = async (quizId) => {
    try {
        const response = await fetch(`${API_URL}/api/student/start-quiz/${quizId}`);
        const res = await response.json();
        return res;
    } catch (error) {
        console.log(error);

    }
}
export const handleValidateAnswerApi = async (data) => {
    console.log(data);

    try {
        const responce = await fetch(
            `${import.meta.env.VITE_API_URL}/api/student/validateanswer`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
        );
        const result = await responce.json();
        return result;

    } catch (error) {
        console.log(error);

    }
}