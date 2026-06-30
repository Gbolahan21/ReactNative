import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput
} from "react-native";

export default function Login({ navigation }) {
  const [matricNo, setMatricNo] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = () => {
    alert(`Matric No: ${matricNo}`);
  };

  const details = (matricNo && password) === '';

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </Pressable>

      <Text style={styles.text}>Login</Text>

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

      <Pressable
        style={[
          styles.button,
          { opacity: details ? 0.5 : 1 }
        ]}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Text style={styles.footerText}>
        Don't have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Register")}>Register</Text>
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
    height: 55,
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
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  inputs: {
    flex: 1,
    fontSize: 16,
  },
});
