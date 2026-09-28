import {
  Modal,
  Pressable,
} from "react-native";

import useResponsive from "../hooks/useResponsive";
import styles from "../assets/styles/styles";

export default function AppModal({
  visible,
  onClose,
  children,
  animationType = "fade",
  closeOnBackdrop = true,
  contentStyle,
  size = "medium",
  desktopContentStyle,
}) {
  const { isDesktop } = useResponsive();

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose?.();
    }
  };

  const sizeStyles = {
    small: styles.modalSmall,
    medium: styles.modalMedium,
    large: styles.modalLarge,
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <Pressable
        style={styles.overlay}
        onPress={handleBackdropPress}
      >
        <Pressable
          style={[
            styles.modalContent,
            contentStyle,
            sizeStyles[size],
            isDesktop && desktopContentStyle,
          ]}
          onPress={(event) => event.stopPropagation()}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}