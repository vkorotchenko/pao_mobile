import * as React from 'react';
import {useContext, useEffect, useState} from 'react';

// @ts-ignore
import characteristics from '../../config/characteristics.json';
import {
  BleContext,
  BleContextType,
} from '../../components/ble/BleContext';
import {handleUpdateValueForCharacteristic} from '../../common/ble';
import {BleManagerDidUpdateValueForCharacteristicEvent} from 'react-native-ble-manager';
import {StyleSheet, Image, View} from 'react-native';
import {List} from 'react-native-paper';
import {ListItem} from '../ListItem';
import ScreenWrapper from '../../common/ScreenWrapper';

var Buffer = require('buffer/').Buffer;

export default function ConfigScreen() {
  const {emitter} = useContext(BleContext) as BleContextType;

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
        (event: BleManagerDidUpdateValueForCharacteristicEvent) => {
          const peripheral = event.peripheral;
          const characteristic = event.characteristic;
          const value = Buffer.from(event.value);
          switch (characteristic) {
            case ids.configSpeedMax:
              setConfigSpeedMax(value);
              break;
            case ids.configTorqueMax:
              setConfigTorqueMax(value);
              break;
            case ids.configSpeedSlewRate:
              setConfigSpeedSlewRate(value);
              break;
            case ids.configTorqueSlewRate:
              setConfigTorqueSlewRate(value);
              break;
            case ids.configReversePercent:
              setConfigReversePercent(value);
              break;
            case ids.configKilowattHrs:
              setConfigKilowattHrs(value);
              break;
            case ids.configPrechargeR:
              setConfigPrechargeR(value);
              break;
            case ids.configNominalVolt:
              setConfigNominalVolt(value);
              break;
            case ids.configPrechargeRelay:
              setConfigPrechargeRelay(value);
              break;
            case ids.configMainContactorRelay:
              setConfigMainContactorRelay(value);
              break;
            case ids.configCoolFan:
              setConfigCoolFan(value);
              break;
            case ids.configCoolOn:
              setConfigCoolOn(value);
              break;
            case ids.configCoolOff:
              setConfigCoolOff(value);
              break;
            case ids.configBrakeLight:
              setConfigBrakeLight(value);
              break;
            case ids.configRevLight:
              setConfigRevLight(value);
              break;
            case ids.configEnableIn:
              setConfigEnableIn(value);
              break;
            case ids.configReverseIn:
              setConfigReverseIn(value);
              break;
            case ids.configRegenTaperLower:
              setConfigRegenTaperLower(value);
              break;
            case ids.configRegenTaperUpper:
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
    <ScreenWrapper>
      <List.Section>
        <List.Subheader>Configurations</List.Subheader>
        <ListItem
          mainText={configSpeedMax.toString()}
          secondaryText="Speed Max"
        />
        <ListItem
          mainText={configTorqueMax.toString()}
          secondaryText="Torque Max"
        />
        <ListItem
          mainText={configSpeedSlewRate.toString()}
          secondaryText="Speed Slew Rate"
        />
        <ListItem
          mainText={configTorqueSlewRate.toString()}
          secondaryText="Torque Slew Rate"
        />
        <ListItem
          mainText={configReversePercent.toString()}
          secondaryText="Reverse Percent"
        />
        <ListItem
          mainText={configKilowattHrs.toString()}
          secondaryText="Kilowatt Hrs"
        />
        <ListItem
          mainText={configPrechargeR.toString()}
          secondaryText="Precharge R"
        />
        <ListItem
          mainText={configNominalVolt.toString()}
          secondaryText="Nominal Volt"
        />
        <ListItem
          mainText={configPrechargeRelay.toString()}
          secondaryText="Precharge Relay"
        />
        <ListItem
          mainText={configMainContactorRelay.toString()}
          secondaryText="Main Contactor Relay"
        />
        <ListItem
          mainText={configCoolFan.toString()}
          secondaryText="Cool Fan"
        />
        <ListItem mainText={configCoolOn.toString()} secondaryText="Cool On" />
        <ListItem
          mainText={configCoolOff.toString()}
          secondaryText="Cool Off"
        />
        <ListItem
          mainText={configBrakeLight.toString()}
          secondaryText="Brake Light"
        />
        <ListItem
          mainText={configRevLight.toString()}
          secondaryText="Rev Light"
        />
        <ListItem
          mainText={configEnableIn.toString()}
          secondaryText="Enable In"
        />
        <ListItem
          mainText={configReverseIn.toString()}
          secondaryText="Reverse In"
        />
        <ListItem
          mainText={configRegenTaperLower.toString()}
          secondaryText="Regen Taper Lower"
        />
        <ListItem
          mainText={configRegenTaperUpper.toString()}
          secondaryText="Regen Taper Upper"
        />
      </List.Section>
    </ScreenWrapper>
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
