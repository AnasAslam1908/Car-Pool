import { useEffect, useState } from "react";
import axios from "axios";

const MyRides = () => {
    const [rides, setRides] = useState([]);
    const [error, setError] = useState(null);
    const [passengers, setPassengers] = useState({});
    const [ratings, setRatings] = useState({});
    const [selectedRide, setSelectedRide] = useState(null);

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const res = await axios.get("http://localhost:8081/rides/my-rides", {
                withCredentials: true,
            });
            setRides(res.data);
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) setError("Unauthorized: Please log in first.");
            else if (status === 403) setError("Forbidden: You don't have access.");
            else setError("Failed to fetch rides.");
        }
    };

    const fetchPassengersAndRatings = async (rideId) => {
        if (selectedRide === rideId) {
            setSelectedRide(null); // toggle off
            return;
        }

        try {
            const [passengerRes, ratingRes] = await Promise.all([
                axios.get(`http://localhost:8081/bookings/ride/${rideId}`, {
                    withCredentials: true,
                }),
                axios.get(`http://localhost:8081/ratings/ride/${rideId}`, {
                    withCredentials: true,
                }),
            ]);

            setPassengers((prev) => ({ ...prev, [rideId]: passengerRes.data }));
            setRatings((prev) => ({ ...prev, [rideId]: ratingRes.data }));
            setSelectedRide(rideId);
        } catch (err) {
            const status = err.response?.status;
            if (status === 401) alert("Unauthorized: Please log in.");
            else if (status === 403) alert("Access denied.");
            else alert("Failed to fetch ride details.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold mb-4">My Rides</h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {rides.length === 0 && !error ? (
                <p className="text-gray-600">No rides found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 shadow-md rounded">
                        <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3 border">Ride ID</th>
                            <th className="p-3 border">Route</th>
                            <th className="p-3 border">Departure Time</th>
                            <th className="p-3 border">Seats</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rides.map((ride) => (
                            <tr key={ride.ride_id} className="border-b hover:bg-gray-100 text-center">
                                <td className="p-3 border">{ride.ride_id}</td>
                                <td className="p-3 border">{ride.route}</td>
                                <td className="p-3 border">{new Date(ride.departure_time).toLocaleString()}</td>
                                <td className="p-3 border">{ride.available_seats}</td>
                                <td
                                    className={`p-3 border font-semibold text-${ride.status.toLowerCase() === "active" ? "green" : "red"}-500`}
                                >
                                    {ride.status}
                                </td>
                                <td className="p-3 border">
                                    <button
                                        onClick={() => fetchPassengersAndRatings(ride.ride_id)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                                    >
                                        {selectedRide === ride.ride_id ? "Hide Details" : "View Details"}
                                    </button>

                                    {selectedRide === ride.ride_id && (
                                        <div className="mt-3 text-left">
                                            {/* Passengers */}
                                            <div className="bg-gray-100 rounded p-2 mb-2">
                                                <h4 className="font-semibold mb-1">Passengers:</h4>
                                                {passengers[ride.ride_id]?.length > 0 ? (
                                                    <ul className="list-disc pl-4">
                                                        {passengers[ride.ride_id].map((p) => (
                                                            <li key={p.booking_id}>
                                                                {p.passenger.full_name} – {p.seats_booked} seat(s)
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-500">No passengers</p>
                                                )}
                                            </div>

                                            {/* Ratings */}
                                            <div className="bg-gray-100 rounded p-2">
                                                <h4 className="font-semibold mb-1">Ratings:</h4>
                                                {ratings[ride.ride_id]?.length > 0 ? (
                                                    <ul className="space-y-2">
                                                        {ratings[ride.ride_id].map((r) => (
                                                            <li key={r.rating_id} className="border-b pb-1">
                                                                <p>
                                                                    <strong>{r.passenger.full_name}</strong> rated{" "}
                                                                    <strong>{r.rating}</strong>/5
                                                                </p>
                                                                <p className="text-gray-600 italic">"{r.review}"</p>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <p className="text-gray-500">No ratings yet</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyRides;
