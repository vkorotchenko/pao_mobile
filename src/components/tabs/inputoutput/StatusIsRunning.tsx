import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";


export const StatusIsRunning: React.FC<{}> = props => {
  const ids = characteristics.evcu.status;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.isRunning}
                                  label={"Status Is Running"}
                                  modifier={(value => getValueAtBit(value, 2))}
                                  key={"is_running"}/>
    </>
  );
};