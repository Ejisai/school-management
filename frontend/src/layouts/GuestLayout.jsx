import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { STUDENT_DASHBOARD_ROUTE } from "../router";
import { useUserContext } from "../context/StudentContext";
import { ModeToggle } from "../components/mode-toggle";
import { House, LogIn } from "lucide-react";

const GuestLayout = () => {
    const navigate = useNavigate();
    const context = useUserContext();

    useEffect(() => {
        if (context.authenticated) {
            navigate(STUDENT_DASHBOARD_ROUTE);
        }
    }, []);

    return (
        <>
            <header>
                <nav className="bg-gray-800 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex-shrink-0 text-white text-xl font-bold">
                                Skwila
                            </div>
                            <div className="flex space-x-3">
                                <Link
                                    to="/"
                                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
                                >
                                    <House className="inline me-0.5" /> Home
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition"
                                >
                                    <LogIn className="inline me-0.5" /> Login
                                </Link>
                                <div>
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main className={"container m-auto mt-7 "} style={{ width: "80%" }}>
                <Outlet />
            </main>
        </>
    );
};

export default GuestLayout;
