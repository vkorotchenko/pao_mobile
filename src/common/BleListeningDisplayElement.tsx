import React, {useContext, useEffect, useState, useDeferredValue} from "react";
import characteristics from './../config/characteristics.json';
import {startNotifyListener} from './../common/ble';
import {Chip} from "react-native-paper";
import {DisaplayElement} from "../components/DisaplayElement";
import {getDecimalDisplayValue} from "./../common/util";
import {BleContext, BleContextType} from "../components/ble/BleContext";


export interface BleListeningDisplayElementProps {
  readonly serviceId: string;
  readonly characteristicId: string;
  readonly label: string;
  readonly isCharger?: boolean;
  readonly modifier?: (value: number) => string;
}

export const BleListeningDisplayElement: React.FC<BleListeningDisplayElementProps> =
  ({
     serviceId,
     characteristicId,
     label,
     modifier,
     isCharger = false
   }) => {
    const {evcu, charger, emitter} = useContext(BleContext) as BleContextType;

    const [value, setValue] = useState(0);
    // const deferedValue = useDeferredValue(value); TODO optimize with derfered value
    const peripheralId = isCharger ? charger?.id : evcu?.id;

    useEffect(() => {
      startNotifyListener(peripheralId, serviceId, characteristicId, emitter, setValue);
    }, [emitter]);

    return (
      <>
        <DisaplayElement value={modifier ? modifier(value) : value.toString()} label={label}/>
      </>
    );
  };