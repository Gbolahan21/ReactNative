import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

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
});