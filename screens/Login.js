import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import Toast from "react-native-toast-message";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import login from "../assets/styles/loginCSS";
import useResponsive from "../hooks/useResponsive";
import {
  View,
  Text,
  Pressable,
  TextInput
} from "react-native";

export default function Login({ navigation }) {
  const { isDesktop } = useResponsive();
  const [matricNo, setMatricNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        matricNo,
        password,
      });

      if (rememberMe) {
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("savedMatricNo", matricNo);
      } else {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("savedMatricNo");
      }

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });

      navigation.navigate("Dashboard");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      navigation.replace("Dashboard");
    }
  };

  const loadSavedMatricNo = async () => {
    const savedMatricNo = await AsyncStorage.getItem("savedMatricNo");

    if (savedMatricNo) {
      setMatricNo(savedMatricNo);
      setRememberMe(true);
    }
  };

  useEffect(() => {
    checkLogin();
    loadSavedMatricNo();
  }, []);

  const details = !matricNo || !password;

  return (
    <View style={[login.container, isDesktop && login.desktopContainer]}>
      <View style={isDesktop ? login.card : null}>
        <IconButton name="arrow-back" size={28} onPress={() => navigation.navigate('Home')} />

        <Text style={login.text}>Login</Text>

        <TextInput 
          style={login.input}
          placeholder="Enter your matric no"
          keyboardType="phone-pad"
          autoCapitalize="none"
          value={matricNo}
          onChangeText={setMatricNo}
        />

        <View style={login.inputContainer}>
          <TextInput
            style={login.inputs}
            placeholder="Enter your password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />

          <IconButton name={showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />
        </View>

        <View style={login.rememberContainer}>
          <Pressable
            style={login.rememberButton}
            onPress={() => setRememberMe(!rememberMe)}
          >
            <IconButton
              name={rememberMe ? "checkbox" : "square-outline"}
              size={22}
            />
            <Text style={login.rememberText}>
              Remember Me
            </Text>
          </Pressable>
        </View>

        <Button title="Login" onPress={handleLogin} disabled={details} />

        <Text style={login.footerText}>
          Don't have an account?{" "}
          <Text style={login.link} onPress={() => navigation.navigate("Register")}>Register</Text>
        </Text>
      </View>
    </View>
  );
}