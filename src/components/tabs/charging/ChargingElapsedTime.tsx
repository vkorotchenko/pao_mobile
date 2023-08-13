import React, {useContext, useEffect, useState} from "react";
import {BleContext, BleContextType} from "../../ble/BleContext";
import characteristics from '../../../config/characteristics.json';
import {startNotifyListener} from '../../../common/ble';
import {DisaplayElement} from "../../DisaplayElement";
import {toTimeString} from "../../../common/util";
import {BleListeningDisplayElement} from "../../../common/BleListeningDisplayElement";


export const ChargingElapsedTime: React.FC<{}> = props => {
  const ids = characteristics.charger.charging;

  return (
    <>
      <BleListeningDisplayElement isCharger={true}
                                  serviceId={ids.serviceId}
                                  characteristicId={ids.elapsedTime}
                                  label={"Elapsed Time"}
                                  modifier={(value => toTimeString(value))}
                                  key={"elapsed_time"}/>
    </>
  );
};