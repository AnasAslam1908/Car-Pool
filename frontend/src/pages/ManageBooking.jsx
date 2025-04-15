import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ManageBooking = () => {
    const [rides, setRides] = useState([]);
    const [error, setError] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8081/rides/my-rides", { withCredentials: true })
            .then((response) => setRides(response.data))
            .catch((err) => setError(err.message));
    }, []);

    const handleDelete = async (rideId) => {
        if (!window.confirm("Are you sure you want to delete this ride?")) return;

        try {
            await axios.delete(`http://localhost:8081/rides/delete/${rideId}`, { withCredentials: true });
            setMessage({ text: "Ride deleted successfully!", type: "success" });
            setRides(rides.filter((ride) => ride.ride_id !== rideId));
            setTimeout(() => navigate("/manage-bookings"), 1000);
        } catch (error) {
            setMessage({ text: error.response?.data || error.message, type: "error" });
        }
    };

    const handleUpdate = (rideId) => {
        navigate(`/update-ride/${rideId}`);
    };

    const handleStatusChange = async (rideId, newStatus) => {
        try {
            await axios.put(`http://localhost:8081/rides/status/${rideId}`, {}, {
                params: { status: newStatus },
                withCredentials: true,
            });
            setMessage({ text: "Ride status updated!", type: "success" });
            setRides(rides.map((ride) =>
                ride.ride_id === rideId ? { ...ride, status: newStatus } : ride
            ));
            setTimeout(() => navigate("/manage-bookings"), 1000);
        } catch (error) {
            setMessage({ text: "Failed to update status.", type: "error" });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-center">
                <h2 className="text-4xl text-white font-bold bg-black  mb-8">Manage
                    Bookings</h2>
            </div>
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

                {error && <p className="text-red-500">{error}</p>}

                {rides.length === 0 ? (
                    <p className="text-gray-600">No rides found.</p>
                ) : (
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3 border">Route</th>
                            <th className="p-3 border">Departure</th>
                            <th className="p-3 border">Seats</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rides.map((ride) => (
                            <tr key={ride.ride_id} className="text-center border">
                                <td className="p-3 border">{ride.route}</td>
                                <td className="p-3 border">{new Date(ride.departure_time).toLocaleString()}</td>
                                <td className="p-3 border">{ride.available_seats}</td>
                                <td className="p-3 border">{ride.status}</td>
                                <td className="p-3 border flex flex-col md:flex-row justify-center items-center gap-2">
                                    <button onClick={() => handleUpdate(ride.ride_id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded">Edit
                                    </button>
                                    <button onClick={() => handleDelete(ride.ride_id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded">Delete
                                    </button>
                                    <select onChange={(e) => handleStatusChange(ride.ride_id, e.target.value)}
                                            value={ride.status} className="border px-2 py-1 rounded">
                                        <option value="UPCOMING">Upcoming</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            );
            };

            export default ManageBooking;
