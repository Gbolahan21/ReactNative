import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";

import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import AttendanceHistory from "./routes/AttendanceHistory";
import AdminRegister from "./routes/AdminRegister";
import AdminLogin from "./routes/AdminLogin";
import AdminDashboard from "./routes/AdminDashboard";
import AdminStudents from "./routes/AdminStudents";
import TodayAttendance from "./routes/TodayAttendance";
import AttendanceAnalytics from "./routes/AttendanceAnalytics";
import ExportReports from "./routes/ExportReports";

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