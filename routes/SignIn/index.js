import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import login from "../../assets/styles/loginCSS";
import useResponsive from "../../hooks/useResponsive";
import {
  View,
  Text,
  Pressable,
  TextInput
} from "react-native";

export default function SignIn({ navigation, signin, load }) {
  const { isDesktop } = useResponsive();
  const [matricNo, setMatricNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    document.title = 'SignIn | Moh';
  }, []);

  const handleLogin = () => {
    signin(
      matricNo.trim(),
      password,

      (error) => {
        Toast.show({
          type: "error",
          text1: "Login Failed",
          text2:
            error?.error ||
            error?.message ||
            "Something went wrong",
        });
      },

      async (response) => {
        if (rememberMe) {
          await AsyncStorage.setItem(
            "savedMatricNo",
            matricNo.trim()
          );
        } else {
          await AsyncStorage.removeItem("savedMatricNo");
        }

        Toast.show({
          type: "success",
          text1: "Login Successful",
          text2: response?.message || "Welcome back!",
        });

        navigation.replace("Dashboard");
      }
    );
  };

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      load(
        (error) => {
          console.log("SESSION RESTORE FAILED:", error);

          dispatch({
            type: AUTH_INITIALIZED,
          });
        },

        (response) => {
          console.log("SESSION RESTORED:", response);

          navigation.replace("Dashboard");
        }
      );
    } catch (error) {
      console.log("CHECK LOGIN ERROR:", error);
    }
  };

  const loadSavedMatricNo = async () => {
    try {
      const savedMatricNo =
        await AsyncStorage.getItem("savedMatricNo");

      if (savedMatricNo) {
        setMatricNo(savedMatricNo);
        setRememberMe(true);
      }
    } catch (error) {
      console.log("LOAD SAVED MATRIC ERROR:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await loadSavedMatricNo();
      await checkLogin();
    };

    initialize();
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
          <Text style={login.link} onPress={() => navigation.navigate("SignUp")}>Register</Text>
        </Text>
      </View>
    </View>
  );
}