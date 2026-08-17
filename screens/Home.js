import { View, Text, Pressable, Image } from "react-native";
import moh from '../assets/images/moh.png';
import home from "../assets/styles/homeCSS";
import useResponsive from "../hooks/useResponsive";

export default function HomeScreen({ navigation }) {
  const { isDesktop } = useResponsive();
  return (
    <View style={[home.container, isDesktop && home.desktopContainer]}>
      {/* Custom Navbar */}
      <View style={home.navbar}>
        <Text style={home.logo}><Image source={moh} style={home.logo} /></Text>

        <View style={home.navLinks}>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={home.link}>Login</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={home.link}>Register</Text>
          </Pressable>

          {/* <Pressable onPress={() => navigation.navigate("AdminRegister")}>
            <Text style={home.link}>AdminRegister</Text>
          </Pressable>

          <Pressable onPress={() => navigation.navigate("AdminLogin")}>
            <Text style={home.link}>AdminLogin</Text>
          </Pressable> */}
        </View>
      </View>

      {/* Home Content */}
      <View style={home.content}>
        <Text style={home.title}>Student Fingerprint Attendance System (S.F.A.S)</Text>

        <Text style={home.subtitle}>
          Kindly sign in to continue or create a new account.
        </Text>
      </View>
    </View>
  );
}