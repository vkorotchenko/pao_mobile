import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {PaperProvider} from 'react-native-paper';
import {BleManager} from 'react-native-ble';
import {scanAndConnect} from "./src/common/ble";
import {BleChargerContext} from "./src/components/ble/BleChargerContext";
import {BleMainContext} from "./src/components/ble/BleMainContext";
import TabNavigation from "./src/components/tabs/TabNavigation";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import ScreenWrapper from './src/common/ScreenWrapper';

// const manager = new BleManager({});

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const [btMainDevice, setBtMainDevice] = useState();
  const [btChargerDevice, setBtChargerDevice] = useState();

  // useEffect(() => {
  //   BleManager.enableBluetooth().then(() => {
  //     console.log('Bluetooth is turned on!');
  //   });
  // }, []);
  //
  // useEffect(() => {
  //
  //   console.log("Setting up initial manager subscription");
  //   BleManager.start({ showAlert: false }).then(() => {
  //     // Success code
  //     console.log("Module initialized");
  //   });
  //   manager.onStateChange((state) => {
  //     const subscription = manager.onStateChange((state) => {
  //       if (state === 'PoweredOn') {
  //         scanAndConnect(manager, setBtMainDevice, setBtChargerDevice);
  //         subscription.remove();
  //       }
  //     }, true);
  //     return () => subscription.remove();
  //   });
  // }, [manager]);


  return (
    <PaperProvider>
      <ScreenWrapper contentContainerStyle={styles.container}>
        <BleMainContext.Provider value={{device: btMainDevice}}>
          <BleChargerContext.Provider value={{device: btChargerDevice}}>
            <TabNavigation/>
          </BleChargerContext.Provider>
        </BleMainContext.Provider>
      </ScreenWrapper>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
