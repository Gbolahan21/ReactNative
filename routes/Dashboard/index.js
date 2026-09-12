import { useEffect, useState, useCallback } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import * as LocalAuthentication from "expo-local-authentication";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { COLORS } from "../../constants/colors";
import dashboard from "../../assets/styles/dashboardCSS";
import useResponsive from "../../hooks/useResponsive";
import {
  View,
  Text,
  Pressable,
  Image,
  Modal,
  ScrollView
} from "react-native";

import moh from '../../assets/images/moh.png';

export default function Dashboard({ navigation, logout, checkin, todayAttendance, attendance, checkout, getFaculties, getDepartments, getLevels }) {
  const { isDesktop } = useResponsive();

  const attendanceStatus = attendance?.today?.status;
  const user = useSelector((state) => state.student);
  const {faculties, departments, levels} = user;
  const hasCheckedIn = !!attendance?.today?.check_in;
  const hasCheckedOut = !!attendance?.today?.check_out;
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [courseVisible, setCourseVisible] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    if (faculties.length === 0) {
      getFaculties();
    }

    if (departments.length === 0) {
      getDepartments();
    }

    if (levels.length === 0) {
      getLevels();
    }
  }, [getFaculties, getDepartments, getLevels, faculties.length, departments.length, levels.length]);

  const handleLogout = useCallback(() => {
    logout();

    Toast.show({
      type: "success",
      text1: "Logout Successful",
      text2: "You have been logged out.",
    });

    navigation.replace("SignIn");
  }, [logout, navigation]);

  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 16) return "Good Afternoon";

    return "Good Evening";
  }, []);

  useEffect(() => {
    if (user?.id) {
      todayAttendance(
        user.id,

        (error) => {
          Toast.show({
            type: "error",
            text1: "TODAY ATTENDANCE ERROR:",
            text2: "Unable to load today's attendance.",
          });
        },

        (response) => {
          // Today's attendance loaded successfully.
        }
      );
    }
  }, [user?.id, todayAttendance]);
  
  const scanFingerprint = useCallback(async () => {
    try {
      // const compatible = await LocalAuthentication.hasHardwareAsync();

      // if (!compatible) {
      //   Toast.show({
      //     type: "error",
      //     text1: "Fingerprint Failed",
      //     text2: "This device does not support fingerprint authentication.",
      //   });
      //   return;
      // }

      // const enrolled = await LocalAuthentication.isEnrolledAsync();

      // if (!enrolled) {
      //   Toast.show({
      //     type: "error",
      //     text1: "Fingerprint Failed",
      //     text2: "No fingerprint is enrolled.",
      //   });
      //   return;
      // }

      // const result = await LocalAuthentication.authenticateAsync({
      //   promptMessage: "Scan your fingerprint to record attendance",
      //   disableDeviceFallback: false,
      //   cancelLabel: "Cancel",
      // });

      // if (!result.success) {
      //   Toast.show({
      //     type: "error",
      //     text1: "Fingerprint Failed",
      //     text2: "Fingerprint verification failed.",
      //   });
      //   return;
      // }

      checkin(
        user.id,

        (error) => {
          Toast.show({
            type: "error",
            text1: "Attendance Failed",
            text2: error.message || "Unable to record attendance.",
          });
        },

        async (response) => {
          Toast.show({
            type: "success",
            text1: "Attendance Recorded",
            text2: response.message,
          });

          // Reload today's attendance
          todayAttendance(user.id);
        }
      );
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Attendance Failed",
        text2: "Attendance has already been recorded today.",
      });
    }
  }, [checkin, todayAttendance, user?.id]);

  const scanCheckout = useCallback(() => {
    if (!user?.id) return;

    checkout(
      user.id,

      (error) => {
        Toast.show({
          type: "error",
          text1: "Checkout Failed",
          text2: error.message || "Unable to record checkout.",
        });
      },

      (response) => {
        Toast.show({
          type: "success",
          text1: "Checkout Recorded",
          text2: response.message,
        });

        todayAttendance(user.id);
      }
    );
  }, [checkout, todayAttendance, user?.id]);

  const facultyOptions = user?.faculties?.map((faculty) => ({
    label: faculty,
    value: faculty,
  }));

  const departmentOptions = user?.departments?.map((department) => ({
    label: department,
    value: department,
  }));

  const levelOptions = user?.levels?.map((level) => ({
    label: level,
    value: level,
  }));

  return (
    <View style={[dashboard.container, isDesktop && dashboard.desktopContainer]}>
      <View style={dashboard.navbar}>
        <Text style={dashboard.logo}><Image source={moh} style={dashboard.logo} /></Text>

        <Pressable onPress={() => setLogoutVisible(true)}> 
          <Text style={dashboard.link}>Logout</Text>
        </Pressable>
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={dashboard.content}>
          <Text style={dashboard.greeting}>
            {getGreeting()} 👋
          </Text>

          <Text style={dashboard.welcome}>
            Welcome back, {user?.firstname}
          </Text>
        </View>

        <Button
          title="Course Registration"
          iconName="book"
          iconSize={24}
          onPress={() => setCourseVisible(true)}
          textStyle={{marginLeft: 10}}
        />

        <View style={dashboard.statusCard}>
          <Text style={dashboard.statusTitle}>Today's Status</Text>

          <Text
            style={[
              dashboard.statusText,
              {
                color:
                  attendanceStatus === "Present"
                    ? COLORS.success
                    : COLORS.danger,
              },
            ]}
          >
            {attendanceStatus === "Present"
              ? "🟢 Present"
              : "🔴 Attendance Not Recorded"}
          </Text>
          {attendance?.today?.check_in && (
            <>
              <Text style={dashboard.label}>Checked in</Text>
              <Text style={dashboard.value}>
                {attendance.today.check_in}
              </Text>
            </>
          )}

          {attendance?.today?.check_out && (
            <>
              <Text style={dashboard.label}>Checked out</Text>
              <Text style={dashboard.value}>
                {attendance.today.check_out}
              </Text>
            </>
          )}
        </View>

        {!hasCheckedIn && (
          <Button
            title="Scan Fingerprint"
            iconName="finger-print"
            iconSize={24}
            onPress={scanFingerprint}
            textStyle={{marginLeft: 10}}
          />
        )}

        {hasCheckedIn && !hasCheckedOut && (
          <Button
            title="Check Out"
            iconName="finger-print"
            iconSize={24}
            onPress={scanCheckout}
            textStyle={{marginLeft: 10}}
          />
        )}

        {hasCheckedOut && (
          <Text style={dashboard.value}>
            Attendance completed for today
          </Text>
        )}

        <View style={dashboard.card}>
          <Text style={dashboard.cardTitle}>Student Information</Text>

          <Text style={dashboard.label}>Name</Text>
          <Text style={dashboard.value}>
            {user?.firstname} {user?.lastname}
          </Text>

          <Text style={dashboard.label}>Matric Number</Text>
          <Text style={dashboard.value}>{user?.matricNo}</Text>

          <Text style={dashboard.label}>Email</Text>
          <Text style={dashboard.value}>{user?.email}</Text>

          <Text style={dashboard.label}>Department</Text>
          <Text style={dashboard.value}>{user?.department}</Text>

          <Text style={dashboard.label}>Faculty</Text>
          <Text style={dashboard.value}>{user?.faculty}</Text>

          <Text style={dashboard.label}>Level</Text>
          <Text style={dashboard.value}>{user?.level} Level</Text>
        </View>

        <Button title="Attendance History" iconRightName="arrow-forward" iconRightSize={18} onPress={() => navigation.navigate("AttendanceHistory")} textStyle={{marginRight: 10}} />

        <Modal
          visible={logoutVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setLogoutVisible(false)}
        >
          <Pressable
            style={dashboard.modalContainer}
            onPress={() => setLogoutVisible(false)}
          >
            <Pressable
              style={[
                dashboard.cardFilter,
                isDesktop && dashboard.desktopCardFilter
              ]}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={dashboard.labelFilter}>
                Log Out?
              </Text>

              <Text style={dashboard.labelFilters}>
                Are you sure you want to log out?
              </Text>

              <View style={dashboard.buttonContainer}>
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
                  style={{ width: "48%" }}
                />
              </View>
            </Pressable>
          </Pressable>
        </Modal>

        <Modal
          visible={courseVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setCourseVisible(false)}
        >
          <Pressable
            style={dashboard.modalContainer}
            onPress={() => setCourseVisible(false)}
          >
            <Pressable
              style={[
                dashboard.cardFilter,
                isDesktop && dashboard.desktopCourseFilter,
              ]}
              onPress={(e) => e.stopPropagation()}
            >
              <Text style={dashboard.labelFilter}>
                Course Registration
              </Text>

              <View style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
                <Dropdown
                  label="Semester"
                  value={selectedSemester}
                  placeholder="Select Semester"
                  onSelect={(value) => setSelectedSemester(value)}
                  options={[
                    { label: "First Semester", value: "First Semester" },
                    { label: "Second Semester", value: "Second Semester" },
                  ]}
                />

                <Dropdown
                  label="Faculty"
                  value={selectedFaculty}
                  placeholder="Select Faculty"
                  onSelect={(value) => setSelectedFaculty(value)}
                  options={facultyOptions}
                />

                <Dropdown
                  label="Department"
                  value={selectedDepartment}
                  placeholder="Select Department"
                  onSelect={(value) => setSelectedDepartment(value)}
                  options={departmentOptions}
                />               

                <Dropdown
                  label="Level"
                  value={selectedLevel}
                  placeholder="Select Level"
                  onSelect={(value) => setSelectedLevel(value)}
                  options={levelOptions}
                />

                {/* <Dropdown
                  label="Course"
                  value={selectedCourse}
                  placeholder="Select Course"
                  onSelect={(value) => setSelectedCourse(value)}
                  options={courseOptions}
                /> */}
              </View>

              <View style={dashboard.buttonContainer}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setCourseVisible(false);
                  }}
                  style={{
                    width: "48%",
                    backgroundColor: COLORS.primaryDark,
                  }}
                />

                <Button
                  title="Save"
                  // onPress={handleCourseRegistration}
                  style={{ width: "48%" }}
                />
              </View>

            </Pressable>
          </Pressable>
        </Modal>
      </ScrollView>
    </View>
  );
}