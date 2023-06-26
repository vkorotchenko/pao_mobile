import { Dispatch } from 'react';
import BleManager, {
  BleDisconnectPeripheralEvent,
  BleManagerDidUpdateValueForCharacteristicEvent,
  BleDiscoverPeripheralEvent,
  BleScanCallbackType,
  BleScanMatchMode,
  BleScanMode,
  Peripheral,
} from 'react-native-ble-manager';
import {
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
} from 'react-native';

export type Peripherals = Map<Peripheral['id'], Peripheral>;
type SetPeripherals = Dispatch<React.SetStateAction<Peripherals>>;
type SetIsScanning = Dispatch<React.SetStateAction<boolean>>;

const SECONDS_TO_SCAN_FOR = 7;
const SERVICE_UUIDS: string[] = [];
const ALLOW_DUPLICATES = true;

export const registerMonitor = (device: any, serviceId:string, characteristicId:string, setState:(value:any)=>void) => {
  // device?.monitorCharacteristicForService(
  //   serviceId,
  //   characteristicId,
  //   (error: BleError | null, characteristic: Characteristic | null) => {
  //     if (error) {
  //       console.log("Error: ", error.message);
  //       return;
  //     }
  //     if (characteristic && characteristic.value) {
  //       // @ts-ignore
  //       setState(characteristic.value);
  //     }
  //   },
  // );
}

export const addOrUpdatePeripheral = (id: string, updatedPeripheral: Peripheral, setPeripherals: SetPeripherals) => {
  // new Map() enables changing the reference & refreshing UI.
  // TOFIX not efficient.
  setPeripherals(map => new Map<string, Peripheral>(map.set(id, updatedPeripheral)));
};

export const startScan = (isScanning:boolean, setPeripheral: SetPeripherals, setIsScanning: SetIsScanning) => {
  if (!isScanning) {
    // reset found peripherals before scan
    setPeripheral(new Map<Peripheral['id'], Peripheral>());

    try {
      console.debug('[startScan] starting scan...');
      setIsScanning(true);
      BleManager.scan(SERVICE_UUIDS, SECONDS_TO_SCAN_FOR, ALLOW_DUPLICATES, {
        matchMode: BleScanMatchMode.Sticky,
        scanMode: BleScanMode.LowLatency,
        callbackType: BleScanCallbackType.AllMatches,
      })
        .then(() => {
          console.debug('[startScan] scan promise returned successfully.');
        })
        .catch(err => {
          console.error('[startScan] ble scan returned in error', err);
        });
    } catch (error) {
      console.error('[startScan] ble scan error thrown', error);
    }
  }
};

export const handleStopScan = (setIsScanning: SetIsScanning) => {
  setIsScanning(false);
  console.debug('[handleStopScan] scan is stopped.');
};

export const handleDisconnectedPeripheral = (
  event: BleDisconnectPeripheralEvent,
  peripherals: Peripherals,
  setPeripherals: SetPeripherals,
) => {
  let peripheral = peripherals.get(event.peripheral);
  if (peripheral) {
    console.debug(
      `[handleDisconnectedPeripheral][${peripheral.id}] previously connected peripheral is disconnected.`,
      event.peripheral,
    );
    addOrUpdatePeripheral(peripheral.id, {...peripheral}, setPeripherals);
  }
  console.debug(
    `[handleDisconnectedPeripheral][${event.peripheral}] disconnected.`,
  );
};

export const handleUpdateValueForCharacteristic = (
  data: BleManagerDidUpdateValueForCharacteristicEvent,
) => {
  console.debug(
    `[handleUpdateValueForCharacteristic] received data from '${data.peripheral}' with characteristic='${data.characteristic}' and value='${data.value}'`,
  );
};

export const handleDiscoverPeripheral = (peripheral: BleDiscoverPeripheralEvent,peripherals:Peripherals, setPeripherals: SetPeripherals) => {
  console.debug('[handleDiscoverPeripheral] new BLE peripheral=', peripheral);
  switch (peripheral.name) {
    case 'NO NAME':
      peripheral.name = 'NO NAME';
      break;
    case 'Pao EVCU':
    case 'Pao Charger':
      connectPeripheral(peripheral, peripherals, setPeripherals);
      break;


  }

  if (!peripheral.name) {

  }
  addOrUpdatePeripheral(peripheral.id, peripheral, setPeripherals);
};

export const togglePeripheralConnection = async (peripheral: Peripheral, peripherals: Peripherals, setPeripherals: SetPeripherals) => {
  if (peripheral) {
    try {
      await BleManager.disconnect(peripheral.id);
    } catch (error) {
      console.error(
        `[togglePeripheralConnection][${peripheral.id}] error when trying to disconnect device.`,
        error,
      );
    }
  } else {
    await connectPeripheral(peripheral, peripherals, setPeripherals);
  }
};

export const retrieveConnected = async (setPeripherals: SetPeripherals) => {
  try {
    const connectedPeripherals = await BleManager.getConnectedPeripherals();
    if (connectedPeripherals.length === 0) {
      console.warn('[retrieveConnected] No connected peripherals found.');
      return;
    }

    console.debug(
      '[retrieveConnected] connectedPeripherals',
      connectedPeripherals,
    );

    for (var i = 0; i < connectedPeripherals.length; i++) {
      var peripheral = connectedPeripherals[i];
      addOrUpdatePeripheral(peripheral.id, {...peripheral}, setPeripherals);
    }
  } catch (error) {
    console.error(
      '[retrieveConnected] unable to retrieve connected peripherals.',
      error,
    );
  }
};

export const connectPeripheral = async (peripheral: Peripheral, peripherals: Peripherals, setPeripherals: SetPeripherals) => {
  try {
    if (peripheral) {
      addOrUpdatePeripheral(peripheral.id, {...peripheral}, setPeripherals);

      await BleManager.connect(peripheral.id);
      console.debug(`[connectPeripheral][${peripheral.id}] connected.`);

      addOrUpdatePeripheral(peripheral.id, {...peripheral},
        setPeripherals);

      // before retrieving services, it is often a good idea to let bonding & connection finish properly
      await sleep(900);

      /* Test read current RSSI value, retrieve services first */
      const peripheralData = await BleManager.retrieveServices(peripheral.id);
      console.debug(
        `[connectPeripheral][${peripheral.id}] retrieved peripheral services`,
        peripheralData,
      );

      const rssi = await BleManager.readRSSI(peripheral.id);
      console.debug(
        `[connectPeripheral][${peripheral.id}] retrieved current RSSI value: ${rssi}.`,
      );

      if (peripheralData.characteristics) {
        for (let characteristic of peripheralData.characteristics) {
          if (characteristic.descriptors) {
            for (let descriptor of characteristic.descriptors) {
              try {
                let data = await BleManager.readDescriptor(
                  peripheral.id,
                  characteristic.service,
                  characteristic.characteristic,
                  descriptor.uuid,
                );
                console.debug(
                  `[connectPeripheral][${peripheral.id}] descriptor read as:`,
                  data,
                );
              } catch (error) {
                console.error(
                  `[connectPeripheral][${peripheral.id}] failed to retrieve descriptor ${descriptor} for characteristic ${characteristic}:`,
                  error,
                );
              }
            }
          }
        }
      }

      let p = peripherals.get(peripheral.id);
      if (p) {
        addOrUpdatePeripheral(peripheral.id, {...peripheral, rssi}, setPeripherals);
      }
    }
  } catch (error) {
    console.error(
      `[connectPeripheral][${peripheral.id}] connectPeripheral error`,
      error,
    );
  }
};

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}


export const handleAndroidPermissions = () => {
  if (Platform.OS === 'android' && Platform.Version >= 31) {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
    ]).then(result => {
      if (result) {
        console.debug(
          '[handleAndroidPermissions] User accepts runtime permissions android 12+',
        );
      } else {
        console.error(
          '[handleAndroidPermissions] User refuses runtime permissions android 12+',
        );
      }
    });
  } else if (Platform.OS === 'android' && Platform.Version >= 23) {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(checkResult => {
      if (checkResult) {
        console.debug(
          '[handleAndroidPermissions] runtime permission Android <12 already OK',
        );
      } else {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ).then(requestResult => {
          if (requestResult) {
            console.debug(
              '[handleAndroidPermissions] User accepts runtime permission android <12',
            );
          } else {
            console.error(
              '[handleAndroidPermissions] User refuses runtime permission android <12',
            );
          }
        });
      }
    });
  }
};