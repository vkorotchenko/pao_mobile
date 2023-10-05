import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const OutputReverseLight: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>
      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.outReverseLight}
                                  label={"Output Reverse Light"}
                                  modifier={(value => getValueAtBit(value, 5))}
                                  key={"out_reverse_light"}/>
    </>
  );
};