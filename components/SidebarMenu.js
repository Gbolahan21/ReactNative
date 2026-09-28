import {useState} from "react";
import {
  View,
  Text,
  Pressable,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/logout";
import Toast from "react-native-toast-message";
import Button from "./Button";
import AppModal from "./AppModal";

import { COLORS } from "../constants/colors";
import styles from "../assets/styles/styles";

const menuItems = [
  {
    name: "Dashboard",
    icon: "grid-outline",
    activeIcon: "grid",
  },
  {
    name: "Course",
    icon: "book-outline",
    activeIcon: "book",
  },
  {
    name: "Attendance",
    icon: "calendar-outline",
    activeIcon: "calendar",
  },
  {
    name: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function SidebarMenu() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [logoutVisible, setLogoutVisible] = useState(false);

  const handleLogout = () => {
    dispatch(logout());

    Toast.show({
    type: "success",
    text1: "Logout Successful",
    text2: "You have been logged out.",
    });

    setLogoutVisible(false);

    navigation.replace("SignIn");
  };

  return (
    <>
      <View style={styles.sidebarMenuContainer}>
        <View style={styles.sidebarMenuHeader}>
          <View style={styles.sidebarMenuLogo}>
            <Ionicons
              name="school"
              size={24}
              color={COLORS.primary}
            />
          </View>

          <Text style={styles.sidebarMenuTitle}>
            Student Portal
          </Text>
        </View>

        <View style={styles.menu}>
          {menuItems.map((item) => {
            const isActive = route.name === item.name;

            return (
              <Pressable
                key={item.name}
                style={[
                  styles.menuItem,
                  isActive && styles.activeMenuItem,
                ]}
                onPress={() =>
                  navigation.navigate(item.name)
                }
              >
                <Ionicons
                  name={
                    isActive
                      ? item.activeIcon
                      : item.icon
                  }
                  size={21}
                  color={
                    isActive
                      ? COLORS.primary
                      : COLORS.gray
                  }
                />

                <Text
                  style={[
                    styles.menuText,
                    isActive && styles.activeMenuText,
                  ]}
                >
                  {item.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.bottom}>
          <Pressable
            style={styles.logout}
            onPress={() => setLogoutVisible(true)}
          >
            <Ionicons
              name="log-out-outline"
              size={21}
              color="#EF4444"
            />

            <Text style={styles.sidebarMenuLogOutText}>
              Logout
            </Text>
          </Pressable>
        </View>

      </View>

      {/* Logout Modal */}
      <AppModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        size="small"
      >
        <Text style={styles.text}>
          Log Out?
        </Text>

        <Text style={styles.modalDescription}>
          Are you sure you want to log out?
        </Text>

        <View style={styles.filterActions}>
          <Button
            title="Stay Logged In"
            onPress={() => setLogoutVisible(false)}
            style={styles.resetButton}
            textStyle={styles.resetButtonText}
          />

          <Button
            title="Log Out"
            onPress={handleLogout}
            style={styles.applyFilterButton}
          />
        </View>
      </AppModal>
    </>
  );
}