import React, { useState } from "react";
import {FAB, Portal } from "react-native-paper";

export const FloatingIcons = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [carConnected, setCarConnected] = useState<boolean>(false);
  const [chargerConnected, setChargerConnected] = useState<boolean>(false);

  return (
    <Portal>
      <FAB.Group
        open={open}
        icon={'bluetooth-settings'}
        actions={[
          {
            icon: carConnected ? 'bluetooth' : 'bluetooth-off',
            accessibilityLabel: 'EVCU',
            onPress: () => {
              setCarConnected(!carConnected)
            }
          },
          {
            icon: chargerConnected ? 'battery-bluetooth' : 'battery',
            accessibilityLabel: 'Charger',
            onPress: () => {setChargerConnected(!chargerConnected)}
          },
        ]}
        onStateChange={({ open }: { open: boolean }) => setOpen(true)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        visible={true}
      />
    </Portal>
  );
};