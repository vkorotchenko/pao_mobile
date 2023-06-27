import * as React from 'react';
import {useState} from 'react';
import {FAB, Portal} from 'react-native-paper';

export interface FloatingIconsProps {
  readonly isMainConnected: boolean;
  readonly isChargerConnected: boolean;
  readonly isScanning: boolean;
}
export const FloatingIcons: React.FC<FloatingIconsProps> = ({
  isMainConnected,
  isChargerConnected,
  isScanning,
}) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={isScanning ? 'refresh' : 'bluetooth-settings'}
        actions={[
          {
            icon: isMainConnected ? 'bluetooth' : 'bluetooth-off',
            accessibilityLabel: 'EVCU',
            onPress: () => {
              // disconnect? refresh?
            },
          },
          {
            icon: isChargerConnected ? 'battery-bluetooth' : 'battery',
            accessibilityLabel: 'Charger',
            onPress: () => {
              //  disconnect? refresh?
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
};
