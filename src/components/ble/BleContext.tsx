import * as React from 'react';
import {NativeEventEmitter} from 'react-native';
import {Peripheral} from 'react-native-ble-manager';

export type BleContextType = {
  emitter: NativeEventEmitter;
  evcu: Peripheral;
  charger: Peripheral;
};
export const BleContext = React.createContext<BleContextType | null>(null);
