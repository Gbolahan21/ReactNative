import {
  useCallback,
  useEffect,
  useState,
  useMemo
} from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";

import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import AppModal from "../../components/AppModal";
import { COLORS } from "../../constants/colors";
import styles from "../../assets/styles/styles";

export default function Dashboard({
  navigation,
  checkin,
  todayAttendance,
  checkout,
  attendance,
  getCourses
}) {
  const student = useSelector((state) => state.student);
  const {courses = []} = student;
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

  const registeredCourses = useMemo(
    () => courses.filter((course) => course.registered),
    [courses]
  );

  const activeCourse = useMemo(
    () => 
      registeredCourses.find(
        (course) =>
          Number(course.id) ===
          Number(currentAttendance?.course_id)
      ),
    [registeredCourses, currentAttendance?.course_id]
  );

  const todayRecords = useMemo(
    () => 
      Array.isArray(attendance?.today)
        ? attendance.today
        : [], [attendance.today])

  const { inProgressAttendance, completedAttendance } = useMemo(() => {
    const inProgress = [];
    const completed = [];

    todayRecords.forEach((item) => {
      if (item.check_in && !item.check_out) {
        inProgress.push(item);
      }

      if (item.check_in && item.check_out) {
        completed.push(item);
      }
    });

    return {
      inProgressAttendance: inProgress,
      completedAttendance: completed,
    };
  }, [todayRecords]);

  const getCourse = (courseId) => {
    return registeredCourses.find(
      (course) =>
        Number(course.id) === Number(courseId)
    );
  };

  const registeredCourseOptions = useMemo(
    () =>
      registeredCourses.map((course) => ({
        label: `${course.course_code} - ${course.course_title} (${course.course_unit} Unit${
          Number(course.course_unit) !== 1 ? "s" : ""
        })`,
        value: course.id,
      })),
    [registeredCourses]
  );

  const handleCourseSelect = useCallback((courseId) => {
    setSelectedCourse(courseId);
  }, []);

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

  const handleCheckOut = useCallback((item) => {
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
  }, [checkout, student.id, todayAttendance])

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
    getCourses
  ]);

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

              <Text style={styles.dashboardDate}>
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

                    <Button
                      title="Check Out"
                      onPress={handleCheckOut}
                      iconName="log-out-outline"
                      iconSize={17}
                    />
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

      <AppModal
        visible={showCheckinModal}
        onClose={() => {
          if (!checkingIn) {
            setShowCheckinModal(false);
          }
        }}
        closeOnBackdrop={!checkingIn}
      >
        <View style={styles.modalIcon}>
          <Ionicons
            name="keypad-outline"
            size={28}
            color={COLORS.primary}
          />
        </View>

        <Text style={styles.text}>
          Check In
        </Text>

        <Text style={styles.modalDescription}>
          Enter the 6-digit attendance code provided by your lecturer.
        </Text>

        <Text style={styles.filterLabel}>
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

         <View style={styles.filterActions}>
          <Button
            title="Cancel"
            disabled={checkingIn}
            onPress={() => {
              setShowCheckinModal(false);
              setSessionCode("");
            }}
            style={styles.resetButton}
            textStyle={styles.resetButtonText}
          />

          <Button
            title="Check In"
            style={[
              styles.applyFilterButton,
              (sessionCode.length !== 6 || checkingIn) &&
                styles.disabledCheckinButton,
            ]}
            disabled={
              sessionCode.length !== 6 ||
              checkingIn
            }
            onPress={submitCheckIn}
            iconName="finger-print-outline"
            iconSize={18}
          />
        </View>
      </AppModal>
    </View>
  );
}