import React, {useContext, useEffect, useState} from "react";
import {BleContext, BleContextType} from "../../ble/BleContext";
import characteristics from '../../../config/characteristics.json';
import {startNotifyListener} from '../../../common/ble';
import {Chip} from "react-native-paper";
import {DisaplayElement} from "../../DisaplayElement";
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ChargingResVolt: React.FC<{}> = props => {
  const ids = characteristics.charger.charging;

  return (
    <>
      <BleListeningDisplayElement isCharger={true}
                                  serviceId={ids.serviceId}
                                  characteristicId={ids.resVolt}
                                  label={"Response Volt"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"res_volt"}/>
    </>
  );
};