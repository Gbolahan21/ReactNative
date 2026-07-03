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
    marginLeft: 10,
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
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  disabledPageButton: {
    backgroundColor: "#D9D9D9",
  },

  pageText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.black,
  },
});