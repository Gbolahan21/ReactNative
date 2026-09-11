import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import AttendanceHistory from "./AttendanceHistory";

import AdminRegister from "./AdminRegister";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import AdminStudents from "./AdminStudents";

import TodayAttendance from "./TodayAttendance";
import AttendanceAnalytics from "./AttendanceAnalytics";
import ExportReports from "./ExportReports";

const baseRoutes = {
  public: [
    {
      name: "Home",
      component: Home,
      path: "/",
    },
    {
      name: "SignIn",
      component: SignIn,
      path: "/signin",
    },
    {
      name: "SignUp",
      component: SignUp,
      path: "/signup",
    },
    {
      name: "AdminRegister",
      component: AdminRegister,
      path: "/admin/register",
    },
    {
      name: "AdminLogin",
      component: AdminLogin,
      path: "/admin/login",
    },
  ],

  private: [
    {
      name: "Dashboard",
      component: Dashboard,
      path: "/dashboard",
    },
    {
      name: "AttendanceHistory",
      component: AttendanceHistory,
      path: "/attendance-history",
    },
    {
      name: "AdminDashboard",
      component: AdminDashboard,
      path: "/admin/dashboard",
    },
    {
      name: "AdminStudents",
      component: AdminStudents,
      path: "/admin/students",
    },
    {
      name: "TodayAttendance",
      component: TodayAttendance,
      path: "/today-attendance",
    },
    {
      name: "AttendanceAnalytics",
      component: AttendanceAnalytics,
      path: "/attendance-analytics",
    },
    {
      name: "ExportReports",
      component: ExportReports,
      path: "/export-reports",
    },
  ],
};

export default baseRoutes;