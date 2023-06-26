import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {PaperProvider} from 'react-native-paper';
import {
  handleDisconnectedPeripheral,
  handleStopScan,
  handleUpdateValueForCharacteristic,
  Peripherals,
  handleDiscoverPeripheral,
  handleAndroidPermissions,
  startScan
} from "./src/common/ble";
import {BleChargerContext} from "./src/components/ble/BleChargerContext";
import {BleMainContext} from "./src/components/ble/BleMainContext";
import TabNavigation from "./src/components/tabs/TabNavigation";
import {
  NativeModules,
  NativeEventEmitter,
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

import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';


import ScreenWrapper from './src/common/ScreenWrapper';
import { FloatingIcons } from './src/components/FloatingIcons';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>() as Peripherals
  );

  const [btMainDevice, setBtMainDevice] = useState();
  const [btChargerDevice, setBtChargerDevice] = useState();

  // do bt scan : https://github.com/innoveit/react-native-ble-manager/blob/master/example/App.tsx
  useEffect(() => {
    try {
      BleManager.start({showAlert: false})
        .then(() => {
          console.debug('BleManager started.');
          handleAndroidPermissions();
          startScan(isScanning, setPeripherals, setIsScanning);
        })
        .catch(error =>
          console.error('BeManager could not be started.', error),
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }


    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        (peripheral)=>handleDiscoverPeripheral(peripheral,peripherals, setPeripherals),
      ),
      bleManagerEmitter.addListener(
        'BleManagerStopScan',
        ()=>handleStopScan(setIsScanning)),
      bleManagerEmitter.addListener(
        'BleManagerDisconnectPeripheral',
        (event)=>handleDisconnectedPeripheral(event, peripherals, setPeripherals),
      ),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (event)=>handleUpdateValueForCharacteristic(event),
      ),
    ];


    return () => {
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, [bleManagerEmitter]);


  return (
    <PaperProvider>
      <ScreenWrapper contentContainerStyle={styles.container}>
        <BleMainContext.Provider value={{device: btMainDevice, emitter: bleManagerEmitter}}>
          <BleChargerContext.Provider value={{device: btChargerDevice, emitter: bleManagerEmitter}}>
            <View style={styles.screen}>
              <FloatingIcons/>
              <TabNavigation/>
            </View>
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
  screen: {
    flex: 1,
  },
});

export default App;
