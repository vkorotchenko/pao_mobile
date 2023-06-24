import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import {useContext, useState} from "react";
import characteristics from "../../common/characteristics.json";
import {registerMonitor} from "../../common/ble";
import {BleChargerContext} from "../../components/ble/BleChargerContext";

export default function ChargingScreen() {

  const {device} = useContext(BleChargerContext);
  const [reqVolt, setReqVolt] = useState(0);
  const [reqAmp, setReqAmp] = useState(0);
  const [resVolt, setResVolt] = useState(0);
  const [resAmp, setResAmp] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;


  registerMonitor(device, serviceId, ids.reqVolt, setReqVolt);
  registerMonitor(device, serviceId, ids.reqAmp, setReqAmp);
  registerMonitor(device, serviceId, ids.resVolt, setResVolt);
  registerMonitor(device, serviceId, ids.resAmp, setResAmp);
  registerMonitor(device, serviceId, ids.elapsedTime, setElapsedTime);
  
  return (
    <View style={styles.container}>
      <Text>Charging</Text>
      <Text>{reqVolt}</Text>
      <Text>{reqAmp}</Text>
      <Text>{resVolt}</Text>
      <Text>{resAmp}</Text>
      <Text>{elapsedTime}</Text>
    </View>
  );
}

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
