import React, {useContext, useEffect, useState } from "react";
import { BleContext, BleContextType } from "../../ble/BleContext";
import characteristics from '../../../config/characteristics.json';
import { startNotifyListener } from '../../../common/ble';
import { Chip } from "react-native-paper";
import { DisaplayElement } from "../../DisaplayElement";


export const ChargingReqAmp: React.FC<{  }> = props => {
  const {charger, emitter} = useContext(BleContext) as BleContextType;

  const [reqAmp, setReqAmp] = useState(0);

  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;

  useEffect(() => {
    startNotifyListener(charger?.id, serviceId, ids.reqAmp, emitter, setReqAmp);
  }, [emitter]);

  return (
    <>
      <DisaplayElement value={reqAmp} label={'Request Amp'}/>
    </>
  );
};