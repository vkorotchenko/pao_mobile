import {StyleSheet} from 'react-native';
import * as React from 'react';

// @ts-ignore
import characteristics from '../../config/characteristics.json';
import {BleContextType, BleContext} from '../../components/ble/BleContext';
import ScreenWrapper from '../../common/ScreenWrapper';
import {List} from 'react-native-paper';
import {ListItem} from '../ListItem';
import {useContext, useDeferredValue, useEffect, useState} from 'react';
import {Col, Row, Grid} from "react-native-paper-grid";

var Buffer = require('buffer/').Buffer;

import BleManager, {
  BleManagerDidUpdateValueForCharacteristicEvent,
} from 'react-native-ble-manager';

import {startNotifyListener} from '../../common/ble';
import {ChargingElapsedTime} from './charging/ChargingElapsedTime';
import {ChargingReqAmp} from './charging/ChargingReqAmp';
import {ChargingResVolt} from './charging/ChargingResVolt';
import {ChargingResAmp} from './charging/ChargingResAmp';
import {ChargingReqVolt} from './charging/ChargingReqVolt';
import {BleListeningDisplayElement} from '../../common/BleListeningDisplayElement';
import {getDecimalDisplayValue, toTimeString} from '../../common/util';

export default function ChargingScreen() {
  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;
  return (
    <ScreenWrapper>
      <Grid>
        <Row>
          <Col>
            <ChargingReqVolt/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ChargingReqAmp/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ChargingResVolt/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ChargingResAmp/>
          </Col>
        </Row>
        <Row>
          <Col>
            <ChargingElapsedTime/>
          </Col>
        </Row>
      </Grid>
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
