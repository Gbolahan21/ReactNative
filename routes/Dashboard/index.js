import React, {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Modal,
  TextInput
} from "react-native";

import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { COLORS } from "../../constants/colors";

export default function Dashboard({
  navigation,
  checkin,
  todayAttendance,
  checkout,
  attendance,
  getCourses
}) {
  const student = useSelector(
    (state) => state.student
  );
  const {
    courses = [],
  } = student;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const [sessionCode, setSessionCode] = useState("");
  const [checkingIn, setCheckingIn] = useState(false);
  const currentAttendance = attendance?.today?.find(
    (item) => Number(item.course_id) === Number(selectedCourse)
  );

  const attendanceStatus = currentAttendance?.status;
  const hasCheckedIn = !!currentAttendance?.check_in;
  const hasCheckedOut = !!currentAttendance?.check_out;

  const registeredCourses = courses.filter(
    (course) => course.registered
  );

  const activeCourse = registeredCourses.find(
    (course) =>
      Number(course.id) ===
      Number(currentAttendance?.course_id)
  );

  const todayRecords = Array.isArray(attendance?.today)
    ? attendance.today
    : [];

  const inProgressAttendance = todayRecords.filter(
    (item) =>
      item.check_in &&
      !item.check_out
  );

  const completedAttendance = todayRecords.filter(
    (item) =>
      item.check_in &&
      item.check_out
  );

  const getCourse = (courseId) => {
    return registeredCourses.find(
      (course) =>
        Number(course.id) === Number(courseId)
    );
  };

  const registeredCourseOptions = registeredCourses.map(
    (course) => ({
      label: `${course.course_code} - ${course.course_title} (${course.course_unit} Unit${
        Number(course.course_unit) !== 1 ? "s" : ""
      })`,
      value: course.id,
    })
  );

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 16) {
      return "Good Afternoon";
    }

    return "Good Evening";
  };

  useEffect(() => {
    if (!student?.id) {
      return;
    }

    getCourses();

    todayAttendance(
      student.id,

      (error) => {
        Toast.show({
          type: "error",
          text1: "Attendance Error",
          text2:
            error?.message ||
            "Unable to load today's attendance.",
        });
      },

      () => {
        // Attendance loaded
      }
    );
  }, [
    student?.id,
    todayAttendance,
  ]);

  const handleCheckIn = useCallback(() => {
    if (!selectedCourse) {
      Toast.show({
        type: "error",
        text1: "Select a Course",
        text2: "Please select a course before checking in.",
      });

      return;
    }

    setSessionCode("");
    setShowCheckinModal(true);
  }, [selectedCourse]);

  const submitCheckIn = useCallback(() => {
    const code = sessionCode.trim();

    if (!code) {
      Toast.show({
        type: "error",
        text1: "Attendance Code Required",
        text2: "Enter the code provided by your lecturer.",
      });

      return;
    }

    if (code.length !== 6) {
      Toast.show({
        type: "error",
        text1: "Invalid Code",
        text2: "The attendance code must contain 6 digits.",
      });

      return;
    }

    setCheckingIn(true);

    checkin(
      selectedCourse,
      code,

      (error) => {
        setCheckingIn(false);

        Toast.show({
          type: "error",
          text1: "Attendance Failed",
          text2:
            error?.message ||
            "Unable to record attendance.",
        });
      },

      (response) => {
        setCheckingIn(false);
        setShowCheckinModal(false);
        setSessionCode("");

        Toast.show({
          type: "success",
          text1: "Attendance Recorded",
          text2:
            response?.message ||
            "You have been checked in.",
        });

        todayAttendance(student.id);
      }
    );
  }, [
    checkin,
    selectedCourse,
    sessionCode,
    todayAttendance,
    student?.id,
  ]);

  const formatLevel = (level) => {
    if (!level) {
      return "N/A";
    }

    return level
      .trim()
      .replace(/\blevel\b/i, "Level");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              {getGreeting()} 👋
            </Text>

            <Text style={styles.name}>
              {student?.firstname || "Student"}
            </Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() => navigation.navigate("Profile")}
          >
            <Ionicons
              name="person"
              size={22}
              color={COLORS.primary}
            />
          </Pressable>
        </View>

        {/* Today's Attendance */}
        <View style={styles.attendanceCard}>

          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>
                Today's Attendance
              </Text>

              <Text style={styles.date}>
                {new Date().toDateString()}
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                attendanceStatus === "Present"
                  ? styles.presentBadge
                  : styles.absentBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  attendanceStatus === "Present"
                    ? styles.presentText
                    : styles.absentText,
                ]}
              >
                {attendanceStatus === "Present"
                  ? "Present"
                  : "Not Recorded"}
              </Text>
            </View>
          </View>

          <Dropdown
            label="Attendance Course"
            placeholder="Select a course"
            value={
              registeredCourses.find(
                (course) => course.id === selectedCourse
              )?.course_code
            }
            options={registeredCourseOptions}
            onSelect={handleCourseSelect}
          />

          {inProgressAttendance.length > 0 && (
            <View style={styles.attendanceGroup}>
              <Text style={styles.attendanceGroupTitle}>
                Attendance in Progress
              </Text>

              {inProgressAttendance.map((item) => {
                const course = getCourse(item.course_id);

                return (
                  <View
                    key={item.id}
                    style={styles.attendanceCourseCard}
                  >
                    <View style={styles.courseIcon}>
                      <Ionicons
                        name="time-outline"
                        size={22}
                        color={COLORS.primary}
                      />
                    </View>

                    <View style={styles.courseInfo}>
                      <Text style={styles.courseCode}>
                        {course?.course_code || "Unknown Course"}
                      </Text>

                      <Text style={styles.courseTitle}>
                        {course?.course_title || ""}
                      </Text>

                      <Text style={styles.checkInTime}>
                        Checked in: {item.check_in}
                      </Text>
                    </View>

                    <Pressable
                      style={styles.checkOutButton}
                      onPress={() => {
                        checkout(
                          item.course_id,

                          (error) => {
                            Toast.show({
                              type: "error",
                              text1: "Checkout Failed",
                              text2:
                                error?.message ||
                                "Unable to record checkout.",
                            });
                          },

                          (response) => {
                            Toast.show({
                              type: "success",
                              text1: "Checkout Recorded",
                              text2:
                                response?.message ||
                                "You have been checked out.",
                            });

                            todayAttendance(student.id);
                          }
                        );
                      }}
                    >
                      <Ionicons
                        name="log-out-outline"
                        size={17}
                        color="#FFFFFF"
                      />

                      <Text style={styles.checkOutButtonText}>
                        Check Out
                      </Text>
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}

          {completedAttendance.length > 0 && (
            <View style={styles.attendanceGroup}>
              <Text style={styles.attendanceGroupTitle}>
                Attendance Completed
              </Text>

              {completedAttendance.map((item) => {
                const course = getCourse(item.course_id);

                return (
                  <View
                    key={item.id}
                    style={styles.completedCourseCard}
                  >
                    <View style={styles.completedIcon}>
                      <Ionicons
                        name="checkmark-circle"
                        size={22}
                        color={COLORS.success}
                      />
                    </View>

                    <View style={styles.courseInfo}>
                      <Text style={styles.courseCode}>
                        {course?.course_code || "Unknown Course"}
                      </Text>

                      <Text style={styles.courseTitle}>
                        {course?.course_title || ""}
                      </Text>

                      <Text style={styles.attendanceTime}>
                        {item.check_in} - {item.check_out}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          <View style={styles.attendanceTimes}>
            <View style={styles.timeItem}>
              <View style={styles.timeIcon}>
                <Ionicons
                  name="log-in-outline"
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              <View>
                <Text style={styles.timeLabel}>
                  Check In
                </Text>

                <Text style={styles.timeValue}>
                  {currentAttendance?.check_in || "--:--"}
                </Text>
              </View>
            </View>

            <View style={styles.timeItem}>
              <View style={styles.timeIcon}>
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              <View>
                <Text style={styles.timeLabel}>
                  Check Out
                </Text>

                <Text style={styles.timeValue}>
                  {currentAttendance?.check_out || "--:--"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Attendance Action */}
        <View style={styles.actionSection}>

          {!hasCheckedIn && (
            <Button
              title="Check In"
              iconName="finger-print"
              iconSize={22}
              onPress={handleCheckIn}
              disabled={!selectedCourse}
              style={[
                styles.primaryButton,
                !selectedCourse && styles.disabledButton,
              ]}
              textStyle={styles.buttonText}
            />
          )}

          {hasCheckedOut && (
            <View style={styles.completedBox}>
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.success}
              />

              <Text style={styles.completedText}>
                Attendance completed for
              </Text>

              <Text style={styles.completedCourse}>
                {activeCourse?.course_code || "Course"}
              </Text>

              <Text style={styles.completedCourseTitle}>
                {activeCourse?.course_title || ""}
              </Text>
            </View>
          )}

        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickActions}>

          <Pressable
            style={styles.quickCard}
            onPress={() => navigation.navigate("Course")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="book-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.quickTitle}>
              My Courses
            </Text>

            <Text style={styles.quickDescription}>
              View and register courses
            </Text>
          </Pressable>

          <Pressable
            style={styles.quickCard}
            onPress={() => navigation.navigate("Attendance")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.quickTitle}>
              Attendance
            </Text>

            <Text style={styles.quickDescription}>
              View attendance records
            </Text>
          </Pressable>

        </View>

        {/* Student Information */}
        <View style={styles.infoCard}>

          <View style={styles.infoHeader}>
            <Text style={styles.sectionTitle}>
              Student Information
            </Text>

            <Pressable
              onPress={() =>
                navigation?.navigate("Profile")
              }
            >
              <Text style={styles.viewText}>
                View
              </Text>
            </Pressable>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Matric Number
            </Text>

            <Text style={styles.infoValue}>
              {student?.matricNo || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Department
            </Text>

            <Text style={styles.infoValue}>
              {student?.department || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Faculty
            </Text>

            <Text style={styles.infoValue}>
              {student?.faculty || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Level
            </Text>

            <Text style={styles.infoValue}>
              {formatLevel(student?.level)}
            </Text>
          </View>

        </View>
      </ScrollView>

      <Modal
        visible={showCheckinModal}
        transparent
        animationType="fade"
        onRequestClose={() => {
          if (!checkingIn) {
            setShowCheckinModal(false);
          }
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.checkinModal}>

            <View style={styles.modalIcon}>
              <Ionicons
                name="keypad-outline"
                size={28}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.modalTitle}>
              Check In
            </Text>

            <Text style={styles.modalDescription}>
              Enter the 6-digit attendance code provided by your lecturer.
            </Text>

            <Text style={styles.modalLabel}>
              Attendance Code
            </Text>

            <TextInput
              value={sessionCode}
              onChangeText={(text) => {
                const numericValue = text
                  .replace(/[^0-9]/g, "")
                  .slice(0, 6);

                setSessionCode(numericValue);
              }}
              placeholder="000000"
              placeholderTextColor="#94A3B8"
              keyboardType="number-pad"
              maxLength={6}
              editable={!checkingIn}
              style={styles.codeInput}
            />

            <Text style={styles.codeHint}>
              The code is provided by your lecturer during class.
            </Text>

            <View style={styles.modalActions}>

              <Pressable
                style={styles.cancelButton}
                disabled={checkingIn}
                onPress={() => {
                  setShowCheckinModal(false);
                  setSessionCode("");
                }}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={[
                  styles.confirmCheckinButton,
                  (sessionCode.length !== 6 || checkingIn) &&
                    styles.disabledCheckinButton,
                ]}
                disabled={
                  sessionCode.length !== 6 ||
                  checkingIn
                }
                onPress={submitCheckIn}
              >
                <Ionicons
                  name="finger-print-outline"
                  size={18}
                  color="#FFFFFF"
                />

                <Text style={styles.confirmCheckinText}>
                  {checkingIn ? "Checking In..." : "Check In"}
                </Text>
              </Pressable>

            </View>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  checkinModal: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
  },

  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  modalDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },

  modalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 8,
  },

  codeInput: {
    height: 58,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 8,
    color: "#0F172A",
  },

  codeHint: {
    fontSize: 11,
    lineHeight: 16,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 9,
  },

  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },

  confirmCheckinButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  confirmCheckinText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  disabledCheckinButton: {
    opacity: 0.5,
  },

  checkOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    minWidth: 92,
  },

  checkOutButtonText: {
    marginLeft: 5,
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  attendanceGroup: {
    marginTop: 20,
    marginBottom: 10,
  },

  attendanceGroupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },

  attendanceCourseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,

    // subtle elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  courseIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  courseInfo: {
    flex: 1,
    marginRight: 10,
  },

  courseCode: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 3,
  },

  courseTitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 7,
  },

  checkInTime: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.success,
  },

  attendanceGroup: {
    marginTop: 20,
  },

  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  groupTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  attendanceGroupTitle: {
    marginLeft: 7,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 10,
  },

  groupCount: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    backgroundColor: "#EEF2FF",
  },

  /* In Progress */

  inProgressDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  inProgressCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },

  courseIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    marginRight: 12,
  },

  courseInfo: {
    flex: 1,
    minWidth: 0,
  },

  courseCode: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  courseTitle: {
    marginTop: 3,
    fontSize: 12,
    color: COLORS.gray,
  },

  checkInRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  checkInText: {
    marginLeft: 5,
    fontSize: 11,
    color: COLORS.success,
    fontWeight: "600",
  },

  checkOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 9,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    marginLeft: 8,
  },

  checkOutButtonText: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  /* Completed */

  completedCourseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },

  completedIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCFCE7",
    marginRight: 12,
  },

  completedTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  attendanceTime: {
    fontSize: 11,
    color: COLORS.gray,
  },

  completedBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    marginLeft: 8,
  },

  completedBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.success,
  },

  completedBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
  },

  completedIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCFCE7",
    marginRight: 12,
  },

  completedContent: {
    flex: 1,
  },

  completedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.success,
    marginBottom: 3,
  },

  completedCourse: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  completedCourseTitle: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2,
  },
  disabledButton: {
    opacity: 0.5,
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  attendanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  date: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
    marginBottom: 10
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  presentBadge: {
    backgroundColor: "#DCFCE7",
  },

  absentBadge: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  presentText: {
    color: COLORS.success,
  },

  absentText: {
    color: COLORS.danger,
  },

  attendanceTimes: {
    flexDirection: "row",
    marginTop: 24,
    gap: 30,
  },

  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  timeIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  timeLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 2,
  },

  timeValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  actionSection: {
    marginBottom: 24,
  },

  primaryButton: {
    width: "100%",
  },

  buttonText: {
    marginLeft: 8,
  },

  completedBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  completedText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },

  quickCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 5,
  },

  quickDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: "#64748B",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  viewText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
  },

  infoValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },
});