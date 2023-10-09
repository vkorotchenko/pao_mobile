import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const OutputPrechargeContactor: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>
      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.outPreCon}
                                  label={"Output Precharge Contactor"}
                                  modifier={(value => getValueAtBit(value, 1))}
                                  key={"pre_contactor"}/>
    </>
  );
};