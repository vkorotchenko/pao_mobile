import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const OutputCoolingFan: React.FC<{}> = props => {
  const serviceId = characteristics.charger.id;
  const ids = characteristics.evcu.input_output;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.outCooling}
                                  label={"Output Cooling Fan"}
                                  modifier={(value => value.toString())}
                                  key={"out_cooling_fan"}/>
    </>
  );
};