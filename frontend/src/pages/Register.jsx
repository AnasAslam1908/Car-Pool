import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        role: "PASSENGER",
    });

    const [message, setMessage] = useState({ text: "", type: "" }); // success or error

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8081/auth/register", formData, {
                headers: { "Content-Type": "application/json" },
            });

            if (response.status === 200) {
                setMessage({ text: "Registration successful! Redirecting to login...", type: "success" });
                setTimeout(() => navigate("/login"), 1500); // delay for user to read message
            } else {
                setMessage({ text: "Registration failed. Try again.", type: "error" });
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage({ text: "An error occurred during registration.", type: "error" });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone (Optional)"
                        onChange={handleChange}
                        className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <select
                        name="role"
                        onChange={handleChange}
                        className="p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    >
                        <option value="PASSENGER">Passenger</option>
                        <option value="DRIVER">Driver</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
