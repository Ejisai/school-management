import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/StudentContext";
import { LOGIN_ROUTE, STUDENT_DASHBOARD_ROUTE, TEACHER_DASHBOARD_ROUTE } from "../router";
import { Gauge } from "lucide-react";
import { ModeToggle } from "../components/mode-toggle";
import { TeacherAdministrationSideBar } from "./Administration/TeacherAdministrationSideBar";
import UserApi from "../services/Api/Student/UserApi";
import TeacherDropDownMenu from "./drop-down-menu/TeacherDropDownMenu";

const TeacherDashboardLayout = () => {
    const navigate = useNavigate();
    const [isLoading, setisLoading] = useState(true)
    const {
        authenticated,
        setUser,
        setAuthenticated,
        logout: contextLogout,
    } = useUserContext();

    useEffect(() => {
        // console.log(typeof authenticated);

        //     console.log(context);

        //     if (!context.authenticated) {
        //         // navigate(LOGIN_ROUTE);
        //     }
        if (authenticated === true) {
            setisLoading(false)
            UserApi.getUser()
                .then(({ data }) => {
                    setUser(data);
                    setAuthenticated(true);
                })
                .catch((reason) => {
                    contextLogout();
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
                                    to={TEACHER_DASHBOARD_ROUTE}
                                    className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition"
                                >
                                    <Gauge size={16} />
                                    <span>Dashboard</span>
                                </Link>
                                <TeacherDropDownMenu />
                                <ModeToggle />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main
                className={"container mx-auto mt-7"}
                style={{ width: "95%", paddingRight: "10%" }}
            >
                {/* {JSON.stringify(user)} */}
                <div className="flex">
                    <div className="w-100 md:w-1/4">
                        <TeacherAdministrationSideBar />
                    </div>
                    <div className="w-100 md:w-3/4">
                        <Outlet />
                    </div>
                </div>
            </main>
        </>
    );
};

export default TeacherDashboardLayout;
