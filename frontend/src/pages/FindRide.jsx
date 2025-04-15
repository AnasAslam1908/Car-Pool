import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FindRide = () => {
    const [rides, setRides] = useState([]);
    const [searchRoute, setSearchRoute] = useState("");
    const [bookingRide, setBookingRide] = useState(null);
    const [seatsToBook, setSeatsToBook] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });

    const navigate = useNavigate();

    useEffect(() => {
        fetchRides();
    }, []);

    const fetchRides = async () => {
        try {
            const response = await axios.get("http://localhost:8081/rides", { withCredentials: true });
            setRides(response.data);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage({ text: "Please log in first", type: "error" });
                setTimeout(() => navigate("/login"), 1500);
            } else {
                console.error("Error fetching rides:", error);
                setMessage({ text: "Error fetching rides.", type: "error" });
            }
        }
    };

    const handleSearch = (e) => {
        setSearchRoute(e.target.value);
    };

    const filteredRides = rides.filter(ride =>
        ride.route.toLowerCase().includes(searchRoute.toLowerCase())
    );

    const handleBookClick = (ride) => {
        if (ride.available_seats > 0) {
            setBookingRide(ride);
            setSeatsToBook("");
            setMessage({ text: "", type: "" });
        } else {
            setMessage({ text: "No seats available for this ride.", type: "error" });
        }
    };

    const handleBook = async () => {
        if (!bookingRide) {
            setMessage({ text: "No ride selected for booking.", type: "error" });
            return;
        }

        const seats = parseInt(seatsToBook, 10);
        if (!seats || seats <= 0) {
            setMessage({ text: "Invalid number of seats.", type: "error" });
            return;
        }

        if (seats > bookingRide.available_seats) {
            setMessage({ text: "Not enough seats available.", type: "error" });
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:8081/bookings/book/${bookingRide.ride_id}/${seats}`,
                {},
                { withCredentials: true }
            );

            const messageText = response.data;

            if (response.status === 401) {
                setMessage({ text: messageText, type: "error" });
                setTimeout(() => navigate("/login"), 1500);
                return;
            }

            if (response.status === 200) {
                setMessage({ text: messageText, type: "success" });
                setBookingRide(null);
                fetchRides();

                setTimeout(() => {
                    setMessage({ text: "", type: "" });
                    navigate("/dashboard"); // you can change this route if needed
                }, 1500);
            } else {
                setMessage({ text: "Error: " + messageText, type: "error" });
            }
        } catch (error) {
            console.error("Booking error:", error);
            setMessage({ text: "An error occurred while booking.", type: "error" });
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl text-white font-semibold mb-4">Find a Ride</h2>

            {/* Message Div */}
            {message.text && (
                <div className={`p-4 mb-6 rounded-lg text-center font-semibold 
                    ${message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {message.text}
                </div>
            )}

            <input
                type="text"
                placeholder="Search by route..."
                value={searchRoute}
                onChange={handleSearch}
                className="w-full p-3 mb-6 text-white border-white border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 text-white border-white lg:grid-cols-3 gap-6">
                {filteredRides.length > 0 ? (
                    filteredRides.map((ride) => (
                        <div key={ride.ride_id} className="bg-white p-6 rounded-lg shadow-lg">
                            <h3 className="text-xl text-black font-semibold mb-2">Route: {ride.route}</h3>
                            <p className="text-gray-600 mb-2">Departure: {new Date(ride.departure_time).toLocaleString()}</p>
                            <p className="text-gray-600 mb-4">Seats Available: {ride.available_seats}</p>
                            <button
                                onClick={() => handleBookClick(ride)}
                                className="w-full bg-black text-white py-2 rounded-lg hover:bg-transparent hover:font-bold hover:text-black transition"
                            >
                                Book Now
                            </button>

                            {bookingRide && bookingRide.ride_id === ride.ride_id && (
                                <div className="mt-4">
                                    <input
                                        type="number"
                                        placeholder="Enter number of seats"
                                        value={seatsToBook}
                                        onChange={(e) => setSeatsToBook(e.target.value)}
                                        className="w-full p-3 mb-4 border-black rounded-lg focus:outline-black text-black "
                                    />
                                    <button
                                        onClick={handleBook}
                                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                                    >
                                        Confirm Booking
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-white bold text-4xl col-span-3">No rides available.</p>
                )}
            </div>
        </div>
    );
};

export default FindRide;
