async function register() {
    try {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirm_password = document.getElementById("confirm-password").value;

        if (password != confirm_password) return;

        const response = await axios.post("/api/register/", {
            username: username,
            password: password
        });

        console.log("Registered successfully: ", response.data);
    } catch (error) {
        console.log("Registration failed: ", error.response);
    }
}