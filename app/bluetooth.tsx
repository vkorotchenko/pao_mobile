import {StyleSheet} from 'react-native';

import {Text, View} from '../components/Themed';

export default function BluetoothScreen() {

  return (
    <View style={styles.container}>
      <Text>BT config</Text>
    </View>
  );
}
//
//
// const scanAndConnect = (manager: BleManager) => {
//   console.log("Scanning Started");
//   manager.startDeviceScan(null, null, (error, device) => {
//     if (error) {
//       // Handle error (scanning will be stopped automatically)
//       console.log("Error in scanning devices:", error);
//       return
//     }
//     // Check if it is a device you are looking for based on advertisement data
//     // or other criteria.
//     console.log("Detected Device Details:", device?.id, device?.name);
//     // ||device.localName === 'BLEPeripheralApp')
//     if (device?.name === 'Pao EVCU') { //
//       // Stop scanning as it's not necessary if you are scanning for one device.
//       console.log("Device Found, Stopping the Scan.");
//       console.log("Connecting to:", device.name)
//       manager.stopDeviceScan();
//       device.connect()
//         .then((device) => {
//           // this.info("Discovering services and characteristics")
//           console.log("Connected...Discovering services and characteristics");
//           return device.discoverAllServicesAndCharacteristics()
//         })
//         .then((device) => {
//           console.log('Services and characteristics discovered');
//           //return this.testChar(device)
//           const services = device.services()
//           console.log(services);
//           const value = device.readCharacteristicForService(characteristic.evcu.id, characteristic.evcu.characteristics.reqSpeed);
//           console.log(value);
//           return value;
//           // device.readCharacteristicForService("abbaff00-e56a-484c-b832-8b17cf6cbfe8")
//           // this.info("Setting notifications")
//           //return this.setupNotifications(device)
//         })
//         .then((value) => {
//           console.log(value);
//           //this.info("Listening...")
//         }, (error) => {
//           console.warn(error.message);
//           // this.error(error.message)
//         })
//     }
//   });
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
