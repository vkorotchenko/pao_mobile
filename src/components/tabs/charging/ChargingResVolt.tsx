import React, {useContext, useEffect, useState} from "react";
import {BleContext, BleContextType} from "../../ble/BleContext";
import characteristics from '../../../config/characteristics.json';
import {startNotifyListener} from '../../../common/ble';
import {Chip} from "react-native-paper";
import {DisaplayElement} from "../../DisaplayElement";


export const ChargingResVolt: React.FC<{}> = props => {
  const {charger, emitter} = useContext(BleContext) as BleContextType;

  const [resVolt, setResVolt] = useState(0);

  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;

  useEffect(() => {
    startNotifyListener(charger?.id, serviceId, ids.resVolt, emitter, setResVolt);
  }, [emitter]);

  return (
    <>
      <DisaplayElement value={resVolt} label={'Response Volt'}/>
    </>
  );
};