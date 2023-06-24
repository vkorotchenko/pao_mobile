import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import {useContext, useState} from "react";
import {BleMainContext} from "../../components/ble/BleMainContext";
import characteristics from "../../common/characteristics.json";
import {registerMonitor} from "../../common/ble";

export default function ConfigScreen() {

  const {device} = useContext(BleMainContext);

  const [configSpeedMax, setConfigSpeedMax] = useState(0);
  const [configTorqueMax, setConfigTorqueMax] = useState(0);
  const [configSpeedSlewRate, setConfigSpeedSlewRate] = useState(0);
  const [configTorqueSlewRate, setConfigTorqueSlewRate] = useState(0);
  const [configReversePercent, setConfigReversePercent] = useState(0);
  const [configKilowattHrs, setConfigKilowattHrs] = useState(0);
  const [configPrechargeR, setConfigPrechargeR] = useState(0);
  const [configNominalVolt, setConfigNominalVolt] = useState(0);
  const [configPrechargeRelay, setConfigPrechargeRelay] = useState(0);
  const [configMainContactorRelay, setConfigMainContactorRelay] = useState(0);
  const [configCoolFan, setConfigCoolFan] = useState(0);
  const [configCoolOn, setConfigCoolOn] = useState(0);
  const [configCoolOff, setConfigCoolOff] = useState(0);
  const [configBrakeLight, setConfigBrakeLight] = useState(0);
  const [configRevLight, setConfigRevLight] = useState(0);
  const [configEnableIn, setConfigEnableIn] = useState(0);
  const [configReverseIn, setConfigReverseIn] = useState(0);
  const [configRegenTaperLower, setConfigRegenTaperLower] = useState(0);
  const [configRegenTaperUpper, setConfigRegenTaperUpper] = useState(0);

  const serviceId = characteristics.evcu.id;
  const ids = characteristics.evcu.config;

  registerMonitor(device, serviceId, ids.configSpeedMax, setConfigSpeedMax);
  registerMonitor(device, serviceId, ids.configTorqueMax, setConfigTorqueMax);
  registerMonitor(device, serviceId, ids.configSpeedSlewRate, setConfigSpeedSlewRate);
  registerMonitor(device, serviceId, ids.configTorqueSlewRate, setConfigTorqueSlewRate);
  registerMonitor(device, serviceId, ids.configReversePercent, setConfigReversePercent);
  registerMonitor(device, serviceId, ids.configKilowattHrs, setConfigKilowattHrs);
  registerMonitor(device, serviceId, ids.configPrechargeR, setConfigPrechargeR);
  registerMonitor(device, serviceId, ids.configNominalVolt, setConfigNominalVolt);
  registerMonitor(device, serviceId, ids.configPrechargeRelay, setConfigPrechargeRelay);
  registerMonitor(device, serviceId, ids.configMainContactorRelay, setConfigMainContactorRelay);
  registerMonitor(device, serviceId, ids.configCoolFan, setConfigCoolFan);
  registerMonitor(device, serviceId, ids.configCoolOn, setConfigCoolOn);
  registerMonitor(device, serviceId, ids.configCoolOff, setConfigCoolOff);
  registerMonitor(device, serviceId, ids.configBrakeLight, setConfigBrakeLight);
  registerMonitor(device, serviceId, ids.configRevLight, setConfigRevLight);
  registerMonitor(device, serviceId, ids.configEnableIn, setConfigEnableIn);
  registerMonitor(device, serviceId, ids.configReverseIn, setConfigReverseIn);
  registerMonitor(device, serviceId, ids.configRegenTaperLower, setConfigRegenTaperLower);
  registerMonitor(device, serviceId, ids.configRegenTaperUpper, setConfigRegenTaperUpper);

  return (
    <View style={styles.container}>
      <Text>Config</Text>
      <Text>{configSpeedMax}</Text>
      <Text>{configTorqueMax}</Text>
      <Text>{configSpeedSlewRate}</Text>
      <Text>{configTorqueSlewRate}</Text>
      <Text>{configReversePercent}</Text>
      <Text>{configKilowattHrs}</Text>
      <Text>{configPrechargeR}</Text>
      <Text>{configNominalVolt}</Text>
      <Text>{configPrechargeRelay}</Text>
      <Text>{configMainContactorRelay}</Text>
      <Text>{configCoolFan}</Text>
      <Text>{configCoolOn}</Text>
      <Text>{configCoolOff}</Text>
      <Text>{configBrakeLight}</Text>
      <Text>{configRevLight}</Text>
      <Text>{configEnableIn}</Text>
      <Text>{configReverseIn}</Text>
      <Text>{configRegenTaperLower}</Text>
      <Text>{configRegenTaperUpper}</Text>
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
