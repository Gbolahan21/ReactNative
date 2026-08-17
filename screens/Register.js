import { useState } from "react";
import api from "../services/api";
import Toast from "react-native-toast-message";
import IconButton from "../components/IconButton";
import Button from "../components/Button";
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

export default function Register({ navigation }) {
  const { isDesktop } = useResponsive();
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [matricNo, setMatricNo] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [faculty, setFaculty] = useState('');
  const [level, setLevel] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await api.post('/register', {
        firstname,
        lastname,
        matricNo,
        email,
        department,
        faculty,
        level,
        password
      });

      setFirstName("");
      setLastName("");
      setMatricNo("");
      setEmail("");
      setDepartment("");
      setFaculty("");
      setLevel("");
      setPassword("");
      setConfirmPassword("");

      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Welcome aboard!",
      });

      navigation.navigate("Login");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: error.response?.data?.error || "Something went wrong",
      });
    }
  };

  const details = !firstname || !lastname || !matricNo || !email || !department || !faculty || !level || !password || !confirmPassword;
  
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
            placeholder="Enter your matric no"
            keyboardType="phone-pad"
            value={matricNo}
            onChangeText={setMatricNo}
          />

          <TextInput 
            style={register.input}
            placeholder="Enter your school email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput 
            style={register.input}
            placeholder="Enter your department"
            keyboardType="words"
            autoCorrect={false}
            value={department}
            onChangeText={setDepartment}
          />

          <TextInput 
            style={register.input}
            placeholder="Enter your faculty"
            keyboardType="words"
            autoCorrect={false}
            value={faculty}
            onChangeText={setFaculty}
          />

          <TextInput 
            style={register.input}
            placeholder="Enter your level"
            keyboardType="words"
            autoCorrect={false}
            value={level}
            onChangeText={setLevel}
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
            <Text style={register.link} onPress={() => navigation.navigate("Login")}>Login</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
