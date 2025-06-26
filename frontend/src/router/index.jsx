import { createBrowserRouter } from "react-router-dom";
import StudentDashboard from "../components/Student/StudentDashboard";
import GuestLayout from "../layouts/GuestLayout";
import Layout from "../layouts/Layout";
import StudentDashboardLayout from "../layouts/StudentDashboardLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../components/Admin/AdminDashboard";
import TeacherDashboardLayout from "../layouts/TeacherDashboardLayout";
import TeacherDashboard from "../components/TeacherDashboard.jsx/TeacherDashboard";
import ManageParents from "../components/Admin/ManageParents";
import ParentDashboardLayout from "../layouts/ParentDashboardLayout";

export const LOGIN_ROUTE = "/login";
export const STUDENT_DASHBOARD_ROUTE = "/student/dashboard";
const ADMIN_BASE_ROUTE = "/admin";
export const ADMIN_DASHBOARD_ROUTE = ADMIN_BASE_ROUTE +"/dashboard";
export const ADMIN_MANAGE_PARENTS_ROUTE = ADMIN_BASE_ROUTE +"/manage-parents";
export const TEACHER_DASHBOARD_ROUTE = "/teacher/dashboard";
export const PARENT_DASHBOARD_ROUTE = "/parent/dashboard";

export const redirectToDashboard = (roleType) =>{
                        switch (roleType) {
                            case 'student':
                            return (STUDENT_DASHBOARD_ROUTE);
                                case 'admin':
                            return (ADMIN_DASHBOARD_ROUTE);
                                case 'teacher':
                            return (TEACHER_DASHBOARD_ROUTE);
                                case 'parent':
                            return (PARENT_DASHBOARD_ROUTE);
                        }
}
export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
    {
        element: <GuestLayout />,
        children: [
            {
                path: LOGIN_ROUTE,
                element: <Login />,
            },
        ],
    },
    {
        element: <StudentDashboardLayout />,
        children: [
            {
                path: STUDENT_DASHBOARD_ROUTE,
                element: <StudentDashboard />,
            },
        ],
    },
    {
        element: <AdminDashboardLayout />,
        children: [
            {
                path: ADMIN_DASHBOARD_ROUTE,
                element: <AdminDashboard />,
            },
            {
                path: ADMIN_MANAGE_PARENTS_ROUTE,
                element: <ManageParents />,
            },
        ],
    },
    {
        element: <ParentDashboardLayout />,
        children: [
            {
                path: PARENT_DASHBOARD_ROUTE,
                element: <AdminDashboard />,
            },
        ],
    },
     {
        element: <TeacherDashboardLayout />,
        children: [
            {
                path: TEACHER_DASHBOARD_ROUTE,
                element: <TeacherDashboard />,
            },
        ],
    },
]);
