import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },

  desktopContainer: {
    paddingVertical: 50,
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

  link: {
    color: COLORS.primary,
    fontWeight: "bold",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    height: 50,
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
})