import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigTorqueSlewRate: React.FC<{}> = props => {
  const serviceId = characteristics.charger.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configTorqueSlewRate}
                                  label={"Config Torque Slew Rate"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"torque_slew_rate"}/>
    </>
  );
};