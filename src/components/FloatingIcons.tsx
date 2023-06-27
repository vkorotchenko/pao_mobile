import * as React from 'react';
import {useState} from 'react';
import {FAB, Portal} from 'react-native-paper';
import {SetIsScanning, startScan } from '../common/ble';

export interface FloatingIconsProps {
  readonly isMainConnected: ()=> boolean;
  readonly isChargerConnected: () =>boolean;
  readonly isScanning: boolean;
  readonly setIsScanning: SetIsScanning;
}
export const FloatingIcons: React.FC<FloatingIconsProps> = ({
  isMainConnected,
  isChargerConnected,
  isScanning,
  setIsScanning
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={isScanning ? 'refresh' : 'bluetooth-settings'}
        actions={[
          {
            icon: isMainConnected() ? 'bluetooth' : 'bluetooth-off',
            accessibilityLabel: 'EVCU',
            onPress: () => {
              startScan(isScanning, setIsScanning);
            },
          },
          {
            icon: isChargerConnected() ? 'battery-bluetooth' : 'battery',
            accessibilityLabel: 'Charger',
            onPress: () => {
              startScan(isScanning, setIsScanning);
            },
          },
        ]}
        onStateChange={({open}: {open: boolean}) => setOpen(open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        visible={true}
        style={{paddingBottom: 90}}
      />
    </Portal>
  );
};//