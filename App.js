import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Provider, useDispatch } from "react-redux";

import store from "./store";
import Routes from "./routes";
import linking from "./routes/linking";

import { load } from "./store/actions";
import { AUTH_INITIALIZED } from "./store/types";
import * as Helpers from './helpers';

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedToken = await Helpers.token.get();

        if (!storedToken) {
          dispatch({
            type: AUTH_INITIALIZED,
          });

          return;
        }

        dispatch(
          load(
            (error) => {
              dispatch({
                type: AUTH_INITIALIZED,
              });
            },
            (response) => {
              dispatch({
                type: AUTH_INITIALIZED,
              });
            }
          )
        );
      } catch (error) {
        dispatch({
          type: AUTH_INITIALIZED,
        });
      }
    };

    restoreSession();
  }, [dispatch]);

  return (
    <NavigationContainer linking={linking}>
      <Routes />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
      <Toast />
    </Provider>
  );
}