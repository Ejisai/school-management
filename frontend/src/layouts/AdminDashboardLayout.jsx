import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/StudentContext";
import { ADMIN_DASHBOARD_ROUTE, LOGIN_ROUTE, redirectToDashboard } from "../router";
import { Gauge } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
import { AdminAdministrationSideBar } from "./Administration/AdminAdministrationSideBar copy";
import AdminDropDownMenu from "./drop-down-menu/AdminDropDownMenu";
import UserApi from "../services/Api/Student/UserApi";

const AdminDashboardLayout = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true)
    const {
        authenticated,
        setUser,
        setAuthenticated,
        logout: contextLogout,
    } = useUserContext();

    useEffect(() => {
        if (authenticated === true) {
            setisLoading(false)
            UserApi.getUser().then(({ data }) => {
                    const {role} = data
                    if(role !== 'admin'){
                    navigate(redirectToDashboard(role));
                    }
                    setUser(data);
                    setAuthenticated(true);
                    console.log(role, data);

                })
                .catch((reason) => {
                    contextLogout();
                    console.log(reason);

                });
        }else{
            navigate(LOGIN_ROUTE);
        }
    }, [authenticated]);

    // for the brief rendering issue when going to /student/dashboard
    if (isLoading) {
        return <></>
    }

    // useEffect(() => {
    //     console.log(context);
    // }, [console])

    return (
        <>
            <header>
                <nav className="bg-gray-800 shadow-md">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex-shrink-0 text-white text-xl font-bold">
                                Skwila
                            </div>
                            <div className="flex items-center space-x-6">
                                <Link
                                    to={ADMIN_DASHBOARD_ROUTE}
                                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition"
                                >
                                    <Gauge size={16} />
                                    <span>Dashboard</span>
                                </Link>
                                <AdminDropDownMenu />
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main
                className={"container mx-auto mt-7"}
                style={{ width: "100%"}}
            >
                {/* {JSON.stringify(user)} */}
                <div className="flex">
                    <div className="w-100 md:w-2/12 ps-8">
                        <AdminAdministrationSideBar />
                    </div>
                    <div className="w-100 md:w-10/12">
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};

export default AdminDashboardLayout;
