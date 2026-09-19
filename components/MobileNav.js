import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { COLORS } from "../constants/colors";

const tabs = [
  {
    route: "Dashboard",
    label: "Dashboard",
    icon: "grid-outline",
    activeIcon: "grid",
  },
  {
    route: "Course",
    label: "Course",
    icon: "book-outline",
    activeIcon: "book",
  },
  {
    route: "Attendance",
    label: "Attendance",
    icon: "checkmark-circle-outline",
    activeIcon: "checkmark-circle",
  },
  {
    route: "Profile",
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
];

export default function MobileNav() {
  const navigation = useNavigation();
  const route = useRoute();

  const handleTabPress = (routeName) => {
    if (route.name === routeName) {
      return;
    }

    navigation.navigate(routeName);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.route;

        return (
          <Pressable
            key={tab.route}
            style={styles.tab}
            onPress={() => handleTabPress(tab.route)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{
              selected: isActive,
            }}
          >
            <View
              style={[
                styles.iconContainer,
                isActive && styles.activeIconContainer,
              ]}
            >
              <Ionicons
                name={
                  isActive
                    ? tab.activeIcon
                    : tab.icon
                }
                size={23}
                color={
                  isActive
                    ? COLORS.primary
                    : COLORS.gray
                }
              />
            </View>

            <Text
              style={[
                styles.label,
                isActive && styles.activeLabel,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    paddingHorizontal: 8,
    paddingBottom: 6,
  },
  tab: {
    flex: 1,
    height: 66,
    alignItems: "center",
    justifyContent: "center",
  },

  iconContainer: {
    width: 42,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    marginBottom: 2,
  },

  activeIconContainer: {
    backgroundColor: "#EEF4FF",
  },

  label: {
    fontSize: 11,
    lineHeight: 16,
    color: COLORS.gray,
  },

  activeLabel: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});