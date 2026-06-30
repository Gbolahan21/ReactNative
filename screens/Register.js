import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput
} from "react-native";

export default function Register({ navigation }) {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [matricNo, setMatricNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = () => {
    alert(
      `Firstname: ${firstname}\n` +
      `Lastname: ${lastname}\n` +
      `matric No: ${matricNo}`
    );
  };

  const details = (firstname && lastname && matricNo && password && confirmPassword) === '';

  return (
    <View style={styles.container}>
       <Pressable onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </Pressable>

      <Text style={styles.text}>Register</Text>

      <TextInput 
        style={styles.input}
        placeholder="Enter your firstname"
        autoCapitalize="words"
        autoCorrect={false}
        value={firstname}
        onChangeText={setFirstName}
      />

      <TextInput 
        style={styles.input}
        placeholder="Enter your lastname"
        autoCapitalize="words"
        autoCorrect={false}
        value={lastname}
        onChangeText={setLastName}
      />

      <TextInput 
        style={styles.input}
        placeholder="Enter your matric no"
        keyboardType="phone-pad"
        autoCapitalize="none"
        value={matricNo}
        onChangeText={setMatricNo}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Enter your password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
    
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          <Text>{showPassword ? "Hide" : "Show"}</Text>
        </Pressable>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputs}
          placeholder="Confirm password"
          secureTextEntry={!showPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      
        <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Text>{showConfirmPassword ? "Hide" : "Show"}</Text>
        </Pressable>
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
          styles.button,
          { opacity: details ? 0.5 : 1 }
        ]}
        onPress={handleRegister}
        disabled={details}
      >
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>

      <Text style={styles.footerText}>
        Already have an account.{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>Login</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  button: {
    backgroundColor: '#c70e0e',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },

  footerText: {
    fontSize: 16,
    color: "#555",
  },

  link: {
    color: "#007BFF",
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  inputs: {
    flex: 1,
    fontSize: 16,
  },
});
