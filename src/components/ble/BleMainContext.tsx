import React from "react";
import { Peripheral } from "react-native-ble-manager";
import { NativeEventEmitter } from "react-native";

export type BleMainContextType = {
  device: Peripheral | undefined;
  emitter: NativeEventEmitter;
};
export const BleMainContext = React.createContext<BleMainContextType|null>(null);
