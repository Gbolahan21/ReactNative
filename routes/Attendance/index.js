import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  RefreshControl,
  StyleSheet,
  Modal,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector } from "react-redux";
import useResponsive from "../../hooks/useResponsive";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Toast from "react-native-toast-message";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import Pagination from "../../components/Pagination";
import { COLORS } from "../../constants/colors";

dayjs.extend(customParseFormat);

export default function Attendance({
  attendanceHistory,
  attendance,
  getCourses
}) {

  const user = useSelector((state) => state.student);
  const {
    courses = [],
  } = user;
  const { isDesktop } = useResponsive();

  const [search, setSearch] = useState("");
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const registeredCourses = courses.filter(
    (course) => course.registered
  );

  const history = attendance?.history || [];

  const page = attendance?.page || 1;
  const totalPages = attendance?.totalPages || 1;
  const totalRecords = attendance?.totalRecords || 0;

  const presentCount = history.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = history.filter(
    (item) => item.status === "Absent"
  ).length;

  const attendanceRate =
    totalRecords === 0
      ? 0
      : Math.round((presentCount / totalRecords) * 100);

  const loadHistory = useCallback(
    (pageNumber = 1) => {
      if (!user?.id) return;

      attendanceHistory(
        user.id,
        pageNumber,
        10,
        () => {
          Toast.show({
            type: "error",
            text1: "Attendance Load Failed",
            text2: "Unable to load attendance history.",
          });
        }
      );
    },
    [attendanceHistory, user?.id]
  );

  useEffect(() => {
    if (user?.id) {
      loadHistory(1);
    }
  }, [user?.id, loadHistory]);

  useEffect(() => {
    setFilteredHistory(history);
    getCourses();
  }, [history]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    loadHistory(1);

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, [loadHistory]);

  const formatDate = (date) => {
    return dayjs(date).format("DD MMM YYYY");
  };

  const formatTime = (time) => {
    if (!time) return "--";

    return dayjs(
      time,
      "HH:mm:ss"
    ).format("hh:mm A");
  };

  const handleApplyFilter = () => {
    let filtered = history;

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (item) => item.status === selectedStatus
      );
    }

    // Filter by course
    if (selectedCourse !== "All") {
      filtered = filtered.filter(
        (item) =>
          item.course_id === selectedCourse
      );
    }

    if (selectedDate) {
      const formattedDate =
        dayjs(selectedDate).format("YYYY-MM-DD");

      filtered = filtered.filter(
        (item) =>
          dayjs(item.attendance_date).format("YYYY-MM-DD") ===
          formattedDate
      );
    }

    setFilteredHistory(filtered);
    setFilterVisible(false);
  };

  const handleResetFilter = () => {
    setSelectedStatus("All");
    setSelectedCourse("All");
    setSelectedDate(null);
    setFilteredHistory(history);
    setFilterVisible(false);
  };

  const handleSearch = (text) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredHistory(history);
      return;
    }

    const query = text.toLowerCase();

    const filtered = history.filter((item) => {
      const status = item.status?.toLowerCase() || "";
      const courseCode = item.course_code?.toLowerCase() || "";

      return (
        status.includes(query) ||
        courseCode.includes(query)
      );
    });

    setFilteredHistory(filtered);
  };

  const renderAttendance = ({ item }) => {
    const isPresent = item.status === "Present";

    return (
      <View style={styles.attendanceCard}>
        <View style={styles.courseSection}>
          <View style={styles.courseIcon}>
            <Ionicons
              name="book-outline"
              size={20}
              color={COLORS.primary}
            />
          </View>

          <View style={styles.courseInfo}>
            <Text style={styles.courseCode}>
              {item?.course_code || "Unknown Course"}
            </Text>

            <Text
              style={styles.courseTitle}
              numberOfLines={1}
            >
              {item?.course_title || "Course title unavailable"}
            </Text>

            <Text style={styles.courseUnit}>
              {item?.course_unit || 0} Unit
              {Number(item?.course_unit) !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        <View style={styles.dateSection}>
          <View style={styles.calendarIcon}>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.primary}
            />
          </View>

          <View>
            <Text style={styles.date}>
              {formatDate(item.attendance_date)}
            </Text>

            <Text style={styles.day}>
              {dayjs(item.attendance_date).format("dddd")}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.statusBadge,
            isPresent
              ? styles.presentBadge
              : styles.absentBadge,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              isPresent
                ? styles.presentDot
                : styles.absentDot,
            ]}
          />

          <Text
            style={[
              styles.statusText,
              isPresent
                ? styles.presentText
                : styles.absentText,
            ]}
          >
            {item.status}
          </Text>
        </View>

        <View style={styles.timeSection}>
          <View style={styles.timeItem}>
            <Ionicons
              name="log-in-outline"
              size={18}
              color="#64748B"
            />

            <View>
              <Text style={styles.timeLabel}>
                Check In
              </Text>

              <Text style={styles.time}>
                {formatTime(item.check_in)}
              </Text>
            </View>
          </View>

          <View style={styles.timeItem}>
            <Ionicons
              name="log-out-outline"
              size={18}
              color="#64748B"
            />

            <View>
              <Text style={styles.timeLabel}>
                Check Out
              </Text>

              <Text style={styles.time}>
                {formatTime(item.check_out)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const courseOptions = [
    { id: "All", label: "All Courses" },
    ...registeredCourses.map((course) => ({
      id: course.id,
      label: course.course_code,
    })),
  ];

  return (
    <View style={styles.container}>
      {/* Attendance List */}
      <FlatList
        data={filteredHistory}
        keyExtractor={(item) =>
          item.id.toString()
        }
        renderItem={renderAttendance}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        ListHeaderComponent={
          <>
            {/* Header */}
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>
                  Attendance
                </Text>

                <Text style={styles.subtitle}>
                  Track your attendance and class participation
                </Text>
              </View>

              <View style={styles.headerIcon}>
                <Ionicons
                  name="calendar"
                  size={24}
                  color={COLORS.primary}
                />
              </View>
            </View>

            {/* Summary */}

            <View style={styles.summaryContainer}>
              <SummaryCard
                icon="stats-chart"
                label="Total"
                value={totalRecords}
                iconBackground="#EEF4FF"
                iconColor={COLORS.primary}
              />

              <SummaryCard
                icon="checkmark-circle"
                label="Present"
                value={presentCount}
                iconBackground="#ECFDF5"
                iconColor="#16A34A"
              />

              <SummaryCard
                icon="close-circle"
                label="Absent"
                value={absentCount}
                iconBackground="#FEF2F2"
                iconColor="#EF4444"
              />

              <SummaryCard
                icon="trending-up"
                label="Attendance Rate"
                value={`${attendanceRate}%`}
                iconBackground="#FFF7ED"
                iconColor="#F97316"
              />
            </View>

            {/* Search */}

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>
                  Recent Attendance
                </Text>

                <Text style={styles.sectionSubtitle}>
                  Your latest attendance records
                </Text>
              </View>
            </View>

            <View style={styles.toolbar}>
              <View style={styles.searchContainer}>
                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#94A3B8"
                />

                <TextInput
                  value={search}
                  onChangeText={handleSearch}
                  placeholder="Search attendance by status or course code"
                  placeholderTextColor="#94A3B8"
                  style={styles.searchInput}
                />
              </View>

              <Pressable
                style={styles.filterButton}
                onPress={() => setFilterVisible(true)}
              >
                <Ionicons
                  name="options-outline"
                  size={19}
                  color={COLORS.primary}
                />

                <Text style={styles.filterText}>
                  Filter
                </Text>
              </Pressable>
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="calendar-outline"
              size={48}
              color="#CBD5E1"
            />

            <Text style={styles.emptyTitle}>
              No attendance records
            </Text>

            <Text style={styles.emptyText}>
              Your attendance records will appear here.
            </Text>
          </View>
        }
      />

      <Modal
        visible={filterVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setFilterVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setFilterVisible(false)}
        >
          <Pressable
            style={[
              styles.filterModal,
              isDesktop && styles.desktopFilterModal,
            ]}
            onPress={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}

            <View style={styles.filterHeader}>
              <View>
                <Text style={styles.filterTitle}>
                  Filter Attendance
                </Text>

                <Text style={styles.filterSubtitle}>
                  Narrow down your attendance records
                </Text>
              </View>

              <Pressable
                style={styles.closeButton}
                onPress={() => setFilterVisible(false)}
              >
                <Ionicons
                  name="close"
                  size={21}
                  color="#64748B"
                />
              </Pressable>
            </View>

            {/* Date */}

            <Text style={styles.filterLabel}>
              Date
            </Text>

            {Platform.OS === "web" ? (
              <input
                type="date"
                value={
                  selectedDate
                    ? dayjs(selectedDate).format("YYYY-MM-DD")
                    : ""
                }
                onChange={(event) => {
                  if (event.target.value) {
                    setSelectedDate(
                      dayjs(
                        event.target.value,
                        "YYYY-MM-DD"
                      ).toDate()
                    );
                  } else {
                    setSelectedDate(null);
                  }
                }}
                style={{
                  width: "100%",
                  height: 46,
                  padding: 10,
                  marginBottom: 22,
                  border: "1px solid #E2E8F0",
                  borderRadius: 10,
                  fontSize: 14,
                  color: "#172033",
                  boxSizing: "border-box",
                  outline: "none",
                  backgroundColor: "#FFFFFF",
                }}
              />
            ) : (
              <>
                <Pressable
                  style={styles.dateButton}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={COLORS.primary}
                  />

                  <Text style={styles.dateButtonText}>
                    {selectedDate
                      ? formatDate(selectedDate)
                      : "Select Date"}
                  </Text>

                  <Ionicons
                    name="chevron-down"
                    size={18}
                    color="#94A3B8"
                  />
                </Pressable>

                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowDatePicker(false);

                      if (date) {
                        setSelectedDate(date);
                      }
                    }}
                  />
                )}
              </>
            )}

            {/* Status */}

            <Text style={styles.filterLabel}>
              Status
            </Text>

            <Dropdown
              placeholder="Select status"
              value={selectedStatus}
              options={[
                { label: "All", value: "All" },
                { label: "Present", value: "Present" },
                { label: "Absent", value: "Absent" },
              ]}
              onSelect={(value) => {
                setSelectedStatus(value);
              }}
            />

            {/* Course */}
            <Text style={styles.filterLabel}>
              Course
            </Text>

            <Dropdown
              placeholder="Select a course"
              value={
                selectedCourse === "All"
                  ? ""
                  : courseOptions.find(
                      (course) => course.id === selectedCourse
                    )?.label
              }
              options={courseOptions.map((course) => ({
                label: course.label,
                value: course.id,
              }))}
              onSelect={(value) => {
                setSelectedCourse(value);
              }}
            />

            {/* Buttons */}

            <View style={styles.filterActions}>
              <Button
                title="Reset"
                onPress={handleResetFilter}
                style={styles.resetButton}
                textStyle={styles.resetButtonText}
              />

              <Button
                title="Apply Filter"
                onPress={handleApplyFilter}
                style={styles.applyFilterButton}
              />
            </View>

          </Pressable>
        </Pressable>
      </Modal>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={() => loadHistory(page - 1)}
          onNext={() => loadHistory(page + 1)}
        />
      )}
    </View>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  iconBackground,
  iconColor,
}) {
  return (
    <View style={styles.summaryCard}>
      <View
        style={[
          styles.summaryIcon,
          {
            backgroundColor: iconBackground,
          },
        ]}
      >
        <Ionicons
          name={icon}
          size={21}
          color={iconColor}
        />
      </View>

      <View style={styles.summaryContent}>
        <Text style={styles.summaryLabel}>
          {label}
        </Text>

        <Text style={styles.summaryValue}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },

  courseSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },

  courseIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  courseInfo: {
    flex: 1,
  },

  courseCode: {
    fontSize: 15,
    fontWeight: "800",
    color: "#172033",
  },

  courseTitle: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 3,
  },

  courseUnit: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.primary,
    marginTop: 5,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  filterModal: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },

  desktopFilterModal: {
    maxWidth: 460,
  },

  filterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  filterTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#172033",
  },

  filterSubtitle: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 5,
  },

  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },

  filterLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 9,
  },

  dateButton: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 22,
  },

  dateButtonText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 14,
    color: "#334155",
  },

  statusOptions: {
    gap: 9,
    marginBottom: 18,
  },

  statusOption: {
    height: 46,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  selectedStatusOption: {
    borderColor: COLORS.primary,
    backgroundColor: "#EEF4FF",
  },

  radioOuter: {
    width: 19,
    height: 19,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: "#CBD5E1",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  selectedRadioOuter: {
    borderColor: COLORS.primary,
  },

  radioInner: {
    width: 9,
    height: 9,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },

  statusOptionText: {
    fontSize: 14,
    color: "#64748B",
  },

  selectedStatusText: {
    color: COLORS.primary,
    fontWeight: "600",
  },

  filterActions: {
    flexDirection: "row",
    gap: 10,
  },

  resetButton: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  resetButtonText: {
    color: "#475569",
  },

  applyFilterButton: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 20,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172033",
  },

  subtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
  },

  headerIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 30,
  },

  summaryCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  summaryContent: {
    flex: 1,
  },

  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#172033",
  },

  sectionHeader: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#172033",
  },

  sectionSubtitle: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 4,
  },

  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 18,
  },

  searchContainer: {
    flex: 1,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#172033",
    outlineStyle: 'none'
  },

  filterButton: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#EEF4FF",
    borderWidth: 1,
    borderColor: "#DCE8FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  filterText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },

  list: {
    paddingBottom: 20,
  },

  attendanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  dateSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  calendarIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: "#EEF4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  date: {
    fontSize: 15,
    fontWeight: "700",
    color: "#172033",
  },

  day: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 3,
  },

  statusBadge: {
    position: "absolute",
    top: 17,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  presentBadge: {
    backgroundColor: "#ECFDF5",
  },

  absentBadge: {
    backgroundColor: "#FEF2F2",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    marginRight: 6,
  },

  presentDot: {
    backgroundColor: "#16A34A",
  },

  absentDot: {
    backgroundColor: "#EF4444",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "700",
  },

  presentText: {
    color: "#16A34A",
  },

  absentText: {
    color: "#EF4444",
  },

  timeSection: {
    flexDirection: "row",
    marginTop: 18,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F1F5F9",
    gap: 30,
  },

  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  timeLabel: {
    fontSize: 11,
    color: "#94A3B8",
  },

  time: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginTop: 2,
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 70,
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#475569",
    marginTop: 15,
  },

  emptyText: {
    fontSize: 13,
    color: "#94A3B8",
    marginTop: 5,
    textAlign: "center",
  },

  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    paddingVertical: 10,
  },

  paginationButton: {
    minWidth: 90,
  },

  pageText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
});