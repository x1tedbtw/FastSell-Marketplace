const cookie_name = "auth_token";

export function saveToken(token) {
    document.cookie = cookie_name + "=" + token + "; ";
}

export async function validateToken() {
    const token = getToken();
    
    if (token == undefined || token == null) return false;

    try {
        const response = await axios.get(`/api/tokens/${token}`, {
            headers: {
                "Authorization": `Token ${token}`
            }
        });
        return response.status === 200;
    } catch (error) {
        return false;
    }
}

function getToken() {
    return document.cookie.split("; ").find((row) => row.startsWith(cookie_name))?.split("=")[1];
}
