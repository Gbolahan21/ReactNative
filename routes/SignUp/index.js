import { useState, useEffect } from "react";
import Toast from "react-native-toast-message";
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import register from "../../assets/styles/registerCSS";
import useResponsive from "../../hooks/useResponsive";
import * as Helpers from '../../helpers';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

export default function SignUp({ navigation, signup }) {
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

  useEffect(() => {
    document.title = 'SignUp | Moh';
  }, []);

  const handleRegister = () => {
    const studentEmailRegex = /^[^\s@]+@student\.lautech\.edu\.ng$/i;

    if (!studentEmailRegex.test(email.trim())) {
      Toast.show({
        type: "error",
        text1: "Invalid School Email",
        text2: "Use your @student.lautech.edu.ng email address.",
      });
      Helpers.notification.error("Invalid School Email", "Use your @student.lautech.edu.ng email address.");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      Toast.show({
        type: "error",
        text1: "Weak Password",
        text2:
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
      });

      Helpers.notification.error(
        "Weak Password",
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );

      return;
    }

    if (password !== confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Password Error",
        text2: "Passwords do not match.",
      });
      Helpers.notification.error("Password Error", "Passwords do not match.");
      return;
    }

    signup(
      firstname.trim(),
      lastname.trim(),
      matricNo.trim(),
      email.trim().toLowerCase(),
      department.trim(),
      faculty.trim(),
      level,
      password,

      // Error callback
      (error) => {
        Toast.show({
          type: "error",
          text1: "Registration Failed",
          text2: error || "Something went wrong",
        });
        Helpers.notification.error("Registration Failed", error || "Something went wrong");
      },

      // Success callback
      (response) => {
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
        Helpers.notification.success("Registration Successful", "Welcome aboard!");

        navigation.navigate("SignIn");
      }
    )
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
          <IconButton name="arrow-back" size={28} onPress={() => navigation.navigate("Home")}/>
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

          <Dropdown
            label="Level"
            value={level}
            placeholder="Select Level"
            onSelect={setLevel}
            options={[
              { label: "100 Level", value: "100" },
              { label: "200 Level", value: "200" },
              { label: "300 Level", value: "300" },
              { label: "400 Level", value: "400" },
              { label: "500 Level", value: "500" },
              { label: "600 Level", value: "600" },
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

          {password.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text
                style={{
                  color: password.length >= 8 ? "green" : "red",
                }}
              >
                {password.length >= 8 ? "✓" : "✗"} At least 8 characters
              </Text>

              <Text
                style={{
                  color: /[A-Z]/.test(password) ? "green" : "red",
                }}
              >
                {/[A-Z]/.test(password) ? "✓" : "✗"} One uppercase letter
              </Text>

              <Text
                style={{
                  color: /[a-z]/.test(password) ? "green" : "red",
                }}
              >
                {/[a-z]/.test(password) ? "✓" : "✗"} One lowercase letter
              </Text>

              <Text
                style={{
                  color: /\d/.test(password) ? "green" : "red",
                }}
              >
                {/\d/.test(password) ? "✓" : "✗"} One number
              </Text>

              <Text
                style={{
                  color: /[@$!%*?&]/.test(password) ? "green" : "red",
                }}
              >
                {/[@$!%*?&]/.test(password) ? "✓" : "✗"} One special character
              </Text>
            </View>
          )}

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
            <Text style={register.link} onPress={() => navigation.navigate("SignIn")}>Login</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
