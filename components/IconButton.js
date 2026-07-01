import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function IconButton({
  name,
  size = 24,
  color = COLORS.secondaryText,
  onPress,
}) {
  return (
    <Pressable onPress={onPress}>
      <Ionicons
        name={name}
        size={size}
        color={color}
      />
    </Pressable>
  );
}