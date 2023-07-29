import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigSpeedMax: React.FC<{}> = props => {
  const serviceId = characteristics.charger.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configSpeedMax}
                                  label={"Config Speed Max"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"is_running"}/>
    </>
  );
};