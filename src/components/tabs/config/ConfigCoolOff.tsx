import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigCoolOff: React.FC<{}> = props => {
  const serviceId = characteristics.charger.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configCoolOff}
                                  label={"Config Cool Off"}
                                  modifier={(value => value.toString())}
                                  key={"config_config_off"}/>
    </>
  );
};