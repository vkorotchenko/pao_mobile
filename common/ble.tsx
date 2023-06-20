import {BleError, BleManager, Characteristic, Device} from "react-native-ble-plx";

export const registerMonitor = (device: Device | undefined, serviceId:string, characteristicId:string, setState:(value:any)=>void) => {
  device?.monitorCharacteristicForService(
    serviceId,
    characteristicId,
    (error: BleError | null, characteristic: Characteristic | null) => {
      if (error) {
        console.log("Error: ", error.message);
        return;
      }
      if (characteristic && characteristic.value) {
        // @ts-ignore
        setState(characteristic.value);
      }
    },
  );
}

export const scanAndConnect = (manager: BleManager, setBtMainDevice: any, setBtChargerDevice: any) => {
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