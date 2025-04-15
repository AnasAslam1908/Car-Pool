import { useEffect, useState } from "react";
import axios from "axios";

const ManageBookingsByAdmin = () => {
    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8081/admin/bookings", {
                withCredentials: true,
            });
            setBookings(response.data);
        } catch (err) {
            setError("Failed to fetch bookings.");
        }
    };

    const deleteBooking = async (bookingId) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;

        try {
            await axios.delete(`http://localhost:8081/admin/delete/booking/${bookingId}`, {
                withCredentials: true,
            });
            setBookings(bookings.filter((booking) => booking.booking_id !== bookingId));
        } catch (err) {
            alert("Failed to delete booking.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {bookings.length === 0 ? (
                <p className="text-gray-600">No bookings found.</p>
            ) : (
                <table className="table-auto w-full bg-white border border-gray-200 rounded shadow-md">
                    <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2  border text-left">Booking ID</th>
                        <th className="px-4 py-2  border text-left">Passenger</th>
                        <th className="px-4 py-2  border text-left">Ride ID</th>
                        <th className="px-4 py-2  border text-left">Seats Booked</th>
                        <th className="px-4 py-2  border text-left">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.booking_id} className="hover:bg-gray-50">
                            <td className="px-4 py-2  border text-left">{booking.booking_id}</td>
                            <td className="px-4 py-2  border text-left">{booking.passenger?.full_name}</td>
                            <td className="px-4 py-2  border text-left">{booking.ride?.ride_id}</td>
                            <td className="px-4 py-2  border text-left">{booking.seats_booked}</td>
                            <td className="px-4 py-2  border text-left">
                                <button
                                    onClick={() => deleteBooking(booking.booking_id)}
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

export default ManageBookingsByAdmin;
