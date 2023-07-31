import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const OutputPrechargeContactor: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.input_output.id;
  const ids = characteristics.evcu.input_output;

  return (
    <>
      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.outPreCon}
                                  label={"Output Precharge Contactor"}
                                  modifier={(value => value.toString())}
                                  key={"pre_contactor"}/>
    </>
  );
};