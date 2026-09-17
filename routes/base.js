import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Course from "./Course";
import Attendance from "./Attendance";
import Profile from "./Profile";

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
      path: "/dashboard"
    },
    {
      name: "Course",
      component: Course,
      path: "/course"
    },
    {
      name: "Attendance",
      component: Attendance,
      path: "/attendance"
    },
    {
      name: "Profile",
      component: Profile,
      path: "/Profile"
    },
  ],
};

export default baseRoutes;