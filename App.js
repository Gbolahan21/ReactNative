import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard";
import AttendanceHistory from "./screens/AttendanceHistory";
import AdminRegister from "./screens/AdminRegister";
import AdminLogin from "./screens/AdminLogin";
import AdminDashboard from "./screens/AdminDashboard";
import AdminStudents from "./screens/AdminStudents";
import TodayAttendance from "./screens/TodayAttendance";
import AttendanceAnalytics from "./screens/AttendanceAnalytics";
import ExportReports from "./screens/ExportReports";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
          <Stack.Screen name="AttendanceHistory" component={AttendanceHistory} options={{ headerShown: false }} />
          <Stack.Screen name="AdminRegister" component={AdminRegister} options={{ headerShown: false }} />
          <Stack.Screen name="AdminLogin" component={AdminLogin} options={{ headerShown: false }} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
          <Stack.Screen name="AdminStudents" component={AdminStudents} options={{ headerShown: false }} />
          <Stack.Screen name="TodayAttendance" component={TodayAttendance} options={{ headerShown: false }} />
          <Stack.Screen name="AttendanceAnalytics" component={AttendanceAnalytics} options={{ headerShown: false }} />
          <Stack.Screen name="ExportReports" component={ExportReports} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}