import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateRide = () => {
    const [rideData, setRideData] = useState({
        route: "",
        departure_time: "",
        available_seats: "",
    });

    const [message, setMessage] = useState({ text: "", type: "" });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setRideData({ ...rideData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:8081/rides/create-ride",
                rideData,
                { withCredentials: true }
            );

            setMessage({ text: "Ride created successfully! Redirecting...", type: "success" });
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (error) {
            console.error("Error:", error);
            const errorMsg = error.response?.data || "Failed to create ride";
            setMessage({ text: `Error: ${errorMsg}`, type: "error" });
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-4">Create a Ride</h2>

            {message.text && (
                <div
                    className={`mb-4 p-3 text-sm text-center rounded-lg ${
                        message.type === "success"
                            ? "bg-green-100 text-green-700 border border-green-300"
                            : "bg-red-100 text-red-700 border border-red-300"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="route"
                    placeholder="Enter Route"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="datetime-local"
                    name="departure_time"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="available_seats"
                    placeholder="Seats Available"
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Create Ride
                </button>
            </form>
        </div>
    );
};

export default CreateRide;
