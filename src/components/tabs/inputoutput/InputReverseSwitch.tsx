import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const InputReverseSwitch: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.input}
                                  label={"Input Reverse Switch"}
                                  modifier={(value => getValueAtBit(value, 2))}
                                  key={"in_revers_switch"}/>
    </>
  );
};