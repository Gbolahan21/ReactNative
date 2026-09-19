import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Modal,
  StyleSheet,
  TextInput
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";

import { COLORS } from "../../constants/colors";
import useResponsive from "../../hooks/useResponsive";

export default function Profile({
  navigation,
  logout,
  updateStudent,
  loadLookups,
}) {
  const { isDesktop } = useResponsive();

  const student = useSelector((state) => state.student);

  const {
    faculties,
    departments,
    levels,
  } = student;

  const [editVisible, setEditVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);

  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editFaculty, setEditFaculty] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editLevel, setEditLevel] = useState("");

  const facultyOptions =
    faculties?.map((faculty) => ({
      label: faculty.name,
      value: faculty.name,
    })) || [];

  const departmentOptions =
    departments?.map((department) => ({
      label: department.name,
      value: department.name,
    })) || [];

  const levelOptions =
    levels?.map((level) => ({
      label: level.name,
      value: level.name,
    })) || [];

  const handleOpenEdit = () => {
    setEditFirstname(student?.firstname || "");
    setEditLastname(student?.lastname || "");
    setEditGender(student?.gender || "");
    setEditFaculty(student?.faculty || "");
    setEditDepartment(student?.department || "");
    setEditLevel(student?.level || "");

    setEditVisible(true);

    loadLookups?.(
      () => {},
      () => {}
    );
  };

  const handleUpdateStudent = () => {
    if (
      !editFirstname.trim() ||
      !editLastname.trim() ||
      !editGender ||
      !editFaculty ||
      !editDepartment ||
      !editLevel
    ) {
      Toast.show({
        type: "error",
        text1: "Incomplete Information",
        text2: "Please complete all required fields.",
      });

      return;
    }

    updateStudent(
      editFirstname.trim(),
      editLastname.trim(),
      editGender,
      editDepartment,
      editFaculty,
      editLevel,

      (error) => {
        Toast.show({
          type: "error",
          text1: "Update Failed",
          text2:
            error?.message ||
            error?.error ||
            "Unable to update your information.",
        });
      },

      (response) => {
        Toast.show({
          type: "success",
          text1: "Profile Updated",
          text2:
            response?.message ||
            "Your information has been updated successfully.",
        });

        setEditVisible(false);
      }
    );
  };

  const handleLogout = () => {
    logout();

    Toast.show({
      type: "success",
      text1: "Logout Successful",
      text2: "You have been logged out.",
    });

    setLogoutVisible(false);

    navigation.replace("SignIn");
  };

  const formatLevel = (level) => {
    if (!level) return "N/A";

    return level
      .trim()
      .replace(/\blevel\b/i, "Level");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>
                My Profile
            </Text>

            <Text style={styles.subtitle}>
              Manage your student information
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="person"
              size={22}
              color={COLORS.primary}
            />
          </View>
        </View>

        {/* Student Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>
                Student Information
              </Text>

              <Text style={styles.cardSubtitle}>
                Your registered information
              </Text>
            </View>

            <Pressable
              style={styles.editButton}
              onPress={handleOpenEdit}
            >

              <Text style={styles.editButtonText}>
                Edit
              </Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.label}>
                First Name
              </Text>

              <Text style={styles.value}>
                {student?.firstname || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Last Name
              </Text>

              <Text style={styles.value}>
                {student?.lastname || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Matric Number
              </Text>

              <Text style={styles.value}>
                {student?.matricNo || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Email
              </Text>

              <Text style={styles.value}>
                {student?.email || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Gender
              </Text>

              <Text style={styles.value}>
                {student?.gender || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Faculty
              </Text>

              <Text style={styles.value}>
                {student?.faculty || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Department
              </Text>

              <Text style={styles.value}>
                {student?.department || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.label}>
                Level
              </Text>

              <Text style={styles.value}>
                {formatLevel(student?.level)}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Account
          </Text>

          <Text style={styles.cardSubtitle}>
            Manage your account
          </Text>

          <View style={styles.divider} />

          <Pressable
            style={styles.logoutButton}
            onPress={() => setLogoutVisible(true)}
          >
            <Ionicons
              name="log-out-outline"
              size={22}
              color={COLORS.danger}
            />

            <Text style={styles.logoutText}>
              Logout
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={editVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditVisible(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setEditVisible(false)}
        >
          <Pressable
            style={[
              styles.modalCard,
              isDesktop && styles.desktopModalCard,
            ]}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.modalTitle}>
              Edit Profile
            </Text>

            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formRow}>
                <View style={styles.formItem}>
                  <Text style={styles.formLabel}>
                    First Name
                  </Text>

                  <View>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={editFirstname}
                        onChangeText={setEditFirstname}
                    />
                  </View>
                </View>

                <View style={styles.formItem}>
                  <Text style={styles.formLabel}>
                    Last Name
                  </Text>

                  <View>
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={editLastname}
                        onChangeText={setEditLastname}
                    />
                  </View>
                </View>
              </View>

              <Dropdown
                label="Gender"
                value={editGender}
                placeholder="Select Gender"
                onSelect={setEditGender}
                options={[
                  {
                    label: "Male",
                    value: "Male",
                  },
                  {
                    label: "Female",
                    value: "Female",
                  },
                ]}
              />

              <Dropdown
                label="Faculty"
                value={editFaculty}
                placeholder="Select Faculty"
                onSelect={setEditFaculty}
                options={facultyOptions}
              />

              <Dropdown
                label="Department"
                value={editDepartment}
                placeholder="Select Department"
                onSelect={setEditDepartment}
                options={departmentOptions}
              />

              <Dropdown
                label="Level"
                value={editLevel}
                placeholder="Select Level"
                onSelect={setEditLevel}
                options={levelOptions}
              />

              <View style={styles.buttonRow}>
                <Button
                  title="Cancel"
                  onPress={() => setEditVisible(false)}
                  style={{
                    width: "48%",
                    backgroundColor: COLORS.primaryDark,
                  }}
                />

                <Button
                  title="Save"
                  onPress={handleUpdateStudent}
                  style={{
                    width: "48%",
                  }}
                />
              </View>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Logout Modal */}
      <Modal
        visible={logoutVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setLogoutVisible(false)}
      >
        <Pressable
          style={styles.modalContainer}
          onPress={() => setLogoutVisible(false)}
        >
          <Pressable
            style={[
              styles.logoutModal,
              isDesktop && styles.desktopLogoutModal,
            ]}
            onPress={(event) => event.stopPropagation()}
          >
            <Text style={styles.modalTitleLogOut}>
              Log Out?
            </Text>

            <Text style={styles.modalMessage}>
              Are you sure you want to log out?
            </Text>

            <View style={styles.buttonRow}>
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
                style={{
                  width: "48%",
                }}
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 40,
  },

  // =========================
  // HEADER
  // =========================

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111827",
    letterSpacing: -0.5,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },

  // =========================
  // STUDENT CARD
  // =========================

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: "#E8ECF2",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  cardSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF1F5",
    marginTop: 5,
    marginBottom: 18,
  },

  // =========================
  // INFORMATION GRID
  // =========================

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -6,
  },

  infoItem: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 18,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    color: "#9CA3AF",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 5,
  },

  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    lineHeight: 20,
  },

  // =========================
  // EDIT BUTTON
  // =========================

  editButton: {
    height: 40,
    width: 50,
    borderRadius: 14,
    backgroundColor: COLORS.primary,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    marginTop: 4,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  // =========================
  // ACCOUNT CARD
  // =========================

  accountCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    borderWidth: 1,
    borderColor: "#E8ECF2",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },

  accountHeader: {
    marginBottom: 16,
  },

  accountTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111827",
  },

  accountSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  logoutButton: {
    height: 50,
    borderRadius: 14,

    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FECACA",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  logoutText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "700",
  },

  // =========================
  // EDIT MODAL
  // =========================

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,

    maxHeight: "90%",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },

  desktopModalCard: {
    width: 560,
    alignSelf: "center",
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
  },

  modalTitleLogOut: {
    fontSize: 21,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 20,
    textAlign: "center"
  },

  formRow: {
    flexDirection: "row",
    gap: 12,
  },

  formItem: {
    flex: 1,
    marginBottom: 14,
  },

  formLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,

    backgroundColor: "#F9FAFB",

    paddingHorizontal: 14,

    fontSize: 14,
    color: "#111827",
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

  // =========================
  // LOGOUT MODAL
  // =========================

  logoutModal: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
  },

  desktopLogoutModal: {
    width: 420,
    alignSelf: "center",
  },

  modalMessage: {
    fontSize: 14,
    lineHeight: 21,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 8,
  },
});