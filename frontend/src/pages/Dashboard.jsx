import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:8081/auth/session", { withCredentials: true })
            .then((res) => {
                if (res.data?.user_id) {
                    setUser(res.data);
                } else {
                    navigate("/login");
                }
            })
            .catch((err) => {
                console.error("Error fetching session:", err);
                navigate("/login");
            });
    }, [navigate]);

    const handleLogout = () => {
        axios.post("http://localhost:8081/auth/logout", {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                navigate("/login");
            })
            .catch((err) => console.error("Logout failed:", err));
    };

    if (user === null) {
        return null;
    }

    // Determine grid columns based on role
    const gridColumns = user?.role === "DRIVER" ? "md:grid-cols-2" : "md:grid-cols-3";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-6">

            <div className="bg-transparent shadow-lg rounded-lg p-8 w-full max-w-6xl text-center mb-6">
                <div className="flex justify-center">
                    <h2 className="text-4xl text-white font-bold bg-black  mb-8">Welcome, {user?.full_name}!</h2>
                </div>


                <div className={`grid grid-cols-1 ${gridColumns} gap-6 w-full justify-items-center`}>
                    {user?.role === "PASSENGER" && (
                        <>
                            <Card
                                title="Find a Ride"
                                text="Search and book available rides with trusted drivers."
                                onClick={() => navigate("/find-ride")}
                                buttonText="Find Now"
                            />
                            <Card
                                title="View Bookings"
                                text="Check your upcoming and past ride bookings."
                                onClick={() => navigate("/my-bookings")}
                                buttonText="View Bookings"
                            />
                            <Card
                                title="Update Profile"
                                text="Update your user profile to keep your information up-to-date."
                                onClick={() => navigate("/update-profile")}
                                buttonText="Update Profile"
                            />
                        </>
                    )}

                    {user?.role === "DRIVER" && (
                        <>
                            <Card
                                title="Offer a Ride"
                                text="Create a ride listing and help passengers travel easily."
                                onClick={() => navigate("/create-ride")}
                                buttonText="Offer Ride"
                            />
                            <Card
                                title="View My Rides"
                                text="Manage your scheduled rides and update details."
                                onClick={() => navigate("/my-rides")}
                                buttonText="Manage Rides"
                            />
                            <Card
                                title="Manage Bookings"
                                text="Approve or reject passenger booking requests."
                                onClick={() => navigate("/manage-bookings")}
                                buttonText="Manage Now"
                            />
                            <Card
                                title="Update Profile"
                                text="Update your user profile to keep your information up-to-date."
                                onClick={() => navigate("/update-profile")}
                                buttonText="Update Profile"
                            />
                        </>
                    )}

                    {user?.role === "ADMIN" && (
                        <>
                            <Card
                                title="Manage Users"
                                text="Oversee user accounts, roles, and permissions."
                                onClick={() => navigate("/manage-users")}
                                buttonText="Manage Users"
                            />
                            <Card
                                title="Manage Rides"
                                text="Monitor ride listings and remove inappropriate ones."
                                onClick={() => navigate("/manage-rides")}
                                buttonText="Manage Rides"
                            />
                            <Card
                                title="Manage Bookings"
                                text="Review and handle booking disputes."
                                onClick={() => navigate("/manage-bookings-by-admin")}
                                buttonText="Review Bookings"
                            />
                        </>
                    )}
                </div>

                <div className="w-full mt-8">
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-black transition w-full max-w-xs"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

// Reusable Card Component
const Card = ({ title, text, onClick, buttonText }) => (
    <div className="bg-white border border-gray-200 shadow-md p-6 rounded-lg text-center flex flex-col items-center w-full max-w-xs h-full">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 flex-grow">{text}</p>
        <button
            onClick={onClick}
            className="mt-auto px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-gray-700 transition w-full"
        >
            {buttonText}
        </button>
    </div>
);

export default Dashboard;