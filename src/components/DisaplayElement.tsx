import React from "react";
import { Chip } from "react-native-paper";


export interface DisaplayElementProps {
  readonly label: String;
  readonly value: any;
  readonly handleOnPress?: ()=>{};

}


export const DisaplayElement: React.FC<DisaplayElementProps> = ({label, value, handleOnPress}) => {
  return (
    <>
      <Chip mode="outlined" onPress={handleOnPress}>
        {label}: {value}
      </Chip>
    </>
  );
};