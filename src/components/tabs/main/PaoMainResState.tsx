import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const PaoMainResState: React.FC<{}> = props => {
  const ids = characteristics.evcu.pao;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.resState}
                                  label={"Response State"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"res_state"}/>
    </>
  );
};