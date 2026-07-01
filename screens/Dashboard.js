import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import IconButton from "../components/IconButton";
import { COLORS } from "../constants/colors";
import dashboard from "../assets/styles/dashboardCSS";
import {
  View,
  Text,
  Pressable,
  Image,
} from "react-native";

import moh from '../assets/images/moh.png';

export default function Dashboard({ navigation }) {

  const [user, setUser] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("Not Recorded");

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("Home");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";

    return "Good Evening";
  };

  return (
      <View style={dashboard.container}>
        <View style={dashboard.navbar}>
          <Text style={dashboard.logo}><Image source={moh} style={dashboard.logo} /></Text>

          <Pressable onPress={handleLogout}>
            <Text style={dashboard.link}>Logout</Text>
          </Pressable>
        </View>

        <View style={dashboard.content}>
          <Text style={dashboard.greeting}>
            {getGreeting()} 👋
          </Text>

          <Text style={dashboard.welcome}>
            Welcome back, {user?.firstname}
          </Text>
        </View>

        <View style={dashboard.statusCard}>
          <Text style={dashboard.statusTitle}>Today's Status</Text>

          <Text
            style={[
              dashboard.statusText,
              {
                color:
                  attendanceStatus === "Present"
                    ? COLORS.success
                    : COLORS.danger,
              },
            ]}
          >
            {attendanceStatus === "Present"
              ? "🟢 Attendance Recorded"
              : "🔴 Attendance Not Recorded"}
          </Text>
        </View>

        <View>
          <Pressable style={dashboard.scanButton}>
            <IconButton name="finger-print" size={24} color={COLORS.white} />
            <Text style={dashboard.scanButtonText}>Scan Fingerprint</Text>
          </Pressable>
        </View>

        <View style={dashboard.card}>
          <Text style={dashboard.cardTitle}>Student Information</Text>

          <Text style={dashboard.label}>Name</Text>
          <Text style={dashboard.value}>
            {user?.firstname} {user?.lastname}
          </Text>

          <Text style={dashboard.label}>Matric Number</Text>
          <Text style={dashboard.value}>{user?.matricNo}</Text>

          <Text style={dashboard.label}>Department</Text>
          <Text style={dashboard.value}>{user?.department}</Text>

          <Text style={dashboard.label}>Faculty</Text>
          <Text style={dashboard.value}>{user?.faculty}</Text>
        </View>

        <View>
          <Pressable
            style={dashboard.button}
            onPress={() => navigation.navigate("AttendanceHistory")}
          >
            <Text style={dashboard.buttonText}>Attendance History</Text>
            <IconButton name="arrow-forward" size={18} color={COLORS.white} />
          </Pressable>
        </View>
    </View>
  );
}