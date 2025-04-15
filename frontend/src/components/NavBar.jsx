import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-transparent text-white p-4">
            <div className="container mx-auto flex justify-between items-center">


                <Link to="/" className="flex items-center space-x-2 text-3xl font-bold">
                    <img
                        src="/logo.png"
                        alt="RideShare Logo"
                        className="w-12 h-12"
                    />
                    <span>RideShare</span>
                </Link>


                <ul className={`md:flex md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent p-4 md:p-0 transition-all duration-300 ${isOpen ? "block" : "hidden"} md:flex`}>
                    <li><Link to="/" className="block py-2 md:py-0 font-bold hover:text-gray-300">Home</Link></li>
                    <li><Link to="/dashboard" className="block py-2 md:py-0 font-bold hover:text-gray-300">Dashboard</Link></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
