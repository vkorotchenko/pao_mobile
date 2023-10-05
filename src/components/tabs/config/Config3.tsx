import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const Config3: React.FC<{}> = props => {
  const ids = characteristics.evcu.config;

  return (
    <>
      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.configCoolOff}
                                  label={"Config 3"}
                                  modifier={(value => value.toString())}/>
    </>
  );
};