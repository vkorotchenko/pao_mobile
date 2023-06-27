import * as React from 'react';

import {Caption, List, Text, Chip, Divider} from 'react-native-paper';

export interface ListItemProps {
  readonly icon?: string;
  readonly mainText: string;
  readonly secondaryText: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  mainText,
  secondaryText,
}) => {
  return (
    <List.Item
      left={props => (icon ? <List.Icon {...props} icon={icon} /> : null)}
      title={mainText}
      description={secondaryText}
    />
  );
};
