import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const InputThrottle: React.FC<{}> = props => {
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.inThrottle}
                                  label={"Input Throttle"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"in_throttle"}/>
    </>
  );
};