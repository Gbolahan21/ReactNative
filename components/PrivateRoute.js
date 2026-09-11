import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

export default function PrivateRoute({
  children,
  navigation,
}) {
  const state = useSelector((state) => state);

  const authenticated = state.student?.authenticated;
  const initialized = state.student?.initialized;

  useEffect(() => {
    if (initialized && !authenticated) {
      navigation.replace("Home");
    }
  }, [initialized, authenticated, navigation]);

  if (!initialized || !authenticated) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
}