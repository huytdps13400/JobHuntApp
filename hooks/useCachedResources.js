import { FontAwesome } from "@expo/vector-icons";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          "space-mono": require("../assets/fonts/SpaceMono-Regular.ttf"),
          "Lato-Black": require("../assets/fonts/Lato-Black.ttf"),
          "Lato-BlackItalic": require("../assets/fonts/Lato-BlackItalic.ttf"),
          "Lato-Bold": require("../assets/fonts/Lato-Bold.ttf"),
          "Lato-BoldItalic": require("../assets/fonts/Lato-BoldItalic.ttf"),
          "Lato-Italic": require("../assets/fonts/Lato-Italic.ttf"),
          "Lato-Light": require("../assets/fonts/Lato-Light.ttf"),
          "Lato-LightItalic": require("../assets/fonts/Lato-LightItalic.ttf"),
          "Lato-Regular": require("../assets/fonts/Lato-Regular.ttf"),
          "Lato-Thin": require("../assets/fonts/Lato-Thin.ttf"),
          "Lato-ThinItalic": require("../assets/fonts/Lato-ThinItalic.ttf"),
          "SoDoSans-Black": require("../assets/fonts/SoDoSans-Black.otf"),
          "SoDoSans-Bold": require("../assets/fonts/SoDoSans-Bold.otf"),
          "SoDoSans-Light": require("../assets/fonts/SoDoSans-Light.otf"),
          "SoDoSans-Regular": require("../assets/fonts/SoDoSans-Regular.otf"),
          "SoDoSans-SemiBold": require("../assets/fonts/SoDoSans-SemiBold.otf"),
        });
        // await dispatch(appInit());
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
