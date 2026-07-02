import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as LocalAuthentication from "expo-local-authentication";
import api from "../services/api";
import Toast from "react-native-toast-message";
import Button from "../components/Button";
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
  const [todayAttendance, setTodayAttendance] = useState(null);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    navigation.replace("Login");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";

    return "Good Evening";
  };

  const loadTodayAttendance = async (userId) => {
    try {
      const response = await api.get(`/attendance/today/${userId}`);

      setTodayAttendance(response.data);
      setAttendanceStatus(response.data.status);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Attendance Load Failed",
        text2: "Unable to load today's attendance.",
      });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);

        await loadTodayAttendance(parsedUser.id);
      }
    };

    getUser();
  }, []);
  
  const scanFingerprint = async () => {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();

      if (!compatible) {
        Toast.show({
          type: "error",
          text1: "Fingerprint Failed",
          text2: "This device does not support fingerprint authentication.",
        });
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();

      if (!enrolled) {
        Toast.show({
          type: "error",
          text1: "Fingerprint Failed",
          text2: "No fingerprint is enrolled.",
        });
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Scan your fingerprint to record attendance",
        disableDeviceFallback: false,
        cancelLabel: "Cancel",
      });

      if (!result.success) {
        Toast.show({
          type: "error",
          text1: "Fingerprint Failed",
          text2: "Fingerprint verification failed.",
        });
        return;
      }

      await api.post("/attendance/checkin", {
        userId: user.id,
      });

      await loadTodayAttendance(user.id);

      Toast.show({
        type: "success",
        text1: "Attendance Recorded",
        text2: "Your attendance has been recorded.",
      });
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Attendance Failed",
        text2: "Attendance has already been recorded today.",
      });
    }
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
              ? "🟢 Present"
              : "🔴 Attendance Not Recorded"}
          </Text>
          {todayAttendance?.check_in && (
            <>
              <Text style={dashboard.label}>Checked in</Text>
              <Text style={dashboard.value}>{todayAttendance?.check_in}</Text>
            </>
          )}
        </View>

        <Button
          title={
              attendanceStatus === "Present"
                  ? "Attendance Recorded"
                  : "Scan Fingerprint"
          }
          iconName="finger-print"
          iconSize={24}
          onPress={scanFingerprint}
          // disabled={attendanceStatus === "Present"}
        />

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

        <Button title="Attendance History" iconRightName="arrow-forward" iconRightSize={18} onPress={() => navigation.navigate("AttendanceHistory")} textStyle={{marginRight: 10}} />
    </View>
  );
}