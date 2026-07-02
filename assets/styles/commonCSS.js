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
});