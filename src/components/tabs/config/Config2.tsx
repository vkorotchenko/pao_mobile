import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigCoolFan: React.FC<{}> = props => {
  const ids = characteristics.evcu.config;

  return (
    <>
      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.config2}
                                  label={"Config 2"}
                                  modifier={(value => value.toString())}/>
    </>
  );
};