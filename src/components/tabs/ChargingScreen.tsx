import {StyleSheet} from 'react-native';
import * as React from 'react';

// @ts-ignore
import characteristics from '../../config/characteristics.json';
import {BleContextType, BleContext} from '../../components/ble/BleContext';
import {BleManagerDidUpdateValueForCharacteristicEvent} from 'react-native-ble-manager';
import ScreenWrapper from '../../common/ScreenWrapper';
import {List} from 'react-native-paper';
import {ListItem} from '../ListItem';
import {useContext, useEffect, useState} from 'react';
var Buffer = require('buffer/').Buffer;

export default function ChargingScreen() {
  const {emitter} = useContext(BleContext) as BleContextType;

  const [reqVolt, setReqVolt] = useState(0);
  const [reqAmp, setReqAmp] = useState(0);
  const [resVolt, setResVolt] = useState(0);
  const [resAmp, setResAmp] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;

  useEffect(() => {
    const listeners = [
      emitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (event: BleManagerDidUpdateValueForCharacteristicEvent) => {
          const peripheral = event.peripheral;
          const characteristic = event.characteristic;
          const value = Buffer.from(event.value);
          switch (characteristic) {
            case ids.reqVolt:
              setReqVolt(value);
              break;
            case ids.reqAmp:
              setReqAmp(value);
              break;
            case ids.resVolt:
              setResVolt(value);
              break;
            case ids.resAmp:
              setResAmp(value);
              break;
            case ids.elapsedTime:
              setElapsedTime(value);
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
        <ListItem mainText={reqVolt.toString()} secondaryText="Req Volt" />
        <ListItem mainText={reqAmp.toString()} secondaryText="Req Amp" />
        <ListItem mainText={resVolt.toString()} secondaryText="Res Volt" />
        <ListItem mainText={resAmp.toString()} secondaryText="Res Amp" />
        <ListItem
          mainText={elapsedTime.toString()}
          secondaryText="Elapsed Time"
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
