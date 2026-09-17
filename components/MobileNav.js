import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "../constants/colors";

const tabs = [
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
    icon: "checkmark-circle-outline",
    activeIcon: "checkmark-circle",
  },
  {
    name: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function MobileNav({
  activeTab,
  onTabPress,
}) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.name;

        return (
          <Pressable
            key={tab.name}
            style={styles.tab}
            onPress={() => onTabPress(tab.name)}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={
                isActive
                  ? COLORS.primary
                  : COLORS.gray
              }
            />

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingBottom: 6,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },

  label: {
    fontSize: 11,
    color: COLORS.gray,
  },

  activeLabel: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});