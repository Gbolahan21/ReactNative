import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Modal,
  Pressable
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import api from "../services/api";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import attendance from "../assets/styles/attendanceHistoryCSS";

export default function AttendanceHistoryScreen({ navigation }) {

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const totalRecords = history.length;

  useEffect(() => {
    loadHistory();
  }, []);

  const presentCount = history.filter(
    (item) => item.status === "Present"
  ).length;

  const absentCount = history.filter(
    (item) => item.status === "Absent"
  ).length;

  const attendanceRate = totalRecords === 0 ? 0 : Math.round((presentCount / totalRecords) * 100);

  const loadHistory = async (pageNumber = 1) => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      const response = await api.get(
        `/attendance/history/${user.id}?page=${pageNumber}&limit=10`
      );

      // Replace the current page's data
      setHistory(response.data.records);
      setFilteredHistory(response.data.records);

      // Update pagination state
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

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
      <View style={attendance.container}>
        <Text style={attendance.emptyText}>
          No attendance records found.
        </Text>

        <Button
          title="Back to Dashboard"
          iconName="arrow-back"
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={attendance.tableRow}>
      <Text style={attendance.statusCell}>
        {item.status === "Present" ? "🟢 Present" : "🔴 Absent"}
      </Text>

      <Text style={attendance.dateCell}>
        {formatDate(item.attendance_date)}
      </Text>

      <Text style={attendance.timeCell}>
        {formatTime(item.check_in)}
      </Text>

      <Text style={attendance.timeCell}>
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
    <View style={attendance.container}>
      <IconButton name="arrow-back" size={28} onPress={() => navigation.navigate('Dashboard')} />

      <Text style={attendance.title}>Attendance History</Text>

      <View style={attendance.searchContainer}>
        <TextInput
          placeholder="Search by status..."
          value={search}
          onChangeText={searchAttendance}
          style={attendance.search}
        />

        <IconButton name="filter" size={28} onPress={() => setFilterVisible(true)} />
      </View>

      <View style={attendance.summaryContainer}>
        <View style={attendance.summaryCard}>
          <Text style={attendance.summaryLabel}>
            <Ionicons name="stats-chart" size={20} color="#4A90E2" />{" "}
            Total
          </Text>
          <Text style={attendance.summaryValue}>{totalRecords}</Text>
        </View>

        <View style={attendance.summaryCard}>
          <Text style={attendance.summaryLabel}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color="#28A745"
            />{" "}
            Present
          </Text>
          <Text style={attendance.summaryValue}>{presentCount}</Text>
        </View>

        <View style={attendance.summaryCard}>
          <Text style={attendance.summaryLabel}>
            <Ionicons
              name="close-circle"
              size={20}
              color="#DC3545"
            />{" "}
            Absent
          </Text>
          <Text style={attendance.summaryValue}>{absentCount}</Text>
        </View>

        <View style={attendance.summaryCard}>
          <Text style={attendance.summaryLabel}>
            <Ionicons
              name="trending-up"
              size={20}
              color="#FF9800"
            />{" "}
            Rate
          </Text>
          <Text style={attendance.summaryValue}>
            {attendanceRate}%
          </Text>
        </View>
      </View>

      <View style={attendance.tableHeader}>
        <Text style={attendance.headerCell}>Status</Text>
        <Text style={attendance.headerCell}>Date</Text>
        <Text style={attendance.headerCell}>Check In</Text>
        <Text style={attendance.headerCell}>Check Out</Text>
      </View>

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
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
      >
        <View style={attendance.modalContainer}>
          <View style={attendance.cardFilter}>
            <Text style={attendance.labelFilter}>Filter Attendance</Text>

            <Text style={attendance.labelFilters}>Date</Text>
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

            <Text style={attendance.labelFilters}>Status</Text>
            <View style={attendance.statusButtonsContainer}>
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

            <View style={attendance.buttonContainer}>
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
          </View>
        </View>
      </Modal>
    </View>
  );
}

{/* <FlatList
  data={filteredHistory}
  keyExtractor={(item) => item.id.toString()}
  renderItem={renderItem}
  showsVerticalScrollIndicator={false}
  ListFooterComponent={
    <Pagination
      page={page}
      totalPages={totalPages}
      onPrevious={() => loadHistory(page - 1)}
      onNext={() => loadHistory(page + 1)}
    />
  }
/> */}