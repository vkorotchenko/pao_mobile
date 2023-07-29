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
import {BleManagerDidUpdateValueForCharacteristicEvent} from 'react-native-ble-manager';
import {StyleSheet, Image, View} from 'react-native';
import {List} from 'react-native-paper';
import {ListItem} from '../ListItem';
import ScreenWrapper from '../../common/ScreenWrapper';
import { ConfigSpeedMax } from './config/ConfigSpeedMax';
import { ConfigTorqueMax } from './config/ConfigTorqueMax';
import { ConfigSpeedSlewRate } from './config/ConfigSpeedSlewRate';
import { ConfigTorqueSlewRate } from './config/ConfigTorqueSlewRate';
import { ConfigReversePercent } from './config/ConfigReversePercent';
import { ConfigKilowattHrs } from './config/ConfigKilowattHrs';
import { ConfigPrechargeR } from './config/ConfigPrechargeR';
import { ConfigNominalVolt } from './config/ConfigNominalVolt';
import { ConfigPrechargeRelay } from './config/ConfigPrechargeRelay';
import { ConfigMainContactorRelay } from './config/ConfigMainContactorRelay';
import { ConfigRegenTaperLower } from './config/ConfigRegenTaperLower';
import { ConfigRegenTaperUpper } from './config/ConfigRegenTaperUpper';
import { ConfigCoolFan } from './config/ConfigCoolFan';
import { ConfigCoolOn } from './config/ConfigCoolOn';
import { ConfigCoolOff } from './config/ConfigCoolOff';
import { ConfigBrakeLight } from './config/ConfigBrakeLight';
import { ConfigRevLight } from './config/ConfigRevLight';
import { ConfigEnableIn } from './config/ConfigEnableIn';
import { ConfigReverseIn } from './config/ConfigReverseIn';

var Buffer = require('buffer/').Buffer;

export default function ConfigScreen() {
  return (

  <ScreenWrapper>
    <Grid>
      <Row>
        <Col>
          <ConfigSpeedMax/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigTorqueMax/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigSpeedSlewRate/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigTorqueSlewRate/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigReversePercent/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigKilowattHrs/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigPrechargeR/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigNominalVolt/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigPrechargeRelay/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigMainContactorRelay/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigCoolFan/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigCoolOn/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigCoolOff/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigBrakeLight/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigRevLight/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigEnableIn/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigReverseIn/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigRegenTaperLower/>
        </Col>
      </Row>
      <Row>
        <Col>
          <ConfigRegenTaperUpper/>
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
