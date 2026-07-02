import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  link: {
    marginLeft: 20,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "600",
  },

  card: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    elevation: 4,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },

  greeting: {
    fontSize: 28,
    fontWeight: "bold",
  },

  welcome: {
    fontSize: 18,
    color: COLORS.text,
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

  button: {
    backgroundColor: COLORS.danger,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10,
  },

  scanButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.danger,
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    marginTop: 20,
  },

  scanButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },

  statusCard: {
    backgroundColor: COLORS.background,
    borderRadius: 15,
    padding: 18,
    marginTop: 20,
    elevation: 4,
    marginBottom: 20,
  },

  statusTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  statusText: {
    fontSize: 16,
    fontWeight: "600",
  },
})