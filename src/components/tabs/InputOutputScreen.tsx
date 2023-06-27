import {StyleSheet} from 'react-native';
import * as React from 'react';

// @ts-ignore
import characteristics from '../../config/characteristics.json';
import {useContext, useEffect, useState} from 'react';
import {BleContext, BleContextType} from '../../components/ble/BleContext';
import {ListItem} from '../ListItem';
import {Divider, List} from 'react-native-paper';
import ScreenWrapper from '../../common/ScreenWrapper';
import {BleManagerDidUpdateValueForCharacteristicEvent} from 'react-native-ble-manager';

var Buffer = require('buffer/').Buffer;

export default function InputOutputScreen() {
  const {emitter} = useContext(BleContext) as BleContextType;

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

  useEffect(() => {
    const listeners = [
      emitter.addListener(
        'BleManagerDidUpdateValueForCharacteristic',
        (event: BleManagerDidUpdateValueForCharacteristicEvent) => {
          const peripheral = event.peripheral;
          const characteristic = event.characteristic;
          const value = Buffer.from(event.value);
          if (event.service === serviceId) {
            switch (characteristic) {
              case ids.outMainCon:
                setOutMainCon(value);
                break;
              case ids.outPreCon:
                setOutPreCon(value);
                break;
              case ids.outBrake:
                setOutBrake(value);
                break;
              case ids.outCooling:
                setOutCooling(value);
                break;
              case ids.outReverseLight:
                setOutReverseLight(value);
                break;
              case ids.inReverse:
                setInReverse(value);
                break;
              case ids.inEnable:
                setInEnable(value);
                break;
              case ids.inThrottle:
                setInThrottle(value);
                break;
              case ids.inBrake:
                setInBrake(value);
                break;
            }
          } else if (event.service === status_ids) {
            switch (characteristic) {
              case status_ids.isRunning:
                setIsRunning(value);
                break;
              case status_ids.isFaulted:
                setIsFaulted(value);
                break;
              case status_ids.isWarning:
                setIsWarning(value);
                break;
            }
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
          mainText={outMainCon.toString()}
          secondaryText="Main Contactor"
        />
        <ListItem
          mainText={outPreCon.toString()}
          secondaryText="Precharge Contactor"
        />
        <ListItem mainText={outBrake.toString()} secondaryText="Brake Light" />
        <ListItem
          mainText={outCooling.toString()}
          secondaryText="Cooling Fan"
        />
        <ListItem
          mainText={outReverseLight.toString()}
          secondaryText="Reverse Light"
        />
        <ListItem
          mainText={inReverse.toString()}
          secondaryText="Reverse Switch"
        />
        <ListItem
          mainText={inEnable.toString()}
          secondaryText="Enable Switch"
        />
        <ListItem mainText={inThrottle.toString()} secondaryText="Throttle" />
        <ListItem mainText={inBrake.toString()} secondaryText="Brake" />
        <Divider />
        <ListItem mainText={isRunning.toString()} secondaryText="Running" />
        <ListItem mainText={isFaulted.toString()} secondaryText="Faulted" />
        <ListItem mainText={isWarning.toString()} secondaryText="Warning" />
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
