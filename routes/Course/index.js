import React, {
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
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "../../components/Button";
import { COLORS } from "../../constants/colors";

export default function Course({
  getCourses,
  registerCourse,
}) {
  const student = useSelector(
    (state) => state.student
  );

  const {
    courses = [],
    semester,
  } = student;

  const [selectedCourses, setSelectedCourses] =
    useState([]);

  const [loadingCourses, setLoadingCourses] =
    useState(false);

  const [submittingCourses, setSubmittingCourses] =
    useState(false);

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

  const handleRegisterAll = () => {
    setSelectedCourses(courses);
  };

  const unselectedCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        !selectedCourses.some(
          (selected) =>
            selected.id === course.id
        )
    );
  }, [courses, selectedCourses]);

  const handleSubmitCourses = () => {
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
  };

  const formatLevel = (level) => {
    if (!level) {
      return "N/A";
    }

    return level
      .trim()
      .replace(/\blevel\b/i, "Level");
  };

  const registeredCourses = courses.filter(
    (course) => course.registered
  );

  const hasRegisteredCourses = registeredCourses.length > 0;
 
  const availableCourses = courses.filter(
    (course) => !course.registered
  );

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
            <Text style={styles.title}>
              My Courses
            </Text>

            <Text style={styles.subtitle}>
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
          <View style={styles.infoHeader}>
            <Ionicons
              name="person-circle-outline"
              size={22}
              color={COLORS.primary}
            />

            <Text style={styles.infoTitle}>
              Registration Information
            </Text>
          </View>

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
              color={COLORS.primary}
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

const styles = StyleSheet.create({
  tableCourseCode: {
    fontWeight: "700",
    color: COLORS.primary,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,

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
    gap: 8,
    marginBottom: 18,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 18,
  },

  infoItem: {
    width: "50%",
    paddingRight: 10,
  },

  infoLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },

  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: "#64748B",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: "#94A3B8",
  },

  registerAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#EEF2FF",
  },

  registerAllText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primary,
  },

  courseList: {
    gap: 10,
  },

  courseCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 2,
  },

  selectedCourseCard: {
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },

  courseInformation: {
    flex: 1,
  },

  courseCode: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 4,
  },

  courseTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    lineHeight: 18,
  },

  courseUnit: {
    marginTop: 5,
    fontSize: 10,
    color: "#94A3B8",
  },

  courseAction: {
    minWidth: 72,
    height: 38,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },

  addButton: {
    backgroundColor: COLORS.primary,
  },

  dropButton: {
    backgroundColor: COLORS.danger,
  },

  actionText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  selectedSection: {
    marginTop: 28,
  },

  selectedCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  selectedRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 10,
  },

  selectedRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  selectedIcon: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#DCFCE7",
    alignItems: "center",
    justifyContent: "center",
  },

  selectedInformation: {
    flex: 1,
  },

  selectedCode: {
    fontSize: 12,
    fontWeight: "800",
    color: "#0F172A",
  },

  selectedTitle: {
    marginTop: 2,
    fontSize: 11,
    color: "#64748B",
  },

  selectedText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.success,
  },

  submitButton: {
    width: "100%",
    marginTop: 18,
  },

  submitButtonText: {
    marginLeft: 7,
  },

  submitNote: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 10,
    lineHeight: 15,
    color: "#94A3B8",
  },

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  emptyText: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: "#64748B",
  },

  registeredSection: {
  marginTop: 24,
  marginBottom: 24,
},

table: {
  width: "100%",
  minWidth: 300,
  backgroundColor: "#FFFFFF",
  borderRadius: 14,
  overflow: "hidden",
  borderWidth: 1,
  borderColor: "#E5E7EB",
},

tableRow: {
  flexDirection: "row",
  alignItems: "center",
  minHeight: 52,
  borderBottomWidth: 1,
  borderBottomColor: "#E5E7EB",
},

tableHeader: {
  backgroundColor: "#F8FAFC",
  minHeight: 46,
},

tableCell: {
  paddingHorizontal: 14,
  fontSize: 12,
  color: "#374151",
},

codeColumn: {
  width: 100,
},

titleColumn: {
  width: 260,
},

unitColumn: {
  width: 100,
  textAlign: "center",
},

courseCode: {
  fontWeight: "700",
  color: "#111827",
},

availableSection: {
  marginTop: 8,
  marginBottom: 24,
},

courseInfo: {
  flex: 1,
  paddingRight: 10,
},

courseTitle: {
  marginTop: 4,
  fontSize: 12,
  color: "#6B7280",
},

actionButton: {
  minWidth: 78,
  height: 38,
  borderRadius: 9,
  alignItems: "center",
  justifyContent: "center",
},

addButton: {
  backgroundColor: COLORS.primary,
},

dropButton: {
  backgroundColor: COLORS.danger,
},

actionText: {
  color: "#FFFFFF",
  fontSize: 11,
  fontWeight: "700",
},
});