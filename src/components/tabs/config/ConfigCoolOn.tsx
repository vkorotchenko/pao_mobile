import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigCoolOn: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.config.id;
  const ids = characteristics.evcu.config;

  return (
    <>
      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configCoolOn}
                                  label={"Config Cool On"}
                                  modifier={(value => value.toString())}
                                  key={"config_cool_on"}/>
    </>
  );
};