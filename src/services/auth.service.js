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