import {StyleSheet} from 'react-native';

import {Text, View} from '../../components/Themed';
import {useContext, useState} from "react";
import {BleMainContext} from "../../components/ble/BleMainContext";
import characteristics from "../../common/characteristics.json"
import {registerMonitor} from "../../common/ble";

export default function MainScreen() {
  const {device} = useContext(BleMainContext);
  const [reqSpeed, setReqSpeed] = useState(0);

  registerMonitor(device, characteristics.evcu.id, characteristics.evcu.characteristics.pao.reqSpeed, setReqSpeed);

  return (
    <View style={styles.container}>
      <Text>Main</Text>
      <Text>{reqSpeed}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});