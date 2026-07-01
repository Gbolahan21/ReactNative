import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import IconButton from "../components/IconButton";
import login from "../assets/styles/loginCSS";
import {
  View,
  Text,
  Pressable,
  TextInput
} from "react-native";

export default function Login({ navigation }) {
  const [matricNo, setMatricNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async () => {
    try {
      const response = await api.post("/login", {
        matricNo,
        password,
      });

      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigation.navigate("Dashboard");
    } catch (error) {
      alert(
        error.response?.data?.error || "Login failed"
      );
    }
  };

  const details = !matricNo || !password;

  return (
    <View style={login.container}>
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

      <Pressable
        style={[
          login.button,
          { opacity: details ? 0.5 : 1 }
        ]}
        onPress={handleLogin}
      >
        <Text style={login.buttonText}>Login</Text>
      </Pressable>

      <Text style={login.footerText}>
        Don't have an account?{" "}
        <Text style={login.link} onPress={() => navigation.navigate("Register")}>Register</Text>
      </Text>
    </View>
  );
}