import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import {useContext, useState} from "react";
import {BleMainContext} from "../../components/ble/BleMainContext";
import characteristics from "../../common/characteristics.json";
import {registerMonitor} from "../../common/ble";

export default function InputOutputScreen() {

  const {device} = useContext(BleMainContext);

  const [outMainCon, setOutMainCon] = useState(0);
  const [outPreCon, setOutPreCon] = useState(0);
  const [outBrake, setOutBrake] = useState(0);
  const [outCooling, setOutCooling] = useState(0);
  const [outReverseLight, setOutReverseLight] = useState(0);
  const [inReverse, setInReverse] = useState(0);
  const [inEnable, setInEnable] = useState(0);
  const [inThrottle, setInThrottle] = useState(0);
  const [inBrake, setInBrake] = useState(0);
  const [isRunning, setIsRunning] = useState(0);
  const [isFaulted, setIsFaulted] = useState(0);
  const [isWarning, setIsWarning] = useState(0);

  const serviceId = characteristics.evcu.id;
  const ids = characteristics.evcu.input_output;
  const status_ids = characteristics.evcu.status;

  registerMonitor(device, serviceId, ids.outMainCon, setOutMainCon);
  registerMonitor(device, serviceId, ids.outPreCon, setOutPreCon);
  registerMonitor(device, serviceId, ids.outBrake, setOutBrake);
  registerMonitor(device, serviceId, ids.outCooling, setOutCooling);
  registerMonitor(device, serviceId, ids.outReverseLight, setOutReverseLight);
  registerMonitor(device, serviceId, ids.inReverse, setInReverse);
  registerMonitor(device, serviceId, ids.inEnable, setInEnable);
  registerMonitor(device, serviceId, ids.inThrottle, setInThrottle);
  registerMonitor(device, serviceId, ids.inBrake, setInBrake);


  registerMonitor(device, serviceId, status_ids.isWarning, setIsWarning);
  registerMonitor(device, serviceId, status_ids.isFaulted, setIsFaulted);
  registerMonitor(device, serviceId, status_ids.isRunning, setIsRunning);


  return (
    <View style={styles.container}>
      <Text>Input</Text>
      <Text>{outMainCon}</Text>
      <Text>{outPreCon}</Text>
      <Text>{outBrake}</Text>
      <Text>{outCooling}</Text>
      <Text>{outReverseLight}</Text>
      <Text>OutPut</Text>
      <Text>{inReverse}</Text>
      <Text>{inEnable}</Text>
      <Text>{inThrottle}</Text>
      <Text>{inBrake}</Text>
      <Text>Status</Text>
      <Text>{isRunning}</Text>
      <Text>{isFaulted}</Text>
      <Text>{isWarning}</Text>
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
