import React from "react";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";

// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';
// import { Provider } from 'react-redux';
import { store } from "./store/store";

import { LogBox } from "react-native";
import Navigation from "./navigation";
import { Provider } from "react-redux";

LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
  "Require cycle",
]);

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </SafeAreaProvider>
  );
}
