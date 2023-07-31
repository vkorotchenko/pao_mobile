import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigRegenTaperLower: React.FC<{}> = props => {
  const serviceId = characteristics.evcu.config.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configRegenTaperLower}
                                  label={"Config Regen Taper Lower"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"config_regen_taper_lower"}/>
    </>
  );
};