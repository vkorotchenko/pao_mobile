import * as React from 'react';
import {NativeEventEmitter} from 'react-native';

export type BleContextType = {
  emitter: NativeEventEmitter;
};
export const BleContext = React.createContext<BleContextType | null>(null);
