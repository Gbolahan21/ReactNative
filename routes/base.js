import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import AttendanceHistory from "./AttendanceHistory";
import AdminStudents from "./AdminStudents";

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
      name: "AdminStudents",
      component: AdminStudents,
      path: "/admin/students",
    },
  ],
};

export default baseRoutes;