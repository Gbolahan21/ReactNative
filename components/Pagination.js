import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import styles from "../assets/styles/commonCSS";

export default function Pagination({
  page,
  totalPages,
  onPrevious,
  onNext,
}) {
  return (
    <View style={styles.paginationContainer}>
      <Pressable
        style={[
          styles.pageButton,
          page === 1 && styles.disabledPageButton,
        ]}
        disabled={page === 1}
        onPress={onPrevious}
      >
        <Ionicons
          name="chevron-back"
          size={22}
          color={page === 1 ? COLORS.gray : COLORS.white}
        />
      </Pressable>

      <Text style={styles.pageText}>
        Page {page} of {totalPages}
      </Text>

      <Pressable
        style={[
          styles.pageButton,
          page === totalPages && styles.disabledPageButton,
        ]}
        disabled={page === totalPages}
        onPress={onNext}
      >
        <Ionicons
          name="chevron-forward"
          size={22}
          color={page === totalPages ? COLORS.gray : COLORS.white}
        />
      </Pressable>
    </View>
  );
}