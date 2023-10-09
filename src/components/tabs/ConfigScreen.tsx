import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {Col, Row, Grid} from "react-native-paper-grid";

// @ts-ignore
import characteristics from '../../config/characteristics.json';
import {
  BleContext,
  BleContextType,
} from '../../components/ble/BleContext';
import {handleUpdateValueForCharacteristic} from '../../common/ble';
import {StyleSheet, Image, View} from 'react-native';
import {ListItem} from '../ListItem';
import ScreenWrapper from '../../common/ScreenWrapper';
import { Config1 } from './config/Config1';
import { Config2 } from './config/Config2';
import { Config3 } from './config/Config3';

var Buffer = require('buffer/').Buffer;

export default function ConfigScreen() {
  return (

  <ScreenWrapper>
    <Grid>
      <Row>
        <Col>
          <Config1/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Config2/>
        </Col>
      </Row>
      <Row>
        <Col>
          <Config3/>
        </Col>
      </Row>
    </Grid>
  </ScreenWrapper>
)
  ;
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
