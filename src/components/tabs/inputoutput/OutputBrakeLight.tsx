import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const OutputBrakeLight: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.outBrake}
                                  label={"Output Brake Light"}
                                  modifier={(value => getValueAtBit(value, 3))}
                                  key={"out_brake_light"}/>
    </>
  );
};