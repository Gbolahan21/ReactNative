import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import MobileNav from "../../components/MobileNav";

import Dashboard from "../Dashboard";
import Course from "../Course";
import Attendance from "../Attendance";
import Profile from "../Profile";

export default function Navigation(props) {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const renderScreen = () => {
    switch (activeTab) {
        case "Course":
            return <Course {...props} />;

        case "Attendance":
            return <Attendance {...props} />

        case "Profile":
            return <Profile {...props} />

        case "Dashboard":
            default:
                return <Dashboard {...props} onNavigate={setActiveTab} />
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {renderScreen()}
      </View>

      <MobileNav
        activeTab={activeTab}
        onTabPress={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  content: {
    flex: 1,
  },
});