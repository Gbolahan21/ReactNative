import {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  RefreshControl,
  Modal,
  Platform,
  ActivityIndicator
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
import styles from "../../assets/styles/styles";

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
  const [loading, setLoading] = useState(true);

  const registeredCourses = useMemo(
    () => courses.filter((course) => course.registered),
    [courses]
  );

  const history = useMemo(
    () => attendance?.history || [],
    [attendance?.history]
  );

  const page = attendance?.page || 1;
  const totalPages = attendance?.totalPages || 1;
  const totalRecords = filteredHistory.length;

  const { presentCount, absentCount } = useMemo(() => {
    let present = 0;
    let absent = 0;

    filteredHistory.forEach((item) => {
      if (item.status === "Present") {
        present++;
      } else if (item.status === "Absent") {
        absent++;
      }
    });

    return {
      presentCount: present,
      absentCount: absent,
    };
  }, [filteredHistory]);

  const attendanceRate =
    totalRecords === 0
      ? 0
      : Math.round((presentCount / totalRecords) * 100);

  const loadHistory = useCallback(
    (pageNumber = 1) => {
      if (!user?.id) return;

      setLoading(true);

      attendanceHistory(
        user.id,
        pageNumber,
        10,
        () => {
          setLoading(false);
          Toast.show({
            type: "error",
            text1: "Attendance Load Failed",
            text2: "Unable to load attendance history.",
          });
        },
        () => {
          setLoading(false);
        }
      );
    },
    [attendanceHistory, user?.id]
  );

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

  const handleApplyFilter = useCallback(() => {
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
  }, [history, selectedCourse, selectedStatus, selectedDate]);

  const handleResetFilter = () => {
    setSearch("")
    setSelectedStatus("All");
    setSelectedCourse("All");
    setSelectedDate(null);
    setFilteredHistory(history);
    setFilterVisible(false);
  };

  const handleSearch = useCallback((text) => {
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
  }, [history]);

  const renderAttendance = useCallback(({ item }) => {
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
  }, []);

  const courseOptions = useMemo(
    () => [
    { id: "All", label: "All Courses" },
    ...registeredCourses.map((course) => ({
      id: course.id,
      label: course.course_code,
    })),
  ], [registeredCourses]);

  useEffect(() => {
    if (user?.id) {
      loadHistory(1);
    }
  }, [user?.id, loadHistory]);

  useEffect(() => {
    setFilteredHistory(history);
    getCourses();
  }, [history, getCourses]);

  return (
    <View style={styles.container}>
      {/* Attendance List */}
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
           <Text style={styles.loadingText}>
              Loading attendance...
            </Text>
        </View>
      ) : (
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
                  <Text style={styles.attendanceTitle}>
                    Attendance
                  </Text>

                  <Text style={styles.attendanceSubtitle}>
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
              <Button
                title="Clear"
                onPress={handleResetFilter}
                style={styles.clearButton}
              />
            </View>
          }
        />
      )}

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