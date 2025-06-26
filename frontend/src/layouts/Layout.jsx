import { Link, Outlet } from "react-router-dom";
import { ModeToggle } from "../components/mode-toggle";
import { House, LogIn } from "lucide-react";


const Layout = () => {
    return (
        <>
            <header>
                <nav className="bg-gray-800 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="text-white text-xl font-bold">
                                Skwila
                            </div>
                            <div className="flex items-center space-x-2">
                                <Link
                                    to="/"
                                    className="text-white hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium transition"
                                >
                                    <House className="inline me-0.5" /> Home
                                </Link>
                                <Link
                                    to="/login"
                                    className="text-white hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium transition"
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
                {/* <nav className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        <ul className="flex">
                                            <li className="rounded-md me-4 bg-gray-900 px-3 py-2 text-sm font-medium text-white">
                                                <Link to={"/"}>Home</Link>
                                            </li>

                                            <li className="rounded-mdpx-3 py-2 text-sm font-medium text-white">
                                                <Link to={"/login"}>Login</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
                        </div>
                    </div>
                </nav> */}
            </header>
            <main className={'container m-auto mt-7 '} style={{ width: '90%' }}>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
