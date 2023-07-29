import React, {useContext, useEffect, useState } from "react";
import { BleContext, BleContextType } from "../../ble/BleContext";
import characteristics from '../../../config/characteristics.json';
import { startNotifyListener } from '../../../common/ble';
import { Chip } from "react-native-paper";
import { DisaplayElement } from "../../DisaplayElement";
import { getDecimalDisplayValue } from "../../../common/util";


export const ChargingResAmp: React.FC<{  }> = props => {
  const {charger, emitter} = useContext(BleContext) as BleContextType;

  const [resAmp, setResAmp] = useState(0);

  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;

  useEffect(() => {
    startNotifyListener(charger?.id, serviceId, ids.resAmp, emitter, setResAmp);
  }, [emitter]);

  return (
    <>
      <DisaplayElement value={getDecimalDisplayValue(resAmp, 1)} label={'Response Amp'}/>
    </>
  );
};