import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Modal,
  RefreshControl,
  Platform,
  Pressable,
  ScrollView
} from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import IconButton from "../../components/IconButton";
import Button from "../../components/Button";
import Pagination from "../../components/Pagination";
import attendances from "../../assets/styles/attendanceHistoryCSS";
import useResponsive from "../../hooks/useResponsive";
import Toast from "react-native-toast-message";

export default function AttendanceHistoryScreen({ navigation, attendanceHistory, attendance }) {
  const { isDesktop } = useResponsive();
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const user = useSelector((state) => state.student);
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

  const attendanceRate = totalRecords === 0 ? 0 : Math.round((presentCount / totalRecords) * 100);

  const loadHistory = useCallback(
    (pageNumber = 1) => {
      if (!user?.id) return;

      attendanceHistory(
        user.id,
        pageNumber,
        10,

        (error) => {
          Toast.show({
            type: "error",
            text1: "Attendance Load Failed",
            text2: "Unable to load attendance history.",
          });
        },
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
  }, [history]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    loadHistory(1);

    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, [loadHistory]);

  const searchAttendance = (text) => {
    setSearch(text);

    if (!text) {
      setFilteredHistory(history);
      return;
    }

    const filtered = history.filter((item) =>
      item.status.includes(text)
    );

    setFilteredHistory(filtered);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  };

  const formatTime = (time) => {
    if (!time) return "--";

    return dayjs(time, "HH:mm:ss").format("hh:mm A");
  };

  if (filteredHistory.length === 0) {
    return (
      <View style={[attendances.container, isDesktop && attendances.desktopContainer]}>
        <Text style={attendances.emptyText}>
          No attendance records found.
        </Text>

        <Button
          title="Back to Dashboard"
          iconName="arrow-back"
          iconSize={18}
          onPress={() => navigation.navigate('Dashboard')}
          textStyle={{marginLeft: 10}}
        />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={attendances.tableRow}>
      <Text style={attendances.statusCell}>
        {item.status === "Present" ? "🟢 Present" : "🔴 Absent"}
      </Text>

      <Text style={attendances.dateCell}>
        {formatDate(item.attendance_date)}
      </Text>

      <Text style={attendances.timeCell}>
        {formatTime(item.check_in)}
      </Text>

      <Text style={attendances.timeCell}>
        {formatTime(item.check_out)}
      </Text>
    </View>
  );

  const handleApplyFilter = () => {
    let filtered = history;

    if (selectedStatus !== "All") {
      filtered = filtered.filter(
        (item) => item.status === selectedStatus
      );
    }

    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");

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
    setSelectedDate(null);
    setFilteredHistory(history);
    setFilterVisible(false);
  };

  return (
    <View style={[attendances.container, isDesktop && attendances.desktopContainer]}>
      <IconButton name="arrow-back" size={28} onPress={() => navigation.navigate('Dashboard')} />
      <ScrollView 
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={attendances.title}>Attendance History</Text>

        <View style={attendances.searchContainer}>
          <TextInput
            placeholder="Search by status..."
            value={search}
            onChangeText={searchAttendance}
            style={attendances.search}
          />

          <IconButton name="filter" size={25} onPress={() => setFilterVisible(true)} />
        </View>

        <View style={attendances.summaryContainer}>
          <View style={attendances.summaryCard}>
            <Text style={attendances.summaryLabel}>
              <Ionicons name="stats-chart" size={20} color="#4A90E2" />{" "}
              Total
            </Text>
            <Text style={attendances.summaryValue}>{totalRecords}</Text>
          </View>

          <View style={attendances.summaryCard}>
            <Text style={attendances.summaryLabel}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#28A745"
              />{" "}
              Present
            </Text>
            <Text style={attendances.summaryValue}>{presentCount}</Text>
          </View>

          <View style={attendances.summaryCard}>
            <Text style={attendances.summaryLabel}>
              <Ionicons
                name="close-circle"
                size={20}
                color="#DC3545"
              />{" "}
              Absent
            </Text>
            <Text style={attendances.summaryValue}>{absentCount}</Text>
          </View>

          <View style={attendances.summaryCard}>
            <Text style={attendances.summaryLabel}>
              <Ionicons
                name="trending-up"
                size={20}
                color="#FF9800"
              />{" "}
              Rate
            </Text>
            <Text style={attendances.summaryValue}>
              {attendanceRate}%
            </Text>
          </View>
        </View>

        <View style={attendances.tableHeader}>
          <Text style={attendances.headerCell}>Status</Text>
          <Text style={attendances.headerCell}>Date</Text>
          <Text style={attendances.headerCell}>Check In</Text>
          <Text style={attendances.headerCell}>Check Out</Text>
        </View>

        <FlatList
          data={filteredHistory}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={() => loadHistory(page - 1)}
          onNext={() => loadHistory(page + 1)}
        />

        <Modal
          visible={filterVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setFilterVisible(false)}
        >
          <Pressable
            style={attendances.modalContainer}
            onPress={() => setFilterVisible(false)}
          >
            <Pressable style={[attendances.cardFilter, isDesktop && attendances.desktopCardFilter]} onPress={(e) => e.stopPropagation()}>
              <Text style={attendances.labelFilter}>Filter Attendance</Text>

              <Text style={attendances.labelFilters}>Date</Text>

              {Platform.OS === "web" ? (
                // Web date picker
                <input
                  type="date"
                  value={
                    selectedDate
                      ? dayjs(selectedDate).format("YYYY-MM-DD")
                      : ""
                  }
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedDate(
                        dayjs(e.target.value, "YYYY-MM-DD").toDate()
                      );
                    }
                  }}
                  style={{
                    width: "100%",
                    height: 45,
                    padding: 10,
                    marginBottom: 20,
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    fontSize: 16,
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                // Android / iOS date picker
                <>
                  <Button
                    title={
                      selectedDate
                        ? formatDate(selectedDate)
                        : "Select Date"
                    }
                    iconName="calendar"
                    onPress={() => setShowDatePicker(true)}
                    style={{ marginBottom: 20 }}
                  />

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

              <Text style={attendances.labelFilters}>Status</Text>
              <View style={attendances.statusButtonsContainer}>
                {["All", "Present", "Absent"].map((status) => (
                  <Button
                    key={status}
                    title={status}
                    onPress={() => setSelectedStatus(status)}
                    style={{
                      backgroundColor: selectedStatus === status ? "#007BFF" : "#E0E0E0",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 10,
                      textAlign: "center",
                    }}
                  />
                ))}
              </View>

              <View style={attendances.buttonContainer}>
                <Button
                  title="Apply"
                  onPress={() => {
                    handleApplyFilter();
                  }}
                  style={{ width: "48%" }}
                />
                <Button
                  title="Reset"
                  onPress={() => {
                    handleResetFilter();
                  }}
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