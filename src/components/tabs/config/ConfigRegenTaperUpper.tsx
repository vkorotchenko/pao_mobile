import React from "react";
import characteristics from '../../../config/characteristics.json';
import {getDecimalDisplayValue} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ConfigRegenTaperUpper: React.FC<{}> = props => {
  const serviceId = characteristics.charger.id;
  const ids = characteristics.evcu.config;

  return (
    <>

      <BleListeningDisplayElement serviceId={serviceId}
                                  characteristicId={ids.configRegenTaperUpper}
                                  label={"Config Regen Taper Upper"}
                                  modifier={(value => getDecimalDisplayValue(value, 1))}
                                  key={"config_regen_taper_upper"}/>
    </>
  );
};