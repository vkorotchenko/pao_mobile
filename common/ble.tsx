import {BleError, Characteristic, Device} from "react-native-ble-plx";

export const registerMonitor = (device: Device | null, serviceId:string, characteristicId:string, setState:(value:any)=>void) => {
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