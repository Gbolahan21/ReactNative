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
    paddingVertical: 20,
    marginTop: 20,
    elevation: 4,
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
    paddingVertical: 18,
    marginTop: 20,
    elevation: 4,
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

  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 25,
  },

  summaryCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginBottom: 15,
    elevation: 3,
  },

  summaryTitle: {
    fontSize: 15,
    color: "#666",
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },

  quickActionsContainer: {
    marginTop: 25,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    color: "#333",
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: "90%",
  },

  desktopCardFilter: {
    width: "30%",
  },

  labelFilter: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
  },

  labelFilters: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 5,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
})