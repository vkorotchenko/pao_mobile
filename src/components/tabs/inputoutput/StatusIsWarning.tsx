import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const StatusIsWarning: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.status.id;
  const ids = characteristics.evcu.status;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.isWarning}
                                  label={"Status Is Warning"}
                                  modifier={(value => value.toString())}
                                  key={"is_warning"}/>
    </>
  );
};