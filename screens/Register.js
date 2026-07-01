import { useState } from "react";
import api from "../services/api";
import IconButton from "../components/IconButton";
import register from "../assets/styles/registerCSS";
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
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [matricNo, setMatricNo] = useState('');
  const [department, setDepartment] = useState('');
  const [faculty, setFaculty] = useState('');
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
        department,
        faculty,
        password
      });

      setFirstName("");
      setLastName("");
      setMatricNo("");
      setDepartment("");
      setFaculty("");
      setPassword("");
      setConfirmPassword("");

      navigation.navigate("Login");
    } catch (error) {
      console.log(error.response?.data);
      alert(
        error.response?.data?.error || "Unable to connect to server."
      );
    }
  };

  const details = !firstname || !lastname || !matricNo || !department || !faculty || !password || !confirmPassword;
  
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView 
        contentContainerStyle={register.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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

        <Pressable
          style={[
            register.button,
            { opacity: details ? 0.5 : 1 }
          ]}
          onPress={handleRegister}
          disabled={details}
        >
          <Text style={register.buttonText}>Register</Text>
        </Pressable>

        <Text style={register.footerText}>
          Already have an account.{" "}
          <Text style={register.link} onPress={() => navigation.navigate("Login")}>Login</Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
