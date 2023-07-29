import React, {useContext, useEffect, useState} from "react";
import {BleContext, BleContextType} from "../../ble/BleContext";
import characteristics from '../../../config/characteristics.json';
import {startNotifyListener} from '../../../common/ble';
import {Chip} from "react-native-paper";
import {DisaplayElement} from "../../DisaplayElement";
import {toTimeString} from "../../../common/util";


export const ChargingElapsedTime: React.FC<{}> = props => {
  const {charger, emitter} = useContext(BleContext) as BleContextType;

  const [elapsedTime, setElapsedTime] = useState(0);

  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;

  useEffect(() => {
    startNotifyListener(charger?.id, serviceId, ids.elapsedTime, emitter, setElapsedTime);

  }, [emitter]);

  return (
    <>
      <DisaplayElement value={toTimeString(elapsedTime)} label={'Elapsed Time'}/>
    </>
  );
};