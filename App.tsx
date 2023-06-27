import * as React from 'react';

import {useEffect, useState} from 'react';
import {BottomNavigation, PaperProvider} from 'react-native-paper';
import {
  handleDisconnectedPeripheral,
  handleStopScan,
  handleUpdateValueForCharacteristic,
  Peripherals,
  handleDiscoverPeripheral,
  handleAndroidPermissions,
  startScan,
  isConnected,
} from './src/common/ble';
// @ts-ignore
import tabs from './src/config/tabs.json';
import {BleContext} from './src/components/ble/BleContext';
import {
  NativeModules,
  NativeEventEmitter,
  StyleSheet,
  useColorScheme,
  View,
  Easing,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';

import ScreenWrapper from './src/common/ScreenWrapper';
import {FloatingIcons} from './src/components/FloatingIcons';
import PaoMainScreen from './src/components/tabs/PaoMainScreen';
import ChargingScreen from './src/components/tabs/ChargingScreen';
import ConfigScreen from './src/components/tabs/ConfigScreen';
import InputOutputScreen from './src/components/tabs/InputOutputScreen';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [index, setIndex] = React.useState(0);
  const routes = tabs.navigation;

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [isScanning, setIsScanning] = useState(false);
  const [peripherals, setPeripherals] = useState(
    new Map<Peripheral['id'], Peripheral>() as Peripherals
  );


  const getPeripheralByName = (name: string) => {
    // @ts-ignore
    for (let p of peripherals.values()) {
      if (p.name === name) {
        return p;
      }
    }
  }

  useEffect(() => {
    try {
      BleManager.start({showAlert: false})
        .then(() => {
          console.debug('BleManager started.');
        })
        .catch(error =>
          console.error('BeManager could not be started.', error),
        );
    } catch (error) {
      console.error('unexpected error starting BleManager.', error);
      return;
    }

    handleAndroidPermissions();
    startScan(isScanning, setIsScanning);

    const listeners = [
      bleManagerEmitter.addListener(
        'BleManagerDiscoverPeripheral',
        peripheral =>
          handleDiscoverPeripheral(peripheral, peripherals, setPeripherals, setIsScanning),
      ),
      bleManagerEmitter.addListener('BleManagerStopScan', () =>
        handleStopScan(setIsScanning),
      ),
      bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', event =>
        handleDisconnectedPeripheral(event, peripherals, setPeripherals),
      ),
      bleManagerEmitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        event => handleUpdateValueForCharacteristic(event),
      ),
    ];

    return () => {
      console.debug('[app] main component unmounting. Removing listeners...');
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, [bleManagerEmitter]);

  const tabMap = {
    pao: () => <PaoMainScreen/>,
    charging: () => <ChargingScreen/>,
    inputOutput: () => <InputOutputScreen/>,
    config: () => <ConfigScreen/>,
  };

  return (
    <PaperProvider>
      <ScreenWrapper contentContainerStyle={styles.container}>
        <BleContext.Provider value={{
          emitter: bleManagerEmitter,
          evcu: getPeripheralByName('Pao EVCU'),
          charger: getPeripheralByName('Pao Charger')
        }}>
          <View style={styles.screen}>
            <FloatingIcons
              isScanning={isScanning}
              isMainConnected={() => isConnected('Pao EVCU', peripherals)}
              isChargerConnected={() => isConnected('Pao Charger', peripherals)}
              setIsScanning={setIsScanning}
            />

            <BottomNavigation
              navigationState={{index, routes}}
              onIndexChange={setIndex}
              labelMaxFontSizeMultiplier={2}
              renderScene={BottomNavigation.SceneMap(tabMap)}
              sceneAnimationEnabled={true}
              sceneAnimationType={'shifting'}
              sceneAnimationEasing={Easing.ease}
            />
          </View>
        </BleContext.Provider>
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
