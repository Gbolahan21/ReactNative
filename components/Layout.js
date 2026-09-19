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

  const isMobile = width < 768;

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
  },

  mobileContainer: {
    flexDirection: "column",
  },

  content: {
    flex: 1,
  },
});