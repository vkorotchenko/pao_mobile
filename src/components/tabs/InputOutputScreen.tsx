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
import {Col, Row, Grid} from "react-native-paper-grid";
import {OutputMainContactor} from './inputoutput/OutputMainContactor';
import {OutputPrechargeContactor} from './inputoutput/OutputPrechargeContactor';
import {OutputBrakeLight} from './inputoutput/OutputBrakeLight';
import {OutputCoolingFan} from './inputoutput/OutputCoolingFan';
import {OutputReverseLight} from './inputoutput/OutputReverseLight';
import {InputReverseSwitch} from './inputoutput/InputReverseSwitch';
import {InputEnableSwitch} from './inputoutput/InputEnableSwitch';
import {InputThrottle} from './inputoutput/InputThrottle';
import {InputBrake} from './inputoutput/InputBrake';
import {StatusIsRunning} from './inputoutput/StatusIsRunning';
import {StatusIsFaulted} from './inputoutput/StatusIsFaulted';
import {StatusIsWarning} from './inputoutput/StatusIsWarning';


var Buffer = require('buffer/').Buffer;

export default function InputOutputScreen() {
  return (
    <ScreenWrapper>
      <Grid>
        <Row>
          <Col>
            <OutputMainContactor/>
          </Col>
        </Row>
        <Row>
          <Col>
            <OutputPrechargeContactor/>
          </Col>
        </Row>
        <Row>
          <Col>
            <OutputBrakeLight/>
          </Col>
        </Row>
        <Row>
          <Col>
            <OutputCoolingFan/>
          </Col>
        </Row>
        <Row>
          <Col>
            <OutputReverseLight/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Divider/>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputReverseSwitch/>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputEnableSwitch/>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputThrottle/>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputBrake/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Divider/>
          </Col>
        </Row>
        <Row>
          <Col>
            <StatusIsRunning/>
          </Col>
        </Row>
        <Row>
          <Col>
            <StatusIsFaulted/>
          </Col>
        </Row>
        <Row>
          <Col>
            <StatusIsWarning/>
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
