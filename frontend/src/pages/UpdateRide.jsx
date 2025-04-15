import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateRide = () => {
    const { rideId } = useParams();
    const navigate = useNavigate();

    const [rideData, setRideData] = useState({
        route: "",
        departure_time: "",
        available_seats: "",
        status: "",
    });

    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        const fetchRide = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/rides/${rideId}`, {
                    withCredentials: true,
                });
                setRideData(response.data);
            } catch (error) {
                console.error("Error:", error);
                setMessage({ text: "Failed to fetch ride details", type: "error" });
            }
        };
        fetchRide();
    }, [rideId]);

    const handleChange = (e) => {
        setRideData({ ...rideData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `http://localhost:8081/rides/update/${rideId}`,
                rideData,
                { withCredentials: true }
            );
            setMessage({ text: "Ride updated successfully! Redirecting...", type: "success" });
            setTimeout(() => navigate("/my-rides"), 1500);
        } catch (error) {
            console.error("Error:", error);
            setMessage({ text: "Failed to update ride.", type: "error" });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Update Ride</h2>

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
                    value={rideData.route}
                    onChange={handleChange}
                    placeholder="Route"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="datetime-local"
                    name="departure_time"
                    value={rideData.departure_time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                    required
                />
                <input
                    type="number"
                    name="available_seats"
                    value={rideData.available_seats}
                    onChange={handleChange}
                    placeholder="Available Seats"
                    className="w-full p-2 border rounded-md"
                    required
                />
                <select
                    name="status"
                    value={rideData.status}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                >
                    <option value="UPCOMING">Upcoming</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="COMPLETED">Completed</option>
                </select>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                >
                    Update Ride
                </button>
            </form>
        </div>
    );
};

export default UpdateRide;
