import React, {useState} from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/logout";
import Toast from "react-native-toast-message";
import useResponsive from "../hooks/useResponsive";
import Button from "./Button";

import { COLORS } from "../constants/colors";

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
  const { isDesktop } = useResponsive();
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
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.logo}>
          <Ionicons
            name="school"
            size={24}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.title}>
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

          <Text style={styles.logoutText}>
            Logout
          </Text>
        </Pressable>
      </View>

    </View>

    {/* Logout Modal */}
    <Modal
        visible={logoutVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setLogoutVisible(false)}
    >
        <Pressable
        style={styles.modalContainer}
        onPress={() => setLogoutVisible(false)}
        >
        <Pressable
            style={[
            styles.logoutModal,
              isDesktop && styles.desktopLogoutModal,
            ]}
            onPress={(event) => event.stopPropagation()}
        >
            <Text style={styles.modalTitleLogOut}>
            Log Out?
            </Text>

            <Text style={styles.modalMessage}>
            Are you sure you want to log out?
            </Text>

            <View style={styles.buttonRow}>
              <Button
                title="Stay Logged In"
                onPress={() => setLogoutVisible(false)}
                style={{
                width: "48%",
                backgroundColor: COLORS.primaryDark,
                }}
              />

              <Button
                title="Log Out"
                onPress={handleLogout}
                style={{
                width: "48%",
                }}
              />
            </View>
        </Pressable>
        </Pressable>
    </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  modalTitleLogOut: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center"
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  logoutModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
  },

  desktopLogoutModal: {
    width: 420,
    alignSelf: "center",
  },

  modalMessage: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
  container: {
    width: 240,
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingTop: 25,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 8,
    marginBottom: 35,
  },

  logo: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#172033",
  },

  menu: {
    gap: 7,
  },

  menuItem: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 13,
    borderRadius: 10,
  },

  activeMenuItem: {
    backgroundColor: "#EEF4FF",
  },

  menuText: {
    fontSize: 14,
    color: "#64748B",
  },

  activeMenuText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  bottom: {
    marginTop: "auto",
    paddingBottom: 20,
  },

  logout: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingHorizontal: 13,
    borderRadius: 10,
  },

  logoutText: {
    fontSize: 14,
    color: "#EF4444",
    fontWeight: "500",
  },
});