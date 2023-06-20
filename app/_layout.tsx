import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {BleChargerContext} from "../components/ble/BleChargerContext";
import {BleMainContext} from "../components/ble/BleMainContext";
import {BleManager} from "react-native-ble-plx";
import {scanAndConnect} from "../common/ble";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'tabs',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  return (
    <>
      {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
      {!loaded && <SplashScreen/>}
      {loaded && <RootLayoutNav/>}
    </>
  );
}

const manager = new BleManager({});

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [btMainDevice, setBtMainDevice] = useState();
  const [btChargerDevice, setBtChargerDevice] = useState();

  useEffect(() => {
    console.log("Setting up initial manager subscription");
    manager.onStateChange((state) => {
      const subscription = manager.onStateChange((state) => {
        if (state === 'PoweredOn') {
          scanAndConnect(manager, setBtMainDevice, setBtChargerDevice);
          subscription.remove();
        }
      }, true);
      return () => subscription.remove();
    });
  }, [manager]);


  return (
    <>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <BleMainContext.Provider value={{device: btMainDevice}}>
          <BleChargerContext.Provider value={{device: btChargerDevice}}>
            <Stack>
              <Stack.Screen name="tabs" options={{headerShown: false}}/>
              <Stack.Screen name="bluetooth" options={{presentation: 'modal'}}/>
            </Stack>
          </BleChargerContext.Provider>
        </BleMainContext.Provider>
      </ThemeProvider>
    </>
  );
}
