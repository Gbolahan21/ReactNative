import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import baseRoutes from "./base";
import PrivateRoute from "../components/PrivateRoute";
import ReduxRoute from "../components/ReduxRoute";
import Layout from "../components/Layout";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator initialRouteName="Home">

      {/* PUBLIC ROUTES */}
      {baseRoutes.public.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          options={{ headerShown: false }}
        >
          {(navigationProps) => (
            <ReduxRoute
              component={route.component}
              {...navigationProps}
            />
          )}
        </Stack.Screen>
      ))}

      {/* PRIVATE ROUTES */}
      {baseRoutes.private.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          options={{ headerShown: false }}
        >
          {(navigationProps) => (
            <PrivateRoute {...navigationProps}>
              <Layout>
                <ReduxRoute
                  component={route.component}
                  {...navigationProps}
                />
              </Layout>
            </PrivateRoute>
          )}
        </Stack.Screen>
      ))}

    </Stack.Navigator>
  );
}

export default Routes;