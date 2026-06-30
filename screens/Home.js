import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import moh from '../assets/images/moh.png';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Custom Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}><Image source={moh} style={styles.logo} /></Text>

        <View style={styles.navLinks}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Register</Text>
          </Pressable>
        </View>
      </View>

      {/* Home Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Fingerprint Attendance System (F.A.S)</Text>

        <Text style={styles.subtitle}>
          Kindly sign in to continue or create a new account.
        </Text>
      </View>
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

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },

  navLinks: {
    flexDirection: "row",
    alignItems: "center",
  },

  link: {
    marginLeft: 20,
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "600",
  },

  content: {
    paddingVertical: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});