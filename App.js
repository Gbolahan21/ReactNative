import { NavigationContainer } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

import store from "./store";
import Routes from "./routes";
import linking from "./routes/linking";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Routes />
      </NavigationContainer>

      <Toast />
    </Provider>
  );
}