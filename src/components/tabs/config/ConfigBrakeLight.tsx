import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigBrakeLight: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.config.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configBrakeLight}
                                  label={"Config Brake Light"}
                                  modifier={(value => value.toString())}
                                  key={"config_brake_light"}/>
    </>
  );
};