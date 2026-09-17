// import { useEffect, useState, useCallback } from "react";
// // import AsyncStorage from "@react-native-async-storage/async-storage";
// // import * as LocalAuthentication from "expo-local-authentication";
// import Toast from "react-native-toast-message";
// import { useSelector } from "react-redux";
// import Button from "../../components/Button";
// import Dropdown from "../../components/Dropdown";
// import { COLORS } from "../../constants/colors";
// import dashboard from "../../assets/styles/dashboardCSS";
// import useResponsive from "../../hooks/useResponsive";
// import {
//   View,
//   Text,
//   Pressable,
//   Image,
//   Modal,
//   ScrollView,
//   TextInput
// } from "react-native";

// import moh from '../../assets/images/moh.png';

// export default function Dashboard({ 
//   navigation, 
//   logout, 
//   checkin, 
//   todayAttendance, 
//   attendance, 
//   checkout, 
//   updateStudent, 
//   loadLookups, 
//   getCourses, 
//   registerCourse, 
// }) {
//   const { isDesktop } = useResponsive();

//   const attendanceStatus = attendance?.today?.status;
//   const student = useSelector((state) => state.student);
//   const { faculties, departments, levels, semesters, semester, courses } = student;
//   const hasCheckedIn = !!attendance?.today?.check_in;
//   const hasCheckedOut = !!attendance?.today?.check_out;
//   const [logoutVisible, setLogoutVisible] = useState(false);

//   const [courseVisible, setCourseVisible] = useState(false);
//   const [selectedCourses, setSelectedCourses] = useState([]);
//   const [submittingCourses, setSubmittingCourses] = useState(false);

//   const [editVisible, setEditVisible] = useState(false);
//   const [editFirstname, setEditFirstname] = useState("");
//   const [editLastname, setEditLastname] = useState("");
//   const [editGender, setEditGender] = useState("");
//   const [editFaculty, setEditFaculty] = useState("");
//   const [editDepartment, setEditDepartment] = useState("");
//   const [editLevel, setEditLevel] = useState("");

//   useEffect(() => {
//     loadLookups(
//       (error) => {
//         // console.log("LOOKUPS ERROR:", error);
//       },
//       (response) => {
//         // console.log("LOOKUPS LOADED:", response);
//       }
//     );
//   }, []);

//   const handleLogout = useCallback(() => {
//     logout();

//     Toast.show({
//       type: "success",
//       text1: "Logout Successful",
//       text2: "You have been logged out.",
//     });

//     navigation.replace("SignIn");
//   }, [logout, navigation]);

//   const handleOpenEdit = useCallback(() => {
//     setEditFirstname(student?.firstname || "");
//     setEditLastname(student?.lastname || "");
//     setEditGender(student?.gender || "");
//     setEditFaculty(student?.faculty || "");
//     setEditDepartment(student?.department || "");
//     setEditLevel(student?.level || "");

//     setEditVisible(true);
//   }, [student]);

//   const getGreeting = useCallback(() => {
//     const hour = new Date().getHours();

//     if (hour < 12) return "Good Morning";
//     if (hour < 16) return "Good Afternoon";

//     return "Good Evening";
//   }, []);

//   useEffect(() => {
//     if (student?.id) {
//       todayAttendance(
//         student.id,

//         (error) => {
//           Toast.show({
//             type: "error",
//             text1: "TODAY ATTENDANCE ERROR:",
//             text2: "Unable to load today's attendance.",
//           });
//         },

//         (response) => {
//           // Today's attendance loaded successfully.
//         }
//       );
//     }
//   }, [student?.id, todayAttendance]);
  
//   const scanFingerprint = useCallback(async () => {
//     try {
//       // const compatible = await LocalAuthentication.hasHardwareAsync();

//       // if (!compatible) {
//       //   Toast.show({
//       //     type: "error",
//       //     text1: "Fingerprint Failed",
//       //     text2: "This device does not support fingerprint authentication.",
//       //   });
//       //   return;
//       // }

//       // const enrolled = await LocalAuthentication.isEnrolledAsync();

//       // if (!enrolled) {
//       //   Toast.show({
//       //     type: "error",
//       //     text1: "Fingerprint Failed",
//       //     text2: "No fingerprint is enrolled.",
//       //   });
//       //   return;
//       // }

//       // const result = await LocalAuthentication.authenticateAsync({
//       //   promptMessage: "Scan your fingerprint to record attendance",
//       //   disableDeviceFallback: false,
//       //   cancelLabel: "Cancel",
//       // });

//       // if (!result.success) {
//       //   Toast.show({
//       //     type: "error",
//       //     text1: "Fingerprint Failed",
//       //     text2: "Fingerprint verification failed.",
//       //   });
//       //   return;
//       // }

//       checkin(
//         student.id,

//         (error) => {
//           Toast.show({
//             type: "error",
//             text1: "Attendance Failed",
//             text2: error.message || "Unable to record attendance.",
//           });
//         },

//         async (response) => {
//           Toast.show({
//             type: "success",
//             text1: "Attendance Recorded",
//             text2: response.message,
//           });

//           // Reload today's attendance
//           todayAttendance(student.id);
//         }
//       );
//     } catch (err) {
//       Toast.show({
//         type: "error",
//         text1: "Attendance Failed",
//         text2: "Attendance has already been recorded today.",
//       });
//     }
//   }, [checkin, todayAttendance, student?.id]);

//   const scanCheckout = useCallback(() => {
//     if (!student?.id) return;

//     checkout(
//       student.id,

//       (error) => {
//         Toast.show({
//           type: "error",
//           text1: "Checkout Failed",
//           text2: error.message || "Unable to record checkout.",
//         });
//       },

//       (response) => {
//         Toast.show({
//           type: "success",
//           text1: "Checkout Recorded",
//           text2: response.message,
//         });

//         todayAttendance(student.id);
//       }
//     );
//   }, [checkout, todayAttendance, student?.id]);

//   const facultyOptions =
//     faculties?.map((faculty) => ({
//       label: faculty.name,
//       value: faculty.name,
//     })) || [];

//   const departmentOptions =
//     departments?.map((department) => ({
//       label: department.name,
//       value: department.name,
//     })) || [];

//   const levelOptions =
//     levels?.map((level) => ({
//       label: level.name,
//       value: level.name,
//     })) || [];

//   useEffect(() => {
//     if (courseVisible) {
//       const alreadyRegistered = courses.filter(
//         (course) => course.registered
//       );

//       setSelectedCourses(alreadyRegistered);
//     }
//   }, [courseVisible, courses]);

//   const handleUpdateStudent = () => {
//     if (
//       !editFirstname.trim() ||
//       !editLastname.trim() ||
//       !editGender ||
//       !editFaculty ||
//       !editDepartment ||
//       !editLevel
//     ) {
//       Toast.show({
//         type: "error",
//         text1: "Incomplete Information",
//         text2: "Please complete all required fields.",
//       });

//       return;
//     }

//     updateStudent(
//       editFirstname.trim(),
//       editLastname.trim(),
//       editGender,
//       editDepartment,
//       editFaculty,
//       editLevel,

//       (error) => {
//         Toast.show({
//           type: "error",
//           text1: "Update Failed",
//           text2:
//             error.message ||
//             "Unable to update your information.",
//         });
//       },

//       (response) => {
//         Toast.show({
//           type: "success",
//           text1: "Profile Updated",
//           text2:
//             response.message ||
//             "Your information has been updated successfully.",
//         });

//         setEditVisible(false);
//       }
//     );
//   };

//   const handleCourseRegistration = () => {
//     getCourses(
//       (error) => {
//         Toast.show({
//           type: "error",
//           text1: "Course Loading Failed",
//           text2: error.message || "Unable to load courses.",
//         });
//       },

//       () => {
//         setCourseVisible(true);
//       }
//     );
//   };

//   const formatLevel = (level) => {
//     if (!level) return "N/A";

//     return level
//       .trim()
//       .replace(/\blevel\b/i, "Level");
//   };

//   const handleCourseAction = (course) => {
//     if (course.registered || selectedCourses.some(
//       (selected) => selected.id === course.id
//     )) {
//       // DROP from temporary selection
//       setSelectedCourses((prev) =>
//         prev.filter((selected) => selected.id !== course.id)
//       );

//       return;
//     }

//     // ADD to temporary selection
//     setSelectedCourses((prev) => [
//       ...prev,
//       course,
//     ]);
//   };

//   const isCourseSelected = (courseId) => {
//     return selectedCourses.some(
//       (course) => course.id === courseId
//     );
//   };

//   const handleRegisterAll = () => {
//     setSelectedCourses(courses);
//   };

//   const unselectedCourses = courses.filter(
//     (course) =>
//       !course.registered &&
//       !selectedCourses.some(
//         (selected) => selected.id === course.id
//       )
//   );

//   const handleSubmitCourses = () => {
//     if (selectedCourses.length === 0) {
//       Toast.show({
//         type: "error",
//         text1: "No Courses Selected",
//         text2: "Please select at least one course.",
//       });

//       return;
//     }

//     setSubmittingCourses(true);

//     const newCourses = selectedCourses.filter(
//       (selected) =>
//         !courses.some(
//           (course) =>
//             course.id === selected.id &&
//             course.registered
//         )
//     );

//     if (newCourses.length === 0) {
//       setSubmittingCourses(false);

//       Toast.show({
//         type: "info",
//         text1: "No Changes",
//         text2: "There are no new courses to register.",
//       });

//       return;
//     }

//     let completed = 0;
//     let failed = false;

//     newCourses.forEach((course) => {
//       registerCourse(
//         course.id,

//         (error) => {
//           if (failed) return;

//           failed = true;
//           setSubmittingCourses(false);

//           Toast.show({
//             type: "error",
//             text1: "Registration Failed",
//             text2:
//               error.message ||
//               "Unable to register courses.",
//           });
//         },

//         () => {
//           completed++;

//           if (completed === newCourses.length) {
//             setSubmittingCourses(false);

//             Toast.show({
//               type: "success",
//               text1: "Registration Successful",
//               text2: "Your courses have been registered.",
//             });

//             // Reload courses from database
//             getCourses(
//               () => {},
//               () => {
//                 setCourseVisible(false);
//               }
//             );
//           }
//         }
//       );
//     });
//   };

//   return (
//     <View style={[dashboard.container, isDesktop && dashboard.desktopContainer]}>
//       <View style={dashboard.navbar}>
//         <Text style={dashboard.logo}><Image source={moh} style={dashboard.logo} /></Text>

//         <Pressable onPress={() => setLogoutVisible(true)}> 
//           <Text style={dashboard.link}>Logout</Text>
//         </Pressable>
//       </View>
//       <ScrollView
//         style={{ flex: 1 }}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={dashboard.content}>
//           <Text style={dashboard.greeting}>
//             {getGreeting()} 👋
//           </Text>

//           <Text style={dashboard.welcome}>
//             Welcome back, {student?.firstname}
//           </Text>
//         </View>

//         <Button
//           title="Course Registration"
//           iconName="book"
//           iconSize={24}
//           onPress={handleCourseRegistration}
//           textStyle={{marginLeft: 10}}
//         />

//         <View style={dashboard.statusCard}>
//           <Text style={dashboard.statusTitle}>Today's Status</Text>

//           <Text
//             style={[
//               dashboard.statusText,
//               {
//                 color:
//                   attendanceStatus === "Present"
//                     ? COLORS.success
//                     : COLORS.danger,
//               },
//             ]}
//           >
//             {attendanceStatus === "Present"
//               ? "🟢 Present"
//               : "🔴 Attendance Not Recorded"}
//           </Text>
//           {attendance?.today?.check_in && (
//             <>
//               <Text style={dashboard.label}>Checked in</Text>
//               <Text style={dashboard.value}>
//                 {attendance.today.check_in}
//               </Text>
//             </>
//           )}

//           {attendance?.today?.check_out && (
//             <>
//               <Text style={dashboard.label}>Checked out</Text>
//               <Text style={dashboard.value}>
//                 {attendance.today.check_out}
//               </Text>
//             </>
//           )}
//         </View>

//         {!hasCheckedIn && (
//           <Button
//             title="Scan Fingerprint"
//             iconName="finger-print"
//             iconSize={24}
//             onPress={scanFingerprint}
//             textStyle={{marginLeft: 10}}
//           />
//         )}

//         {hasCheckedIn && !hasCheckedOut && (
//           <Button
//             title="Check Out"
//             iconName="finger-print"
//             iconSize={24}
//             onPress={scanCheckout}
//             textStyle={{marginLeft: 10}}
//           />
//         )}

//         {hasCheckedOut && (
//           <Text style={dashboard.value}>
//             Attendance completed for today
//           </Text>
//         )}

//         <View style={dashboard.card}>
//           <View style={dashboard.cardHeader}>
//             <Text style={dashboard.cardTitle}>
//               Student Information
//             </Text>

//             <Button
//               title="Edit Profile"
//               onPress={handleOpenEdit}
//               style={dashboard.editButton}
//               textStyle={dashboard.editButtonText}
//             />
//           </View>

//           <View style={dashboard.grid}>
//             <View style={dashboard.gridItem}>
//               <Text style={dashboard.label}>Name</Text>
//               <Text style={dashboard.value}>
//                 {student?.firstname} {student?.lastname}
//               </Text>
//             </View>

//             <View style={dashboard.gridItem}>
//               <Text style={dashboard.label}>Matric Number</Text>
//               <Text style={dashboard.value}>
//                 {student?.matricNo}
//               </Text>
//             </View>

//             <View style={dashboard.gridItem}>
//               <Text style={dashboard.label}>Email</Text>
//               <Text style={dashboard.value}>
//                 {student?.email}
//               </Text>
//             </View>

//             <View style={dashboard.gridItem}>
//               <Text style={dashboard.label}>Gender</Text>
//               <Text style={dashboard.value}>
//                 {student?.gender || "Not provided"}
//               </Text>
//             </View>

//             <View style={dashboard.gridItem}>
//               <Text style={dashboard.label}>Department</Text>
//               <Text style={dashboard.value}>
//                 {student?.department}
//               </Text>
//             </View>

//             <View style={dashboard.gridItem}>
//               <Text style={dashboard.label}>Faculty</Text>
//               <Text style={dashboard.value}>
//                 {student?.faculty}
//               </Text>
//             </View>

//             <View style={dashboard.gridItem}>
//               <Text style={dashboard.label}>Level</Text>
//               <Text style={dashboard.value}>
//                 {formatLevel(student?.level)}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <Button title="Attendance History" iconRightName="arrow-forward" iconRightSize={18} onPress={() => navigation.navigate("AttendanceHistory")} textStyle={{marginRight: 10}} />

//         <Modal
//           visible={logoutVisible}
//           animationType="slide"
//           transparent
//           onRequestClose={() => setLogoutVisible(false)}
//         >
//           <Pressable
//             style={dashboard.modalContainer}
//             onPress={() => setLogoutVisible(false)}
//           >
//             <Pressable
//               style={[
//                 dashboard.cardFilter,
//                 isDesktop && dashboard.desktopCardFilter
//               ]}
//               onPress={(e) => e.stopPropagation()}
//             >
//               <Text style={dashboard.labelFilter}>
//                 Log Out?
//               </Text>

//               <Text style={dashboard.labelFilters}>
//                 Are you sure you want to log out?
//               </Text>

//               <View style={dashboard.buttonContainer}>
//                 <Button
//                   title="Stay Logged In"
//                   onPress={() => setLogoutVisible(false)}
//                   style={{
//                     width: "48%",
//                     backgroundColor: COLORS.primaryDark,
//                   }}
//                 />

//                 <Button
//                   title="Log Out"
//                   onPress={handleLogout}
//                   style={{ width: "48%" }}
//                 />
//               </View>
//             </Pressable>
//           </Pressable>
//         </Modal>

//         <Modal
//           visible={courseVisible}
//           animationType="slide"
//           transparent
//           onRequestClose={() => setCourseVisible(false)}
//         >
//           <Pressable
//             style={dashboard.modalContainer}
//             onPress={() => setCourseVisible(false)}
//           >
//             <Pressable
//               style={[
//                 dashboard.cardFilter,
//                 isDesktop && dashboard.desktopCourseFilter,
//               ]}
//               onPress={(e) => e.stopPropagation()}
//             >

//               <Text style={dashboard.labelFilter}>
//                 Course Registration
//               </Text>

//               <View style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                 <View>
//                   <Text style={dashboard.label}>
//                     Semester
//                   </Text>

//                   <Text style={dashboard.value}>
//                     {semester || "No active semester"}
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={dashboard.label}>
//                     Faculty
//                   </Text>

//                   <Text style={dashboard.value}>
//                     {student?.faculty || "N/A"}
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={dashboard.label}>
//                     Department
//                   </Text>

//                   <Text style={dashboard.value}>
//                     {student?.department || "N/A"}
//                   </Text>
//                 </View>

//                 <View>
//                   <Text style={dashboard.label}>
//                     Level
//                   </Text>

//                   <Text style={dashboard.value}>
//                     {formatLevel(student?.level)}
//                   </Text>
//                 </View>
//               </View>

//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   marginBottom: 10,
//                 }}
//               >
//                 <Text style={dashboard.label}>
//                   Available Courses
//                 </Text>

//                 {unselectedCourses.length > 0 && (
//                   <Button
//                     title="Register All"
//                     onPress={handleRegisterAll}
//                     style={{
//                       width: 130,
//                     }}
//                   />
//                 )}
//               </View>

//               {courses.length === 0 ? (
//                 <Text style={dashboard.labelFilters}>
//                   No courses have been assigned to you for this semester.
//                 </Text>
//               ) : (
//                 courses.map((course) => (
//                   <View
//                     key={course.id}
//                     style={dashboard.courseItem}
//                   >
//                     <View style={{ flex: 1 }}>
//                       <Text style={dashboard.courseCode}>
//                         {course.course_code}
//                       </Text>

//                       <Text style={dashboard.courseTitle}>
//                         {course.course_title}
//                       </Text>
//                     </View>

//                     <Button
//                       title={
//                         course.registered || isCourseSelected(course.id)
//                           ? "DROP"
//                           : "ADD"
//                       }
//                       onPress={() => handleCourseAction(course)}
//                       style={{
//                         width: 80,
//                         backgroundColor:
//                           course.registered || isCourseSelected(course.id)
//                             ? COLORS.danger
//                             : COLORS.primary,
//                       }}
//                     />
//                   </View>
//                 ))
//               )}

//               {selectedCourses.length > 0 && (
//                 <View style={{ marginTop: 20 }}>

//                   <Text style={dashboard.label}>
//                     Selected Courses
//                   </Text>

//                   {selectedCourses.map((course) => (
//                     <View
//                       key={course.id}
//                       style={dashboard.courseItem}
//                     >
//                       <View style={{ flex: 1 }}>
//                         <Text style={dashboard.courseCode}>
//                           {course.course_code}
//                         </Text>

//                         <Text style={dashboard.courseTitle}>
//                           {course.course_title}
//                         </Text>
//                       </View>

//                       <Text
//                         style={{
//                           color: COLORS.success,
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Selected
//                       </Text>
//                     </View>
//                   ))}
//                 </View>
//               )}

//               <View style={dashboard.buttonContainer}>
//                 <Button
//                   title={
//                   selectedCourses.length > 0
//                     ? submittingCourses
//                       ? "Submitting..."
//                       : "Submit"
//                     : "Close"
//                   }
//                   onPress={
//                     selectedCourses.length > 0
//                       ? handleSubmitCourses
//                       : () => setCourseVisible(false)
//                   }
//                   disabled={submittingCourses}
//                   style={{
//                     width: "100%",
//                     backgroundColor:
//                       selectedCourses.length > 0
//                         ? COLORS.primary
//                         : COLORS.primaryDark,
//                   }}
//                 />
//               </View>

//             </Pressable>
//           </Pressable>
//         </Modal>

//         <Modal
//           visible={editVisible}
//           animationType="slide"
//           transparent
//           onRequestClose={() => setEditVisible(false)}
//         >
//           <Pressable
//             style={dashboard.modalContainer}
//             onPress={() => setEditVisible(false)}
//           >
//             <Pressable
//               style={[
//                 dashboard.cardFilter,
//                 isDesktop && dashboard.desktopEditFilter,
//               ]}
//               onPress={(e) => e.stopPropagation()}
//             >
//               <Text style={dashboard.labelFilter}>
//                 Edit Student Information
//               </Text>

//               <View style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
//                 <View>
//                   <Text style={dashboard.editTextInfo}>First Name</Text>
//                   <TextInput
//                     style={dashboard.input}
//                     placeholder="First Name"
//                     value={editFirstname}
//                     onChangeText={setEditFirstname}
//                   />
//                 </View>

//                 <View>
//                   <Text style={dashboard.editTextInfo}>Last Name</Text>
//                   <TextInput
//                     style={dashboard.input}
//                     placeholder="Last Name"
//                     value={editLastname}
//                     onChangeText={setEditLastname}
//                   />
//                 </View>

//                 <Dropdown
//                   label="Gender"
//                   value={editGender}
//                   placeholder="Select Gender"
//                   onSelect={setEditGender}
//                   options={[
//                     {
//                       label: "Male",
//                       value: "Male",
//                     },
//                     {
//                       label: "Female",
//                       value: "Female",
//                     },
//                   ]}
//                 />

//                 <Dropdown
//                   label="Faculty"
//                   value={editFaculty}
//                   placeholder="Select Faculty"
//                   onSelect={setEditFaculty}
//                   options={facultyOptions}
//                 />

//                 <Dropdown
//                   label="Department"
//                   value={editDepartment}
//                   placeholder="Select Department"
//                   onSelect={setEditDepartment}
//                   options={departmentOptions}
//                 />

//                 <Dropdown
//                   label="Level"
//                   value={editLevel}
//                   placeholder="Select Level"
//                   onSelect={setEditLevel}
//                   options={levelOptions}
//                 />
//               </View>

//               <View style={dashboard.buttonContainer}>
//                 <Button
//                   title="Cancel"
//                   onPress={() => setEditVisible(false)}
//                   style={{
//                     width: "48%",
//                     backgroundColor: COLORS.primaryDark,
//                   }}
//                 />

//                 <Button
//                   title="Save"
//                   onPress={handleUpdateStudent}
//                   style={{
//                     width: "48%",
//                   }}
//                 />
//               </View>
//             </Pressable>
//           </Pressable>
//         </Modal>
//       </ScrollView>
//     </View>
//   );
// }

import React, {
  useCallback,
  useEffect,
  useState
} from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from "react-native";

import { useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";

import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import { COLORS } from "../../constants/colors";

export default function Dashboard({
  onNavigate,
  checkin,
  todayAttendance,
  checkout,
  attendance,
}) {
  const student = useSelector(
    (state) => state.student
  );
  const {
    courses = [],
  } = student;
  const [selectedCourse, setSelectedCourse] = useState(null);
  const currentAttendance = attendance?.today?.find(
    (item) => item.course_id === selectedCourse
  );

  const attendanceStatus = currentAttendance?.status;
  const hasCheckedIn = !!currentAttendance?.check_in;
  const hasCheckedOut = !!currentAttendance?.check_out;

  const registeredCourses = courses.filter(
    (course) => course.registered
  );

  const registeredCourseOptions = registeredCourses.map(
    (course) => ({
      label: `${course.course_code} - ${course.course_title}`,
      value: course.id,
    })
  );

  const handleCourseSelect = (courseId) => {
    setSelectedCourse(courseId);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 16) {
      return "Good Afternoon";
    }

    return "Good Evening";
  };

  useEffect(() => {
    if (!student?.id) {
      return;
    }

    todayAttendance(
      student.id,

      (error) => {
        Toast.show({
          type: "error",
          text1: "Attendance Error",
          text2:
            error?.message ||
            "Unable to load today's attendance.",
        });
      },

      () => {
        // Attendance loaded
      }
    );
  }, [
    student?.id,
    todayAttendance,
  ]);

  /*
   * Check in
   */
  const handleCheckIn = useCallback(() => {
    if (!student?.id) {
      return;
    }

    checkin(
      student.id,

      (error) => {
        Toast.show({
          type: "error",
          text1: "Attendance Failed",
          text2:
            error?.message ||
            "Unable to record attendance.",
        });
      },

      (response) => {
        Toast.show({
          type: "success",
          text1: "Attendance Recorded",
          text2:
            response?.message ||
            "You have been checked in.",
        });

        todayAttendance(student.id);
      }
    );
  }, [
    checkin,
    todayAttendance,
    student?.id,
  ]);

  /*
   * Check out
   */
  const handleCheckOut = useCallback(() => {
    if (!student?.id) {
      return;
    }

    checkout(
      student.id,

      (error) => {
        Toast.show({
          type: "error",
          text1: "Checkout Failed",
          text2:
            error?.message ||
            "Unable to record checkout.",
        });
      },

      (response) => {
        Toast.show({
          type: "success",
          text1: "Checkout Recorded",
          text2:
            response?.message ||
            "You have been checked out.",
        });

        todayAttendance(student.id);
      }
    );
  }, [
    checkout,
    todayAttendance,
    student?.id,
  ]);

  /*
   * Format level
   */
  const formatLevel = (level) => {
    if (!level) {
      return "N/A";
    }

    return level
      .trim()
      .replace(/\blevel\b/i, "Level");
  };

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
            <Text style={styles.greeting}>
              {getGreeting()} 👋
            </Text>

            <Text style={styles.name}>
              {student?.firstname || "Student"}
            </Text>
          </View>

          <Pressable
            style={styles.profileButton}
            onPress={() => onNavigate("Profile")}
          >
            <Ionicons
              name="person"
              size={22}
              color={COLORS.primary}
            />
          </Pressable>
        </View>

        {/* Today's Attendance */}
        <View style={styles.attendanceCard}>

          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardLabel}>
                Today's Attendance
              </Text>

              <Text style={styles.date}>
                {new Date().toDateString()}
              </Text>
            </View>

            <View
              style={[
                styles.statusBadge,
                attendanceStatus === "Present"
                  ? styles.presentBadge
                  : styles.absentBadge,
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  attendanceStatus === "Present"
                    ? styles.presentText
                    : styles.absentText,
                ]}
              >
                {attendanceStatus === "Present"
                  ? "Present"
                  : "Not Recorded"}
              </Text>
            </View>
          </View>

          <Dropdown
            label="Attendance Course"
            placeholder="Select a course"
            value={
              registeredCourses.find(
                (course) => course.id === selectedCourse
              )?.course_code
            }
            options={registeredCourseOptions}
            onSelect={handleCourseSelect}
          />

          <View style={styles.attendanceTimes}>
            <View style={styles.timeItem}>
              <View style={styles.timeIcon}>
                <Ionicons
                  name="log-in-outline"
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              <View>
                <Text style={styles.timeLabel}>
                  Check In
                </Text>

                <Text style={styles.timeValue}>
                  {attendance?.today?.check_in ||
                    "--:--"}
                </Text>
              </View>
            </View>

            <View style={styles.timeItem}>
              <View style={styles.timeIcon}>
                <Ionicons
                  name="log-out-outline"
                  size={20}
                  color={COLORS.primary}
                />
              </View>

              <View>
                <Text style={styles.timeLabel}>
                  Check Out
                </Text>

                <Text style={styles.timeValue}>
                  {attendance?.today?.check_out ||
                    "--:--"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Attendance Action */}
        <View style={styles.actionSection}>

          {!hasCheckedIn && (
            <Button
              title="Check In"
              iconName="finger-print"
              iconSize={22}
              onPress={handleCheckIn}
              style={styles.primaryButton}
              textStyle={styles.buttonText}
            />
          )}

          {hasCheckedIn && !hasCheckedOut && (
            <Button
              title="Check Out"
              iconName="log-out-outline"
              iconSize={22}
              onPress={handleCheckOut}
              style={styles.primaryButton}
              textStyle={styles.buttonText}
            />
          )}

          {hasCheckedOut && (
            <View style={styles.completedBox}>
              <Ionicons
                name="checkmark-circle"
                size={22}
                color={COLORS.success}
              />

              <Text style={styles.completedText}>
                Attendance completed for today
              </Text>
            </View>
          )}

        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>

        <View style={styles.quickActions}>

          <Pressable
            style={styles.quickCard}
            onPress={() => onNavigate("Course")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="book-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.quickTitle}>
              My Courses
            </Text>

            <Text style={styles.quickDescription}>
              View and register courses
            </Text>
          </Pressable>

          <Pressable
            style={styles.quickCard}
            onPress={() => onNavigate("Attendance")}
          >
            <View style={styles.quickIcon}>
              <Ionicons
                name="calendar-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <Text style={styles.quickTitle}>
              Attendance
            </Text>

            <Text style={styles.quickDescription}>
              View attendance records
            </Text>
          </Pressable>

        </View>

        {/* Student Information */}
        <View style={styles.infoCard}>

          <View style={styles.infoHeader}>
            <Text style={styles.sectionTitle}>
              Student Information
            </Text>

            <Pressable
              onPress={() =>
                navigation?.navigate("Profile")
              }
            >
              <Text style={styles.viewText}>
                View
              </Text>
            </Pressable>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Matric Number
            </Text>

            <Text style={styles.infoValue}>
              {student?.matricNo || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Department
            </Text>

            <Text style={styles.infoValue}>
              {student?.department || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Faculty
            </Text>

            <Text style={styles.infoValue}>
              {student?.faculty || "N/A"}
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>
              Level
            </Text>

            <Text style={styles.infoValue}>
              {formatLevel(student?.level)}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  greeting: {
    fontSize: 14,
    color: "#64748B",
    marginBottom: 4,
  },

  name: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  attendanceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  cardLabel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  date: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
    marginBottom: 10
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  presentBadge: {
    backgroundColor: "#DCFCE7",
  },

  absentBadge: {
    backgroundColor: "#FEE2E2",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },

  presentText: {
    color: COLORS.success,
  },

  absentText: {
    color: COLORS.danger,
  },

  attendanceTimes: {
    flexDirection: "row",
    marginTop: 24,
    gap: 30,
  },

  timeItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  timeIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  timeLabel: {
    fontSize: 11,
    color: "#94A3B8",
    marginBottom: 2,
  },

  timeValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#0F172A",
  },

  actionSection: {
    marginBottom: 24,
  },

  primaryButton: {
    width: "100%",
  },

  buttonText: {
    marginLeft: 8,
  },

  completedBox: {
    backgroundColor: "#DCFCE7",
    borderRadius: 14,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  completedText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0F172A",
  },

  quickActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    marginBottom: 24,
  },

  quickCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },

  quickIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  quickTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 5,
  },

  quickDescription: {
    fontSize: 11,
    lineHeight: 16,
    color: "#64748B",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,

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
    justifyContent: "space-between",
    marginBottom: 16,
  },

  viewText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "600",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748B",
  },

  infoValue: {
    flex: 1,
    textAlign: "right",
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
  },

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },
});