import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const Config1: React.FC<{}> = props => {
  const ids = characteristics.evcu.config;

  return (
    <>
      <BleListeningDisplayElement serviceId={ids.serviceId}
                                  characteristicId={ids.config1.characteristic}
                                  label={ids.config1.label}
                                  modifier={(value => value.toString())}/>
    </>
  );
};