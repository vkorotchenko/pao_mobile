import {StyleSheet} from 'react-native';
import * as React from 'react';

// @ts-ignore
import characteristics from '../../config/characteristics.json';
import {useContext, useEffect, useState} from 'react';
import {BleContext, BleContextType} from '../../components/ble/BleContext';
import {BleManagerDidUpdateValueForCharacteristicEvent} from 'react-native-ble-manager';
import ScreenWrapper from '../../common/ScreenWrapper';
import {ListItem} from '../ListItem';
var Buffer = require('buffer/').Buffer;
import {List} from 'react-native-paper';

export default function PaoMainScreen() {
  const {emitter} = useContext(BleContext) as BleContextType;

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
  const ids = characteristics.evcu.pao;

  useEffect(() => {
    const listeners = [
      emitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (event: BleManagerDidUpdateValueForCharacteristicEvent) => {
          const peripheral = event.peripheral;
          const characteristic = event.characteristic;
          const value = Buffer.from(event.value);
          switch (characteristic) {
            case ids.reqSpeed:
              setReqSpeed(value);
              break;
            case ids.reqState:
              setReqState(value);
              break;
            case ids.reqTorque:
              setReqTorque(value);
              break;
            case ids.reqAccel:
              setReqAccel(value);
              break;
            case ids.reqRegen:
              setReqRegen(value);
              break;
            case ids.resMotorTemp:
              setResMotorTemp(value);
              break;
            case ids.resInvTemp:
              setResInvTemp(value);
              break;
            case ids.resTorque:
              setResTorque(value);
              break;
            case ids.resSpeed:
              setResSpeed(value);
              break;
            case ids.resState:
              setResState(value);
              break;
            case ids.resDcVolt:
              setResDcVolt(value);
              break;
            case ids.resDcCurrent:
              setResDcCurrent(value);
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
        <ListItem mainText={reqAccel.toString()} secondaryText="Req Accel" />
        <ListItem mainText={reqRegen.toString()} secondaryText="Req Regen" />
        <ListItem mainText={reqSpeed.toString()} secondaryText="Req Speed" />
        <ListItem mainText={reqState.toString()} secondaryText="Req State" />
        <ListItem mainText={reqTorque.toString()} secondaryText="Req Torque" />
        <ListItem
          mainText={resDcCurrent.toString()}
          secondaryText="Res Dc Current"
        />
        <ListItem mainText={resDcVolt.toString()} secondaryText="Res Dc Volt" />
        <ListItem
          mainText={resInvTemp.toString()}
          secondaryText="Res Inv Temp"
        />
        <ListItem
          mainText={resMotorTemp.toString()}
          secondaryText="Res Motor Temp"
        />
        <ListItem mainText={resSpeed.toString()} secondaryText="Res Speed" />
        <ListItem mainText={resState.toString()} secondaryText="Res State" />
        <ListItem mainText={resTorque.toString()} secondaryText="Res Torque" />
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
