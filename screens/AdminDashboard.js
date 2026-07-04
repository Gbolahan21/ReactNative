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
    };

    getUser();
  }, []);

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
    </View>
  );
}