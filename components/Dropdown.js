import { useState } from "react";
import { View, Text, Pressable, Modal, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "../assets/styles/commonCSS";

export default function Dropdown({
  label,
  placeholder = "Select",
  value,
  options,
  onSelect,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.dropdownContainer}>
      {label && (
        <Text style={styles.dropdownLabel}>
          {label}
        </Text>
      )}

      <Pressable
        style={styles.dropdown}
        onPress={() => setVisible(true)}
      >
        <Text
          style={[
            styles.dropdownText,
            !value && styles.placeholderText,
          ]}
        >
          {value || placeholder}
        </Text>

        <Ionicons
          name="chevron-down"
          size={20}
          color="#666"
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownModal}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => {
                    onSelect(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.dropdownItemText}>
                    {item.label}
                  </Text>
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}