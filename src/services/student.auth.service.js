const API_URL = import.meta.env.VITE_API_URL;

export const handVerifyTokenApi = async () => {
    const response = await fetch(`${API_URL}/api/auth/verify-token`, {
        method: "GET",
        credentials: "include",
    });

    const data = await response.json();

    return data;
};
export const handleLogoutApi = async () => {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();
    return data

};
export const handleLoginApi = async () => {
    const res = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include", body: JSON.stringify(),
    });

    const data = await res.json();
    return data

};
export async function fetchQuizDetailApi(id) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/student/${id}`);
    const data1 = await res.json();
    return data1;
}