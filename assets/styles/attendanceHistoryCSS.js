import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  desktopContainer: {
    paddingVertical: 20,
    paddingHorizontal: '30%',
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  date: {
    marginBottom: 8,
    color: COLORS.secondaryText,
  },

  emptyText: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
    color: COLORS.secondaryText,
    marginBottom: 20,
  },

  search: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    width: "90%",
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.modalBackground,
  },

  cardFilter: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: 20,
    width: "90%",
  },

  desktopCardFilter: {
    width: "30%",
  },

  labelFilter: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  labelFilters: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },

  statusButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginVertical: 20,
  },

  summaryCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  summaryLabel: {
    color: "#777",
    fontSize: 14,
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#C70E0E",
    paddingVertical: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  headerCell: {
    flex: 1,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },

  tableRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    alignItems: "center",
  },

  statusCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
  },

  dateCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
  },

  timeCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 13,
  },
});