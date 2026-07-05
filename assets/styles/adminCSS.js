import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },

  title:{
    fontSize:24,
    fontWeight:"700",
    marginVertical:15,
  },

  search:{
    borderWidth:1,
    borderColor:"#ddd",
    borderRadius:8,
    paddingHorizontal:15,
    height:50,
    marginBottom:20,
  },

  tableHeader:{
    flexDirection:"row",
    backgroundColor:"#c70e0e",
    paddingVertical:14,
    borderTopLeftRadius:8,
    borderTopRightRadius:8,
  },

  headerCell:{
    flex:1,
    color:"#fff",
    fontWeight:"700",
    textAlign:"center",
  },

  tableRow:{
    flexDirection:"row",
    paddingVertical:16,
    borderBottomWidth:1,
    borderBottomColor:"#eee",
    backgroundColor:"#fff",
  },

  cell:{
    flex:1,
    textAlign:"center",
    color:"#333",
  },

  emptyText:{
    textAlign:"center",
    marginTop:40,
    color:"#888",
  },
})