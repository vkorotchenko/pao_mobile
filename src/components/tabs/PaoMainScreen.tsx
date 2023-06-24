import {StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import {useContext, useState} from "react";
import {BleMainContext} from "../../components/ble/BleMainContext";
import characteristics from "../../common/characteristics.json"
import {registerMonitor} from "../../common/ble";

export default function PaoMainScreen() {
  const {device} = useContext(BleMainContext);
  const [reqSpeed, setReqSpeed] = useState(0);
  const [reqState, setReqState] = useState(0);
  const [reqTorque, setReqTorque] = useState(0);
  const [reqAccel, setReqAccel] = useState(0);
  const [reqRegen, setReqRegen] = useState(0);
  const [resMotorTemp, setResMotorTemp] = useState(0);
  const [resInvTemp, setResInvTemp] = useState(0);
  const [resTorque, setResTorque] = useState(0);
  const [resSpeed, setResSpeed] = useState(0);
  const [resState, setResState] = useState(0);
  const [resDcVolt, setResDcVolt] = useState(0);
  const [resDcCurrent, setResDcCurrent] = useState(0);

  const serviceId = characteristics.evcu.id;
  const pao_ids = characteristics.evcu.pao;

  registerMonitor(device, serviceId, pao_ids.reqSpeed, setReqSpeed);
  registerMonitor(device, serviceId, pao_ids.reqState, setReqState);
  registerMonitor(device, serviceId, pao_ids.reqTorque, setReqTorque);
  registerMonitor(device, serviceId, pao_ids.reqAccel, setReqAccel);
  registerMonitor(device, serviceId, pao_ids.reqRegen, setReqRegen);
  registerMonitor(device, serviceId, pao_ids.resMotorTemp, setResMotorTemp);
  registerMonitor(device, serviceId, pao_ids.resInvTemp, setResInvTemp);
  registerMonitor(device, serviceId, pao_ids.resTorque, setResTorque);
  registerMonitor(device, serviceId, pao_ids.resSpeed, setResSpeed);
  registerMonitor(device, serviceId, pao_ids.resState, setResState);
  registerMonitor(device, serviceId, pao_ids.resDcVolt, setResDcVolt);
  registerMonitor(device, serviceId, pao_ids.resDcCurrent, setResDcCurrent);

  return (
    <View style={styles.container}>
      <Text>Request</Text>
      <Text>{reqState}</Text>
      <Text>{reqSpeed}</Text>
      <Text>{reqTorque}</Text>
      <Text>{reqAccel}</Text>
      <Text>{reqRegen}</Text>

      <Text>Response</Text>
      <Text>{resMotorTemp}</Text>
      <Text>{resInvTemp}</Text>
      <Text>{resTorque}</Text>
      <Text>{resSpeed}</Text>
      <Text>{resState}</Text>
      <Text>{resDcVolt}</Text>
      <Text>{resDcCurrent}</Text>

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