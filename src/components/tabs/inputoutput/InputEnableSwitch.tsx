import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const InputEnableSwitch: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.inEnable}
                                  label={"Input Enable Switch"}
                                  modifier={(value => getValueAtBit(value,1))}
                                  key={"in_enable_switch"}/>
    </>
  );
};