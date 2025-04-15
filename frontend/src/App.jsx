import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateRide from "./pages/CreateRide";
import MyRide from "./pages/MyRide";
import ManageBooking from "./pages/ManageBooking";
import UpdateRide from "./pages/UpdateRide";
import FindRide from "./pages/FindRide";
import MyBooking from "./pages/MyBooking";
import UpdateProfile from "./pages/UpdateProfile.jsx";
import ManageUsers from "./pages/ManageUsers.jsx";
import ManageRides from "./pages/ManageRides.jsx";
import ManageBookingsByAdmin from "./pages/ManageBookingsByAdmin.jsx";

function App() {
    return (
        <div style={{
            position: 'relative',
            minHeight: '100vh',
            width: '100%',
        }}>
            {/* Base Background (0.9 opacity) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: "url('/bg1.gif')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                opacity: 0.9,
                zIndex: -2, // Lower than gradient overlay
            }}></div>

            {/* Radial Gradient (Extra transparency at center) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 100%)',
                zIndex: -1,
                mixBlendMode: 'multiply'
            }}></div>

            <Router>
                <Navbar/>
                <div className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/create-ride" element={<CreateRide/>}/>
                        <Route path="/my-rides" element={<MyRide/>}/>
                        <Route path="/manage-bookings" element={<ManageBooking/>}/>
                        <Route path="/update-ride/:rideId" element={<UpdateRide/>}/>
                        <Route path="/find-ride" element={<FindRide/>}/>
                        <Route path="/my-bookings" element={<MyBooking/>}/>
                        <Route path="/update-profile" element={<UpdateProfile/>}/>
                        <Route path="/manage-users" element={<ManageUsers/>}/>
                        <Route path="/manage-rides" element={<ManageRides/>}/>
                        <Route path="/manage-bookings-by-admin" element={<ManageBookingsByAdmin/>}/>
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;