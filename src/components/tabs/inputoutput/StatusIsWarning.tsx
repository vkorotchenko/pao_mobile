import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";
import { getValueAtBit } from "../../../common/modifiers";

export const StatusIsWarning: React.FC<{}> = props => {
  const ids = characteristics.evcu.status;

  return (
    <>
      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.isWarning}
                                  label={"Status Is Warning"}
                                  modifier={(value => getValueAtBit(value, 3))}
                                  key={"is_warning"}/>
    </>
  );
};