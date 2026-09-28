import { useCallback, useState, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput
} from "react-native";
import { useSelector } from "react-redux";
import Ionicons from "@expo/vector-icons/Ionicons";
import Toast from "react-native-toast-message";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import AppModal from "../../components/AppModal"

import { COLORS } from "../../constants/colors";
import styles from "../../assets/styles/styles";

export default function Profile({
  navigation,
  logout,
  updateStudent,
  loadLookups,
}) {
  const student = useSelector((state) => state.student);
  const {faculties, departments, levels} = student;
  const [editVisible, setEditVisible] = useState(false);
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [editFirstname, setEditFirstname] = useState("");
  const [editLastname, setEditLastname] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editFaculty, setEditFaculty] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editLevel, setEditLevel] = useState("");

  const facultyOptions = useMemo(
    () =>
      faculties?.map((faculty) => ({
        label: faculty.name,
        value: faculty.name,
      })) || [],
    [faculties]
  );

  const departmentOptions = useMemo(
    () =>
      departments?.map((department) => ({
        label: department.name,
        value: department.name,
      })) || [],
    [departments]
  );

  const levelOptions = useMemo(
    () =>
      levels?.map((level) => ({
        label: level.name,
        value: level.name,
      })) || [],
    [levels]
  );

  const handleOpenEdit = useCallback(() => {
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
  }, [student, loadLookups]);

  const handleUpdateStudent = useCallback(() => {
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
  }, [
    updateStudent,
    editDepartment,
    editFaculty,
    editFirstname,
    editGender,
    editLastname,
    editLevel
  ]);

  const handleLogout = useCallback(() => {
    logout();

    Toast.show({
      type: "success",
      text1: "Logout Successful",
      text2: "You have been logged out.",
    });

    setLogoutVisible(false);

    navigation.replace("SignIn");
  }, [logout, navigation]);

  const formatLevel = (level) => {
    if (!level) return "N/A";

    return level
      .trim()
      .replace(/\blevel\b/i, "Level");
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.attendanceTitle}>
                My Profile
            </Text>

            <Text style={styles.attendanceSubtitle}>
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
        <View style={styles.attendanceCard}>
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
              <Text style={styles.profileLabel}>
                First Name
              </Text>

              <Text style={styles.value}>
                {student?.firstname || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.profileLabel}>
                Last Name
              </Text>

              <Text style={styles.value}>
                {student?.lastname || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.profileLabel}>
                Matric Number
              </Text>

              <Text style={styles.value}>
                {student?.matricNo || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.profileLabel}>
                Email
              </Text>

              <Text style={styles.value}>
                {student?.email || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.profileLabel}>
                Gender
              </Text>

              <Text style={styles.value}>
                {student?.gender || "Not provided"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.profileLabel}>
                Faculty
              </Text>

              <Text style={styles.value}>
                {student?.faculty || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.profileLabel}>
                Department
              </Text>

              <Text style={styles.value}>
                {student?.department || "N/A"}
              </Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.profileLabel}>
                Level
              </Text>

              <Text style={styles.value}>
                {formatLevel(student?.level)}
              </Text>
            </View>
          </View>
        </View>

        {/* Account Actions */}
        <View style={styles.attendanceCard}>
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
      <AppModal
        visible={editVisible}
        onClose={() => setEditVisible(false)}
        animationType="slide"
        size="large"
      >
        <Text style={styles.profileModalTitle}>
          Edit Profile
        </Text>

        <ScrollView showsVerticalScrollIndicator={false}>
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

          <View style={styles.filterActions}>
            <Button
              title="Cancel"
              onPress={() => setEditVisible(false)}
              style={styles.resetButton}
              textStyle={styles.resetButtonText}
            />

            <Button
              title="Save"
              onPress={handleUpdateStudent}
              style={styles.applyFilterButton}
            />
          </View>
        </ScrollView>
      </AppModal>

      {/* Logout Modal */}
      <AppModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        size="small"
      >
        <Text style={styles.text}>
          Log Out?
        </Text>

        <Text style={styles.modalDescription}>
          Are you sure you want to log out?
        </Text>

        <View style={styles.filterActions}>
          <Button
            title="Stay Logged In"
            onPress={() => setLogoutVisible(false)}
            style={styles.resetButton}
            textStyle={styles.resetButtonText}
          />

          <Button
            title="Log Out"
            onPress={handleLogout}
            style={styles.applyFilterButton}
          />
        </View>
      </AppModal>
    </View>
  );
}