import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  button: {
    backgroundColor: COLORS.danger,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "600",
  },

  disabledButton: {
    opacity: 0.5,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 30,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },

  pageButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledPageButton: {
    backgroundColor: "#D9D9D9",
  },

  pageText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.black,
  },

  dropdownContainer: {
    marginBottom: 20,
  },

  dropdownLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },

  dropdown: {
    height: 55,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
  },

  dropdownText: {
    fontSize: 16,
    color: "#000",
  },

  placeholderText: {
    color: "#999",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  dropdownModal: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    maxHeight: 250,
    overflow: "hidden",
    minWidth: 400,
  },

  dropdownItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  dropdownItemText: {
    fontSize: 16,
  },
});