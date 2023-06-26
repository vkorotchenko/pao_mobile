import React from "react";
import { Peripheral } from "react-native-ble-manager";
import { NativeEventEmitter } from "react-native";

export type BleChargerContextType = {
  device: Peripheral | undefined;
  emitter: NativeEventEmitter;
};
export const BleChargerContext = React.createContext<BleChargerContextType|null>(null);
