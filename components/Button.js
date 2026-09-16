import { Pressable, Text, View } from "react-native";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/commonCSS";

export default function Button({
  title,
  onPress,
  disabled = false,
  style,
  textStyle,
  iconName,
  iconSize = 20,
  iconRightName,
  iconRightSize = 20,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        disabled && styles.disabledButton,
        style,
      ]}
    >
      <View style={styles.content}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={iconSize}
            color={COLORS.white}
          />
        )}

        <Text style={[styles.buttonText, textStyle]}>
          {title}
        </Text>

        {iconRightName && (
          <Ionicons
            name={iconRightName}
            size={iconRightSize}
            color={COLORS.white}
            style={{ marginTop: 5 }}
          />
        )}
      </View>
    </Pressable>
  );
}