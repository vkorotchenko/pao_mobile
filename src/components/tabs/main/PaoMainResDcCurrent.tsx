import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const PaoMainResDcCurrent: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.pao.id;
  const ids = characteristics.evcu.pao;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.resDcCurrent}
                                  label={"Response DC Current"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"res_dc_current"}/>
    </>
  );
};