import { useState, useEffect } from "react";
import axios from "axios";

const UpdateProfile = () => {
    const [user, setUser] = useState({ user_id: "", name: "", email: "", role: "" });
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch user data from session
        axios.get("http://localhost:8081/auth/session", { withCredentials: true })
            .then(response => {
                setUser(response.data); // Load user info into form
            })
            .catch(() => setMessage("Failed to load user data."));
    }, []);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put("http://localhost:8081/auth/update", user, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            setMessage(response.data);
        } catch (error) {
            setMessage(error.response?.data || "Update failed.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-transparent">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
                {message && (
                    <p className={`text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="full_name"
                        value={user.full_name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                        required
                    />
                    <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        placeholder="Phone "
                        onChange={handleChange}
                        className="w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition text-center"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
