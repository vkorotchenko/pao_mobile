import FontAwesome from '@expo/vector-icons/FontAwesome';
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {useFonts} from 'expo-font';
import {SplashScreen, Stack} from 'expo-router';
import {useEffect, useState} from 'react';
import {useColorScheme} from 'react-native';
import {BleChargerContext} from "../components/ble/BleChargerContext";
import {BleMainContext} from "../components/ble/BleMainContext";
import {BleManager, Device} from "react-native-ble-plx";

const characteristic = require("../common/characteristics.json");


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

const scanAndConnect = (manager: BleManager, setBtMainDevice: any, setBtChargerDevice: any) => {
  console.log("Scanning Started");
  let isMainDeviceFound = false;
  let isChargerDeviceFound = false;
  manager.startDeviceScan(null, null, (error, device) => {
    if (error) {
      // Handle error (scanning will be stopped automatically)
      console.log("Error in scanning devices:", error);
      return
    }
    // Check if it is a device you are looking for based on advertisement data
    // or other criteria.
    console.log("Detected Device Details:", device?.id, device?.name);
    // ||device.localName === 'BLEPeripheralApp')
    if (device?.name === 'Pao EVCU') { //
      // Stop scanning as it's not necessary if you are scanning for one device.
      console.log("Connecting to:", device.name)
      device.connect()
        .then((device) => {
          // this.info("Discovering services and characteristics")
          console.log("Connected...Discovering services and characteristics");
          isMainDeviceFound = true;
          setBtMainDevice(device);
          if (isChargerDeviceFound) {
            manager.stopDeviceScan();
          }
        });
    }
    if (device?.name === 'Pao Charger') { //
      // Stop scanning as it's not necessary if you are scanning for one device.
      console.log("Connecting to:", device.name)
      device.connect()
        .then((device) => {
          // this.info("Discovering services and characteristics")
          console.log("Connected...Discovering services and characteristics");
          isChargerDeviceFound = true;
          setBtChargerDevice(device);
          if (isMainDeviceFound) {
            manager.stopDeviceScan();
          }
        });
    }
  });
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
