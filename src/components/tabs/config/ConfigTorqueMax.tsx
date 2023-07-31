import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigTorqueMax: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.config.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configTorqueMax}
                                  label={"Config Torque Max"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"torque_max"}/>
    </>
  );
};