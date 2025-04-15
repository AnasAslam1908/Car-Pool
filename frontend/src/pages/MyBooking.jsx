import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [ratingInputs, setRatingInputs] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBookings();
        fetchRatings();
    }, []);

    const showMessage = (message, type = "success") => {
        if (type === "success") {
            setSuccessMessage(message);
            setErrorMessage("");
        } else {
            setErrorMessage(message);
            setSuccessMessage("");
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8081/bookings/passenger", {
                withCredentials: true,
            });
            setBookings(response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                showMessage("Please log in first.", "error");
                setTimeout(() => navigate("/login"), 1500);
            } else if (error.response?.status === 403) {
                showMessage("Only passengers can view bookings.", "error");
            } else {
                console.error("Error fetching bookings:", error);
                showMessage("Failed to fetch bookings.", "error");
            }
        }
    };

    const fetchRatings = async () => {
        try {
            const response = await axios.get("http://localhost:8081/ratings/passenger", {
                withCredentials: true,
            });
            setRatings(response.data);
        } catch (error) {
            console.error("Error fetching ratings:", error);
        }
    };

    const cancelBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const response = await axios.delete(`http://localhost:8081/bookings/cancel/${bookingId}`, {
                withCredentials: true,
            });
            showMessage(response.data, "success");
            fetchBookings();
        } catch (error) {
            console.error("Cancellation error:", error);
            showMessage("An error occurred while canceling the booking.", "error");
        }
    };

    const handleRatingChange = (rideId, field, value) => {
        setRatingInputs((prev) => ({
            ...prev,
            [rideId]: {
                ...prev[rideId],
                [field]: value,
            },
        }));
    };

    const submitRating = async (rideId) => {
        const input = ratingInputs[rideId];
        if (!input?.rating || !input?.review) {
            showMessage("Please provide both rating and review.", "error");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8081/ratings/add/${rideId}`,
                new URLSearchParams({
                    rating: input.rating,
                    review: input.review,
                }),
                {
                    withCredentials: true,
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                }
            );
            showMessage(response.data, "success");
            fetchRatings();
        } catch (error) {
            console.error("Rating error:", error);
            showMessage("Failed to submit rating.", "error");
        }
    };

    const getRatingForRide = (rideId) => {
        return ratings.find((r) => r.ride.ride_id === rideId);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6">
            <h2 className="text-3xl text-white font-bold mb-6">My Bookings</h2>

            {/* Feedback messages */}
            {successMessage && (
                <div className="mb-4 p-4 bg-green-100 text-green-700 font-semibold rounded shadow w-full max-w-xl text-center">
                    {successMessage}
                </div>
            )}
            {errorMessage && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 font-semibold rounded shadow w-full max-w-xl text-center">
                    {errorMessage}
                </div>
            )}

            {bookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {bookings.map((booking) => {
                        const existingRating = getRatingForRide(booking.ride.ride_id);
                        return (
                            <div
                                key={booking.booking_id}
                                className="bg-white p-6 rounded-lg shadow-md border flex flex-col justify-between h-full"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-black">{booking.ride.route}</h3>
                                    <p className="text-gray-600"><strong>Seats:</strong> {booking.seats_booked}</p>
                                    <p className="text-gray-600">
                                        <strong>Departure:</strong>{" "}
                                        {new Date(booking.ride.departure_time).toLocaleString()}
                                    </p>
                                    <p className="text-gray-600"><strong>Booking Status:</strong> {booking.status}</p>
                                    <p className="text-gray-600"><strong>Ride Status:</strong> {booking.ride.status}</p>
                                    <p className="text-gray-600"><strong>Booked at:</strong>{" "}
                                        {new Date(booking.booked_at).toLocaleString()}
                                    </p>

                                    {/* Rating logic */}
                                    {booking.ride.status === "COMPLETED" && (
                                        <div className="mt-4">
                                            {existingRating ? (
                                                <div className="bg-gray-100 p-4 rounded">
                                                    <p className="text-green-700 font-semibold">You rated this ride:</p>
                                                    <p><strong>Rating:</strong> {existingRating.rating} / 5</p>
                                                    <p><strong>Review:</strong> {existingRating.review}</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-2">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        max="5"
                                                        placeholder="Rating (1-5)"
                                                        value={ratingInputs[booking.ride.ride_id]?.rating || ""}
                                                        onChange={(e) =>
                                                            handleRatingChange(booking.ride.ride_id, "rating", e.target.value)
                                                        }
                                                        className="w-full p-2 border rounded-md"
                                                    />
                                                    <textarea
                                                        placeholder="Write your review..."
                                                        value={ratingInputs[booking.ride.ride_id]?.review || ""}
                                                        onChange={(e) =>
                                                            handleRatingChange(booking.ride.ride_id, "review", e.target.value)
                                                        }
                                                        className="w-full p-2 border rounded-md"
                                                    />
                                                    <button
                                                        onClick={() => submitRating(booking.ride.ride_id)}
                                                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                                                    >
                                                        Submit Rating
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Cancel button */}
                                {booking.ride.status !== "COMPLETED" && (
                                    <button
                                        onClick={() => cancelBooking(booking.booking_id)}
                                        className="mt-6 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition self-start"
                                    >
                                        Cancel Booking
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-gray-600 text-lg">No bookings found.</p>
            )}
        </div>
    );
};

export default MyBooking;
