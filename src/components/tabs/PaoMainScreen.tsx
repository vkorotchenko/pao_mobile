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
import {Col, Row, Grid} from "react-native-paper-grid";
import {PaoMainReqAccel} from './main/PaoMainReqAccel';
import {PaoMainReqRegen} from './main/PaoMainReqRegen';
import {PaoMainReqSpeed} from './main/PaoMainReqSpeed';
import {PaoMainReqState} from './main/PaoMainReqState';
import {PaoMainReqTorque} from './main/PaoMainReqTorque';
import {PaoMainResDcCurrent} from './main/PaoMainResDcCurrent';
import {PaoMainResDcVolt} from './main/PaoMainResDcVolt';
import {PaoMainResInvTemp} from './main/PaoMainResInvTemp';
import {PaoMainResMotorTemp} from './main/PaoMainResMotorTemp';
import {PaoMainResSpeed} from './main/PaoMainResSpeed';
import {PaoMainResState} from './main/PaoMainResState';
import {PaoMainResTorque} from './main/PaoMainResTorque';


export default function PaoMainScreen() {
  return (
    <ScreenWrapper>
      <Grid>
        <Row>
          <Col>
            <PaoMainReqAccel/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainReqRegen/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainReqSpeed/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainReqState/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainReqTorque/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainResDcVolt/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainResDcCurrent/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainResInvTemp/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainResMotorTemp/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainResSpeed/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainResState/>
          </Col>
        </Row>
        <Row>
          <Col>
            <PaoMainResTorque/>
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
