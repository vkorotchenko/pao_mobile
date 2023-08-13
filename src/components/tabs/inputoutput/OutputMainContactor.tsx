import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const OutputMainContactor: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.outMainCon}
                                  label={"Output Main Contactor"}
                                  modifier={(value => getValueAtBit(value, 2))}
                                  key={"main_contactor"}/>
    </>
  );
};