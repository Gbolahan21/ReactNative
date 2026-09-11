import { useState } from "react";
import api from "../services/api";
import Toast from "react-native-toast-message";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import Dropdown from "../components/Dropdown";
import register from "../assets/styles/registerCSS";
import useResponsive from "../hooks/useResponsive";
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function AdminRegister({ navigation }) {
  const { isDesktop } = useResponsive();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await api.post('/admin/register', {
        firstname,
        lastname,
        email,
        title,
        password
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setTitle("");
      setPassword("");
      setConfirmPassword("");

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Welcome aboard!",
      });

      navigation.navigate("AdminLogin");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  const details = !firstname || !lastname || !email || !title || !password || !confirmPassword;
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={[register.container, isDesktop && register.desktopContainer]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={isDesktop ? register.card : null}>
          <IconButton name="arrow-back" size={28} onPress={() => navigation.navigate('Home')} />

          <Text style={register.text}>Register</Text>

          <TextInput 
            style={register.input}
            placeholder="Enter your firstname"
            autoCapitalize="words"
            autoCorrect={false}
            value={firstname}
            onChangeText={setFirstName}
          />

          <TextInput 
            style={register.input}
            placeholder="Enter your lastname"
            autoCapitalize="words"
            autoCorrect={false}
            value={lastname}
            onChangeText={setLastName}
          />

          <TextInput 
            style={register.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Dropdown
            label="Title"
            placeholder="Select Title"
            value={title}
            onSelect={setTitle}
            options={[
              {
                label: "Mr",
                value: "Mr",
              },
              {
                label: "Mrs",
                value: "Mrs",
              },
            ]}
          />

          <View style={register.inputContainer}>
            <TextInput
              style={register.inputs}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              />
        
            <IconButton name={showPassword ? "eye" : "eye-off"} onPress={() => setShowPassword(!showPassword)} />
          </View>

          <View style={register.inputContainer}>
            <TextInput
              style={register.inputs}
              placeholder="Confirm password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              />
          
            <IconButton name={showConfirmPassword ? "eye" : "eye-off"} onPress={() => setShowConfirmPassword(!showConfirmPassword)} />
          </View>

          <View>
            {confirmPassword.length > 0 && (
              <Text
                style={{
                  color: password === confirmPassword ? "green" : "red",
                  marginBottom: 15,
                }}
                >
                {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords do not match"}
              </Text>
            )}
          </View>

          <Button title="Register" onPress={handleRegister} disabled={details} />

          <Text style={register.footerText}>
            Already have an account.{" "}
            <Text style={register.link} onPress={() => navigation.navigate("AdminLogin")}>Login</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
