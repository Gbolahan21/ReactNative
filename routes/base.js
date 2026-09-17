import Home from "./Home";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Navigation from "./Navigation";

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
      name: "Navigation",
      component: Navigation,
    },
  ],
};

export default baseRoutes;