import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

// Home
  desktopContainer: {
    paddingVertical: 30,
    paddingHorizontal: '20%',
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  navLinks: {
    flexDirection: "row",
    alignItems: "center",
  },

  link: {
    marginLeft: 20,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: COLORS.text,
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

//   SignIn
  desktopLoginContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "100%",
    maxWidth: 450,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 30,

    // Android
    elevation: 8,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  button: {
    backgroundColor: COLORS.danger,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },

  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 20,
  },

  footerText: {
    fontSize: 16,
    color: COLORS.text,
    marginTop: 10,
  },

  loginLink: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    height: 55,
    paddingHorizontal: 15,
    marginBottom: 20,
  },

  inputs: {
    flex: 1,
    fontSize: 16,
    outlineStyle: "none",
  },

  rememberContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  rememberButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  rememberText: {
    marginLeft: 8,
    fontSize: 16,
  },

  forgotText: {
    fontSize: 16,
    color: COLORS.danger
  },

//   SignUp
  desktopRegisterContainer: {
    alignItems: "center",
    justifyContent: "center"
  },

  registerCard: {
    width: "100%",
    maxWidth: 750,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 30,

    // Android
    elevation: 8,

    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },

  desktopGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  desktopGridItem: {
    width: "50%",
    paddingRight: 8,
  },

//   Attendance
listContent: {
    padding: 16,
    paddingBottom: 40,
  },

  loadingText: {
    marginTop: 10,
    fontSize: 13,
    color: "#64748B",
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

  clearButton: {
    flex: 1,
    width: '48%',
    marginTop: 10
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
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

  attendanceTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#172033",
  },

  attendanceSubtitle: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 5,
  },

//   Course
  tableCourseCode: {
    fontWeight: "700",
    color: COLORS.primary,
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

  availableSection: {
    marginTop: 8,
    marginBottom: 24,
  },

  actionButton: {
    minWidth: 78,
    height: 38,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

// Dashboard
  checkinModal: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
  },

  modalIcon: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
  },

  modalDescription: {
    fontSize: 13,
    lineHeight: 19,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 22,
  },

  modalLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 8,
  },

  codeInput: {
    height: 58,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    textAlign: "center",
    fontSize: 25,
    fontWeight: "700",
    letterSpacing: 8,
    color: "#0F172A",
  },

  codeHint: {
    fontSize: 11,
    lineHeight: 16,
    color: "#94A3B8",
    textAlign: "center",
    marginTop: 9,
  },

  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 22,
  },

  cancelButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },

  cancelButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
  },

  confirmCheckinButton: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  confirmCheckinText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  disabledCheckinButton: {
    opacity: 0.5,
  },

  checkOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    minWidth: 92,
    marginLeft: 8,
  },

  checkOutButtonText: {
    marginLeft: 5,
    fontWeight: "700",
    color: "#FFFFFF",
    fontSize: 12,
  },

  attendanceGroup: {
    marginTop: 20,
    marginBottom: 10,
  },

  attendanceGroupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },

  attendanceCourseCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 14,
    marginBottom: 10,

    // subtle elevation
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },

  checkInTime: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.success,
  },

  groupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  groupTitleRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  groupCount: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.primary,
    backgroundColor: "#EEF2FF",
  },

  /* In Progress */

  inProgressDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },

  inProgressCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },

  courseIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    marginRight: 12,
  },

  checkInRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  checkInText: {
    marginLeft: 5,
    fontSize: 11,
    color: COLORS.success,
    fontWeight: "600",
  },

  /* Completed */

  completedCourseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 10,
  },

  completedIconContainer: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCFCE7",
    marginRight: 12,
  },

  completedTimeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  attendanceTime: {
    fontSize: 11,
    color: COLORS.gray,
  },

  completedBadge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "#DCFCE7",
    marginLeft: 8,
  },

  completedBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.success,
  },

  completedBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginTop: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#BBF7D0",
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    gap: 8,
  },

  completedIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCFCE7",
    marginRight: 12,
  },

  completedContent: {
    flex: 1,
  },

  completedTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.success,
    marginBottom: 3,
  },

  completedCourse: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  completedCourseTitle: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 2,
  },
  disabledButton: {
    opacity: 0.5,
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

  dashboardDate: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
    marginBottom: 10
  },

  attendanceTimes: {
    flexDirection: "row",
    marginTop: 24,
    gap: 30,
  },

  timeIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
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
  
  completedText: {
    color: "#166534",
    fontSize: 14,
    fontWeight: "600",
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

  divider: {
    height: 1,
    backgroundColor: "#F1F5F9",
    marginVertical: 14,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666",
    textAlign: "center",
    marginBottom: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  backText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
    color: "#1F2937",
    fontWeight: "600",
  },

// Password Verification
  email: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 25,
  },

  passCodeInput: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: 8,
    marginBottom: 20,
    paddingHorizontal: 15
  },

// Profile
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

  profileLabel: {
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

  profileModalTitle: {
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

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },

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

//   Reset Password        
  iconContainer: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    backgroundColor: "#EEF2FF", 
    alignItems: "center", 
    justifyContent: "center", 
    alignSelf: "center", 
    marginBottom: 18 
  }, 
    
  emailContainer: { 
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "#F8FAFC", 
    borderWidth: 1, 
    borderColor: COLORS.border, 
    borderRadius: 10, 
    paddingHorizontal: 14, 
    height: 48, 
    marginBottom: 22 
  }, 
    
  resetEmail: { 
    flex: 1, 
    marginLeft: 9, 
    fontSize: 14, 
    color: COLORS.text, 
    fontWeight: "500" 
  }, 
    
  requirements: { 
    backgroundColor: "#F8FAFC", 
    borderRadius: 10, 
    padding: 14, 
    marginBottom: 22, 
    borderWidth: 1, 
    borderColor: "#E2E8F0" 
  }, 

  requirementsTitle: { 
    fontSize: 13, 
    fontWeight: "700", 
    color: COLORS.text, 
    marginBottom: 7 
  }, 

  requirement: { 
    fontSize: 12, 
    color: "#64748B", 
    marginBottom: 3 
  }, 
})