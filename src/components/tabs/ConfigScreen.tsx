
import {useContext, useEffect, useState} from "react";
import {BleMainContext, BleMainContextType} from "../../components/ble/BleMainContext";
import characteristics from "../../common/characteristics.json";
import {handleUpdateValueForCharacteristic, registerMonitor} from "../../common/ble";
import { BleManagerDidUpdateValueForCharacteristicEvent } from 'react-native-ble-manager';
import { StyleSheet, Image, View } from 'react-native';
import { Caption, List, Text, Chip, Divider } from 'react-native-paper';

var Buffer = require('buffer/').Buffer


export default function ConfigScreen() {

  const {emitter, device} = useContext(BleMainContext) as BleMainContextType;

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

  useEffect(() => {
    const listeners = [
      emitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (event: BleManagerDidUpdateValueForCharacteristicEvent)=>  {
          const peripheral = event.peripheral;
          const characteristic = event.characteristic;
          const value = Buffer.from(event.value);
          switch (characteristic) {
            case ids.speedMax:
              setConfigSpeedMax(value);
              break;
            case ids.torqueMax:
              setConfigTorqueMax(value);
              break;
            case ids.speedSlewRate:
              setConfigSpeedSlewRate(value);
              break;
            case ids.torqueSlewRate:
              setConfigTorqueSlewRate(value);
              break;
            case ids.reversePercent:
              setConfigReversePercent(value);
              break;
            case ids.kilowattHrs:
              setConfigKilowattHrs(value);
              break;
            case ids.prechargeR:
              setConfigPrechargeR(value);
              break;
            case ids.nominalVolt:
              setConfigNominalVolt(value);
              break;
            case ids.prechargeRelay:
              setConfigPrechargeRelay(value);
              break;
            case ids.mainContactorRelay:
              setConfigMainContactorRelay(value);
              break;
            case ids.coolFan:
              setConfigCoolFan(value);
              break;
            case ids.coolOn:
              setConfigCoolOn(value);
              break;
            case ids.coolOff:
              setConfigCoolOff(value);
              break;
            case ids.brakeLight:
              setConfigBrakeLight(value);
              break;
            case ids.revLight:
              setConfigRevLight(value);
              break;
            case ids.enableIn:
              setConfigEnableIn(value);
              break;
            case ids.reverseIn:
              setConfigReverseIn(value);
              break;
            case ids.regenTaperLower:
              setConfigRegenTaperLower(value);
              break;
            case ids.regenTaperUpper:
              setConfigRegenTaperUpper(value);
              break;
          }
        },
      ),
    ];

    return () => {
      for (const listener of listeners) {
        listener.remove();
      }
    };
  }, [emitter]);

  return (

    <List.Section>
      <List.Subheader>Single line</List.Subheader>
      <List.Item
        left={(props) => <List.Icon {...props} icon="calendar" />}
        title="List item 1"
      />
      <List.Item
        left={(props) => <List.Icon {...props} icon="wallet-giftcard" />}
        title="List item 2"
      />
      <List.Item
        title="List item 3"
        left={(props) => <List.Icon {...props} icon="folder" />}
        right={(props) => <List.Icon {...props} icon="equal" />}
      />
    </List.Section>
    // <View style={styles.container}>
    //   <Text>Config</Text>
    //   <Text>{configSpeedMax}</Text>
    //   <Text>{configTorqueMax}</Text>
    //   <Text>{configSpeedSlewRate}</Text>
    //   <Text>{configTorqueSlewRate}</Text>
    //   <Text>{configReversePercent}</Text>
    //   <Text>{configKilowattHrs}</Text>
    //   <Text>{configPrechargeR}</Text>
    //   <Text>{configNominalVolt}</Text>
    //   <Text>{configPrechargeRelay}</Text>
    //   <Text>{configMainContactorRelay}</Text>
    //   <Text>{configCoolFan}</Text>
    //   <Text>{configCoolOn}</Text>
    //   <Text>{configCoolOff}</Text>
    //   <Text>{configBrakeLight}</Text>
    //   <Text>{configRevLight}</Text>
    //   <Text>{configEnableIn}</Text>
    //   <Text>{configReverseIn}</Text>
    //   <Text>{configRegenTaperLower}</Text>
    //   <Text>{configRegenTaperUpper}</Text>
    // </View>
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
