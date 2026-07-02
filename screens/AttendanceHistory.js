import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import IconButton from "../components/IconButton";
import Button from "../components/Button";
import attendance from "../assets/styles/attendanceHistoryCSS";

export default function AttendanceHistoryScreen({ navigation }) {

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      const response = await api.get(
        `/attendance/history/${user.id}`
      );

      setHistory(response.data);
      setFilteredHistory(response.data);
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
    <View style={attendance.card}>
      <Text style={attendance.label}>Status</Text>
      <Text style={attendance.label}>
        {item.status === "Present" ? "🟢 Present" : "🔴 Absent"}
      </Text>

      <Text style={attendance.label}>Date</Text>
      <Text style={attendance.value}>{formatDate(item.attendance_date)}</Text>

      <Text style={attendance.label}>Check In</Text>
      <Text style={attendance.value}>{formatTime(item.check_in)}</Text>

      <Text style={attendance.label}>Check Out</Text>
      <Text style={attendance.value}>{formatTime(item.check_out)}</Text>
    </View>
  );

  return (
    <View style={attendance.container}>
      <IconButton name="arrow-back" size={28} onPress={() => navigation.navigate('Dashboard')} />

      <Text style={attendance.title}>Attendance History</Text>

      <TextInput
        placeholder="Search by status..."
        value={search}
        onChangeText={searchAttendance}
        style={attendance.search}
      />

      <FlatList
        data={filteredHistory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}