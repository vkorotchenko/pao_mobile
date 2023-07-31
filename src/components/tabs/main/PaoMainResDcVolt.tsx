import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const PaoMainResDcVolt: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.pao.id;
  const ids = characteristics.evcu.pao;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.resDcVolt}
                                  label={"Response DC Voltage"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"res_dc_volt"}/>
    </>
  );
};