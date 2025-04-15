import { useEffect, useState } from "react";
import axios from "axios";

const ManageRides = () => {
    const [rides, setRides] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await axios.get("http://localhost:8081/admin/rides", {
                withCredentials: true,
            });
            setRides(response.data);
        } catch (err) {
            setError("Failed to fetch rides.");
        }
    };

    const deleteRide = async (rideId) => {
        if (!window.confirm("Are you sure you want to delete this ride?")) return;

        try {
            await axios.delete(`http://localhost:8081/admin/delete/ride/${rideId}`, {
                withCredentials: true,
            });
            setRides(rides.filter((ride) => ride.ride_id !== rideId));
        } catch (err) {
            alert("Failed to delete ride.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Rides</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {rides.length === 0 ? (
                <p className="text-gray-600">No rides found.</p>
            ) : (
                <table className="table-auto w-full bg-white border border-gray-200 rounded shadow-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border text-left ">Ride ID</th>
                        <th className="px-4 py-2 border text-left ">Route</th>
                        <th className="px-4 py-2 border text-left ">Departure</th>
                        <th className="px-4 py-2 border text-left ">Status</th>
                        <th className="px-4 py-2 border text-left ">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rides.map((ride) => (
                        <tr key={ride.ride_id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-2 border text-left ">{ride.ride_id}</td>
                            <td className="px-4 py-2 border text-left ">{ride.route}</td>
                            <td className="px-4 py-2 border text-left ">
                                {new Date(ride.departure_time).toLocaleString()}
                            </td>
                            <td className="px-4 py-2 border text-left ">{ride.status}</td>
                            <td className="px-4 py-2 border text-left ">
                                <button
                                    onClick={() => deleteRide(ride.ride_id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageRides;
