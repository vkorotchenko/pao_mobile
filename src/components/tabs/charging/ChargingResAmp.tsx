import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ChargingResAmp: React.FC<{}> = props => {
  const serviceId = characteristics.charger.id;
  const ids = characteristics.charger.charging;

  return (
    <>

      <BleListeningDisplayElement isCharger={true}
                                  serviceId={serviceId}
                                  characteristicId={ids.resAmp}
                                  label={"Response Amp"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"res_amp"}/>
    </>
  );
};