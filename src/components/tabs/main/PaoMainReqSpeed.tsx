import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const PaoMainReqSpeed: React.FC<{}> = props => {
  const ids = characteristics.evcu.pao;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.reqSpeed}
                                  label={"Request Speed"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"req_speed"}/>
    </>
  );
};