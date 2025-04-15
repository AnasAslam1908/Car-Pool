import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [message, setMessage] = useState({ text: "", type: "" }); // type can be "success" or "error"
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8081/auth/login",
                new URLSearchParams(credentials),
                {
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    withCredentials: true,
                }
            );
            localStorage.setItem("isLoggedIn", "true");
            setMessage({ text: "Login successful!", type: "success" });
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (error) {
            setMessage({ text: "Invalid email or password.", type: "error" });
            console.error("Login error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                {message.text && (
                    <div
                        className={`w-full mb-4 p-3 text-sm text-center rounded-lg ${
                            message.type === "success"
                                ? "bg-green-100 text-green-700 border border-green-300"
                                : "bg-red-100 text-red-700 border border-red-300"
                        }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition text-center"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
