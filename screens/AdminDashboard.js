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

export default function AdminDashboard({ navigation }) {

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    presentToday: 0,
    absentToday: 0,
    attendanceRate: 0,
  });

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

    navigation.replace("AdminLogin");
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";

    return "Good Evening";
  };

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }

      loadDashboardStats();
    };

    getUser();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await api.get("/admin/dashboard");

      setStats(response.data);
    } catch (err) {
      console.log(err);
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
            Welcome back, {user?.title}. {user?.firstname}
          </Text>
        </View>

        <View style={dashboard.summaryContainer}>
          <View style={dashboard.summaryCard}>
            <Text style={dashboard.summaryTitle}>
              👨‍🎓 Students
            </Text>

            <Text style={dashboard.summaryValue}>
              {stats.totalStudents}
            </Text>
          </View>

          <View style={dashboard.summaryCard}>
            <Text style={dashboard.summaryTitle}>
              🟢 Present Today
            </Text>

            <Text style={dashboard.summaryValue}>
              {stats.presentToday}
            </Text>
          </View>

          <View style={dashboard.summaryCard}>
            <Text style={dashboard.summaryTitle}>
              🔴 Absent Today
             </Text>

            <Text style={dashboard.summaryValue}>
              {stats.absentToday}
            </Text>
          </View>

          <View style={dashboard.summaryCard}>
            <Text style={dashboard.summaryTitle}>
              📈 Attendance Rate
            </Text>

            <Text style={dashboard.summaryValue}>
              {stats.attendanceRate}%
            </Text>
          </View>
        </View>

        <View style={dashboard.quickActionsContainer}>
          <Text style={dashboard.sectionTitle}>
            Quick Actions
          </Text>

          <Button
            title="View Students"
            iconName="people"
            iconRightName="arrow-forward"
            onPress={() => navigation.navigate("AdminStudents")}
            textStyle={{ marginRight: 10 }}
          />

          <Button
            title="Today's Attendance"
            iconName="calendar"
            iconRightName="arrow-forward"
            onPress={() => navigation.navigate("TodayAttendance")}
            textStyle={{ marginRight: 10 }}
            style={{ marginTop: 12 }}
          />

          <Button
            title="Attendance Analytics"
            iconName="stats-chart"
            iconRightName="arrow-forward"
            onPress={() => navigation.navigate("AttendanceAnalytics")}
            textStyle={{ marginRight: 10 }}
            style={{ marginTop: 12 }}
          />

          <Button
            title="Export Reports"
            iconName="download"
            iconRightName="arrow-forward"
            onPress={() => navigation.navigate("ExportReports")}
            textStyle={{ marginRight: 10 }}
            style={{ marginTop: 12 }}
          />
        </View>
    </View>
  );
}