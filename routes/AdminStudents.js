import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
} from "react-native"
// import api from "../services/api";
import Pagination from "../components/Pagination";
import IconButton from "../components/IconButton";
import styles from "../assets/styles/adminCSS";

export default function AdminStudents({ navigation }) {

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const loadStudents = async (
    pageNumber = 1,
    keyword = ""
  ) => {
    try {
      const response = await api.get(
        `/admin/students?page=${pageNumber}&limit=10&search=${keyword}`
      );

      setStudents(response.data.records);
      setFilteredStudents(response.data.records);

      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const searchStudents = (text) => {
    setSearch(text);
    loadStudents(1, text);
  };

  const renderItem = ({ item }) => (
    <Pressable
      style={styles.tableRow}
      onPress={() =>
        navigation.navigate(
          "StudentDetails",
          {
            student: item,
          }
        )
      }
    >
      <Text style={styles.cell}>
        {item.firstname} {item.lastname}
      </Text>

      <Text style={styles.cell}>
        {item.matricNo}
      </Text>

      <Text style={styles.cell}>
        {item.department}
      </Text>
    </Pressable>
  );
  
  return (
    <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <IconButton
              name="arrow-back"
              size={28}
              onPress={() => navigation.goBack()}
            />

            <Text style={styles.title}>Students</Text>
          </View>

          <TextInput
            placeholder="Search name or matric number..."
            value={search}
            onChangeText={searchStudents}
            style={styles.search}
          />
        </View>

        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Name</Text>

          <Text style={styles.headerCell}>Matric No</Text>

          <Text style={styles.headerCell}>Department</Text>
        </View>

        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              No students found.
            </Text>
          }
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPrevious={() => loadStudents(page - 1, search)}
          onNext={() => loadStudents(page + 1, search)}
        />
    </View>
  );
}