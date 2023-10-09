import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const OutputCoolingFan: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.outCooling}
                                  label={"Output Cooling Fan"}
                                  modifier={(value => getValueAtBit(value, 4))}
                                  key={"out_cooling_fan"}/>
    </>
  );
};