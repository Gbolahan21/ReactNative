import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

export default function PrivateRoute({
  children,
  navigation,
}) {
  const state = useSelector((state) => state);

  const authenticated = state.student?.authenticated;

  useEffect(() => {
    if (!authenticated) {
      navigation.replace("Home");
    }
  }, [authenticated, navigation]);

  if (!authenticated) {
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