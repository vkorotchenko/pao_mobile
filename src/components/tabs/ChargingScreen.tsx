import {StyleSheet} from 'react-native';
import * as React from 'react';

// @ts-ignore
import characteristics from '../../config/characteristics.json';
import {BleContextType, BleContext} from '../../components/ble/BleContext';
import ScreenWrapper from '../../common/ScreenWrapper';
import {List} from 'react-native-paper';
import {ListItem} from '../ListItem';
import {useContext, useEffect, useState} from 'react';
var Buffer = require('buffer/').Buffer;

import BleManager, {
  BleManagerDidUpdateValueForCharacteristicEvent,
} from 'react-native-ble-manager';
import { startNotifyListener } from '../../common/ble';
export default function ChargingScreen() {
  const {charger, emitter} = useContext(BleContext) as BleContextType;

  const [reqVolt, setReqVolt] = useState(0);
  const [reqAmp, setReqAmp] = useState(0);
  const [resVolt, setResVolt] = useState(0);
  const [resAmp, setResAmp] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;

  useEffect(() => {
    
    startNotifyListener(charger?.id, serviceId, ids.elapsedTime, emitter, setElapsedTime);
    // startNotifyListener(charger?.id, serviceId, ids.reqVolt, emitter, setReqVolt);
    // startNotifyListener(charger?.id, serviceId, ids.reqAmp, emitter, setReqAmp);
    // startNotifyListener(charger?.id, serviceId, ids.resVolt, emitter, setResVolt);
    // startNotifyListener(charger?.id, serviceId, ids.resAmp, emitter, setResAmp);
  }, [emitter]);

  return (
    <ScreenWrapper>
      <List.Section>
        <List.Subheader>Configurations</List.Subheader>
        <ListItem mainText={reqVolt.toString()} secondaryText="Req Volt" key="req_volt"/>
        <ListItem mainText={reqAmp.toString()} secondaryText="Req Amp" key="req_amp"/>
        <ListItem mainText={resVolt.toString()} secondaryText="Res Volt" key="res_volt" />
        <ListItem mainText={resAmp.toString()} secondaryText="Res Amp" key="res_amp"/>
        <ListItem
          mainText={elapsedTime.toString()}
          secondaryText="Elapsed Time"
          key="elapsed_time"
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
