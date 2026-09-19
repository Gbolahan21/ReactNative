import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

import SidebarMenu from "./SidebarMenu";
import MobileNav from "./MobileNav";

export default function StudentLayout({ children }) {
  const { width } = useWindowDimensions();

  const isMobile = width < 1024;

  return (
    <View style={styles.page}>
      <View
        style={[
          styles.container,
          isMobile && styles.mobileContainer,
        ]}
      >
        {/* Desktop Sidebar */}
        {!isMobile && <SidebarMenu />}

        {/* Page Content */}
        <View style={styles.content}>
          {children}
        </View>

        {/* Mobile Bottom Navigation */}
        {isMobile && <MobileNav />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 1200,
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
  },

  mobileContainer: {
    flexDirection: "column",
    maxWidth: "100%",
  },

  content: {
    flex: 1,
  },
});