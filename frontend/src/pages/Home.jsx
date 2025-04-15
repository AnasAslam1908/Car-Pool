import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="min-h-screen bg-transparent flex flex-col items-left justify-center text-left ml-3 px-4 md:px-12">
            {/* Hero Section - All left-aligned */}
            <div className="w-full max-w-3xl"> {/* Container for consistent width */}
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Share Your Ride, Save the Planet
                </h1>
                <p className="text-lg text-white mb-6 font-bold">
                    Join our carpooling community and make travel affordable & eco-friendly.
                </p>


                <div className="flex justify-center">
                    <Link
                        to="/register"
                        className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-transparent hover:font-bold transition mr-4" /* Added margin */
                    >
                        Register
                    </Link>
                    <Link
                        to="/login"
                        className="bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-transparent hover:font-bold transition"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;