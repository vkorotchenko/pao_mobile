import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigSpeedSlewRate: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.config.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configSpeedSlewRate}
                                  label={"Config Speed Slew Rate"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"speed_slew_rate"}/>
    </>
  );
};