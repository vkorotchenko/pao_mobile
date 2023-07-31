import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const OutputBrakeLight: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.input_output.id;
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.outBrake}
                                  label={"Output Brake Light"}
                                  modifier={(value => value.toString())}
                                  key={"out_brake_light"}/>
    </>
  );
};