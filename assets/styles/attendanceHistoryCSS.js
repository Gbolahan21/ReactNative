import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },

  card: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    elevation: 4,
    marginBottom: 20,
  },

  date: {
    marginBottom: 8,
    color: COLORS.secondaryText,
  },

  label: {
    color: COLORS.secondaryText,
    marginTop: 10,
  },

  value: {
    fontSize: 17,
    color: COLORS.text,
    fontWeight: "600",
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
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});