import { useWindowDimensions } from "react-native";

export default function useResponsive() {
  const { width, height } = useWindowDimensions();

  return {
    width,
    height,
    isPhone: width < 1024,
    isDesktop: width >= 1024,
  };
}