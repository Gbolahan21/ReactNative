import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import Button from "../../components/Button";
import { COLORS } from "../../constants/colors";
import styles from "../../assets/styles/styles";

export default function Course({getCourses, registerCourse}) {
  const student = useSelector((state) => state.student);
  const {courses = [], semester} = student;
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [submittingCourses, setSubmittingCourses] = useState(false);

  const handleCourseAction = useCallback(
    (course) => {
      const alreadySelected =
        selectedCourses.some(
          (selected) =>
            selected.id === course.id
        );

      if (alreadySelected) {
        setSelectedCourses((prev) =>
          prev.filter(
            (selected) =>
              selected.id !== course.id
          )
        );

        return;
      }

      setSelectedCourses((prev) => [
        ...prev,
        course,
      ]);
    },
    [selectedCourses]
  );

  const isCourseSelected = useCallback(
    (courseId) => {
      return selectedCourses.some(
        (course) => course.id === courseId
      );
    },
    [selectedCourses]
  );

  const handleRegisterAll = useCallback(() => {
    setSelectedCourses(courses);
  }, [courses]);

  const unselectedCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        !selectedCourses.some(
          (selected) =>
            selected.id === course.id
        )
    );
  }, [courses, selectedCourses]);

  const handleSubmitCourses = useCallback(() => {
    if (selectedCourses.length === 0) {
      Toast.show({
        type: "error",
        text1: "No Courses Selected",
        text2:
          "Please select at least one course.",
      });

      return;
    }

    setSubmittingCourses(true);

    const newCourses =
      selectedCourses.filter(
        (selected) =>
          !courses.some(
            (course) =>
              course.id === selected.id &&
              course.registered
          )
      );

    if (newCourses.length === 0) {
      setSubmittingCourses(false);

      Toast.show({
        type: "info",
        text1: "No Changes",
        text2:
          "There are no new courses to register.",
      });

      return;
    }

    let completed = 0;
    let failed = false;

    newCourses.forEach((course) => {
      registerCourse(
        course.id,

        (error) => {
          if (failed) return;

          failed = true;

          setSubmittingCourses(false);

          Toast.show({
            type: "error",
            text1: "Registration Failed",
            text2:
              error?.message ||
              "Unable to register courses.",
          });
        },

        () => {
          completed++;

          if (
            completed ===
            newCourses.length
          ) {
            setSubmittingCourses(false);

            Toast.show({
              type: "success",
              text1:
                "Registration Successful",
              text2:
                "Your courses have been registered.",
            });

            getCourses(
              () => {},
              () => {}
            );
          }
        }
      );
    });
  }, [selectedCourses, courses, registerCourse, getCourses]);

  const formatLevel = (level) => {
    if (!level) {
      return "N/A";
    }

    return level
      .trim()
      .replace(/\blevel\b/i, "Level");
  };

  const registeredCourses = useMemo(
    () => courses.filter((course) => course.registered),
    [courses]
  );

  const hasRegisteredCourses = registeredCourses.length > 0;
 
  const availableCourses = useMemo(
    () => courses.filter((course) => !course.registered),
    [courses]
  );

  useEffect(() => {
    if (!student?.id) {
      return;
    }

    setLoadingCourses(true);

    getCourses(
      (error) => {
        setLoadingCourses(false);

        Toast.show({
          type: "error",
          text1: "Course Loading Failed",
          text2:
            error?.message ||
            "Unable to load courses.",
        });
      },
      () => {
        setLoadingCourses(false);
      }
    );
  }, [student?.id, getCourses]);

  useEffect(() => {
    const registeredCourses = courses.filter(
      (course) => course.registered
    );

    setSelectedCourses(registeredCourses);
  }, [courses]);

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
            <Text style={styles.attendanceTitle}>
              My Courses
            </Text>

            <Text style={styles.attendanceSubtitle}>
              Manage your course registration
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="book"
              size={24}
              color={COLORS.primary}
            />
          </View>
        </View>

        {/* Student Information */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>
            Registration Information
          </Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>
                Semester
              </Text>

              <Text style={styles.infoValue}>
                {semester?.name ||
                  semester ||
                  "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>
                Faculty
              </Text>

              <Text style={styles.infoValue}>
                {student?.faculty || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>
                Department
              </Text>

              <Text style={styles.infoValue}>
                {student?.department || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>
                Level
              </Text>

              <Text style={styles.infoValue}>
                {formatLevel(student?.level)}
              </Text>
            </View>
          </View>
        </View>

        {/* Loading */}
        {loadingCourses && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
            />

            <Text style={styles.loadingText}>
              Loading courses...
            </Text>
          </View>
        )}

        {/* Course Registration */}

        {!loadingCourses && (
          <>
            {!hasRegisteredCourses && (
              <>
                {/* Available Courses */}

                <View style={styles.sectionHeader}>
                  <View>
                    <Text style={styles.sectionTitle}>
                      Available Courses
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                      Select the courses you want to register
                    </Text>
                  </View>

                  {unselectedCourses.length > 0 && (
                    <Pressable
                      style={styles.registerAllButton}
                      onPress={handleRegisterAll}
                    >
                      <Ionicons
                        name="checkmark-done-outline"
                        size={16}
                        color={COLORS.primary}
                      />

                      <Text style={styles.registerAllText}>
                        Register All
                      </Text>
                    </Pressable>
                  )}
                </View>

                {availableCourses.length === 0 ? (
                  <View style={styles.emptyCard}>
                    <Ionicons
                      name="book-outline"
                      size={42}
                      color="#94A3B8"
                    />

                    <Text style={styles.emptyTitle}>
                      No Courses Available
                    </Text>

                    <Text style={styles.emptyText}>
                      No courses are currently available
                      for your registration information.
                    </Text>
                  </View>
                ) : (
                  <View style={styles.courseList}>
                    {availableCourses.map((course) => {
                      const selected =
                        isCourseSelected(course.id);

                      return (
                        <View
                          key={course.id}
                          style={[
                            styles.courseCard,
                            selected &&
                              styles.selectedCourseCard,
                          ]}
                        >
                          <View style={styles.courseInformation}>
                            <Text style={styles.courseCode}>
                              {course.course_code}
                            </Text>

                            <Text style={styles.courseTitle}>
                              {course.course_title}
                            </Text>
                          </View>

                          <Pressable
                            style={[
                              styles.courseAction,
                              selected
                                ? styles.dropButton
                                : styles.addButton,
                            ]}
                            onPress={() =>
                              handleCourseAction(course)
                            }
                          >
                            <Ionicons
                              name={
                                selected
                                  ? "remove"
                                  : "add"
                              }
                              size={18}
                              color="#FFFFFF"
                            />

                            <Text style={styles.actionText}>
                              {selected ? "DROP" : "ADD"}
                            </Text>
                          </Pressable>
                        </View>
                      );
                    })}
                  </View>
                )}

                {/* Selected Courses */}

                {selectedCourses.length > 0 && (
                  <View style={styles.selectedSection}>
                    <View style={styles.sectionHeader}>
                      <View>
                        <Text style={styles.sectionTitle}>
                          Selected Courses
                        </Text>

                        <Text style={styles.sectionSubtitle}>
                          {selectedCourses.length} course
                          {selectedCourses.length !== 1
                            ? "s"
                            : ""}{" "}
                          selected
                        </Text>
                      </View>
                    </View>

                    <View style={styles.selectedCard}>
                      {selectedCourses.map(
                        (course, index) => (
                          <View
                            key={course.id}
                            style={[
                              styles.selectedRow,
                              index !==
                                selectedCourses.length - 1 &&
                                styles.selectedRowBorder,
                            ]}
                          >
                            <View
                              style={styles.selectedIcon}
                            >
                              <Ionicons
                                name="checkmark"
                                size={16}
                                color={COLORS.success}
                              />
                            </View>

                            <View
                              style={
                                styles.selectedInformation
                              }
                            >
                              <Text
                                style={
                                  styles.selectedCode
                                }
                              >
                                {course.course_code}
                              </Text>

                              <Text
                                style={
                                  styles.selectedTitle
                                }
                              >
                                {course.course_title}
                              </Text>
                            </View>

                            <Text
                              style={styles.selectedText}
                            >
                              Selected
                            </Text>
                          </View>
                        )
                      )}
                    </View>

                    {/* Submit */}

                    <Button
                      title={
                        submittingCourses
                          ? "Submitting..."
                          : "Submit Registration"
                      }
                      iconName={
                        submittingCourses
                          ? undefined
                          : "checkmark-circle-outline"
                      }
                      iconSize={21}
                      onPress={handleSubmitCourses}
                      disabled={submittingCourses}
                      style={styles.submitButton}
                      textStyle={styles.submitButtonText}
                    />

                    <Text style={styles.submitNote}>
                      Your changes will only be saved when
                      you press Submit Registration.
                    </Text>
                  </View>
                )}
              </>
            )}

            {hasRegisteredCourses && (
              <View style={styles.registeredSection}>
                <View style={styles.sectionHeader}>
                  <View>
                    <Text style={styles.sectionTitle}>
                      Registered Courses
                    </Text>

                    <Text style={styles.sectionSubtitle}>
                      {registeredCourses.length} course
                      {registeredCourses.length !== 1
                        ? "s"
                        : ""}{" "}
                      registered for this semester
                    </Text>
                  </View>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ width: "100%" }}
                >
                  <View style={styles.table}>
                    {/* Table Header */}

                    <View
                      style={[
                        styles.tableRow,
                        styles.tableHeader,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tableCell,
                          styles.codeColumn,
                        ]}
                      >
                        Course Code
                      </Text>

                      <Text
                        style={[
                          styles.tableCell,
                          styles.titleColumn,
                        ]}
                      >
                        Course Title
                      </Text>

                      <Text
                        style={[
                          styles.tableCell,
                          styles.unitColumn,
                        ]}
                      >
                        Course Unit
                      </Text>
                    </View>

                    {/* Registered Courses */}

                    {registeredCourses.map((course) => (
                      <View
                        key={course.id}
                        style={styles.tableRow}
                      >
                        <Text
                          style={[
                            styles.tableCell,
                            styles.codeColumn,
                            styles.tableCourseCode,
                          ]}
                        >
                          {course.course_code}
                        </Text>

                        <Text
                          style={[
                            styles.tableCell,
                            styles.titleColumn,
                          ]}
                          numberOfLines={2}
                        >
                          {course.course_title}
                        </Text>

                        <Text
                          style={[
                            styles.tableCell,
                            styles.unitColumn,
                          ]}
                        >
                          {course.course_unit ||  "-"}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}