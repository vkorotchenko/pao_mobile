import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const StatusIsFaulted: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.status}
                                  label={"Status Is Faulted"}
                                  modifier={(value => getValueAtBit(value, 1))}
                                  key={"is_faulted"}/>
    </>
  );
};