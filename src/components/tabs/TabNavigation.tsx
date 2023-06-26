import * as React from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  Easing,
} from 'react-native';
import {Appbar, Snackbar, BottomNavigation, Menu, useTheme} from 'react-native-paper';
import {RoutesState} from '../../types/tabs';
import tabs from "../../config/tabs.json"
import PaoMainScreen from "./PaoMainScreen"
import ChargingScreen from "./ChargingScreen"
import InputOutputScreen from "./InputOutputScreen"
import ConfigScreen from "./ConfigScreen"

const Page = () => {
  return (

    <Snackbar
      visible={true}
      onDismiss={() =>{}}
      action={{
        label: 'Undo',
        onPress: () => {
          // Do something
        },
      }}
      duration={Snackbar.DURATION_MEDIUM}
    >
      Hey there! I&apos;m a Snackbar.
    </Snackbar>
  )
}

const TabNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const routes =tabs.navigation;

  return (
      <BottomNavigation
        navigationState={{index, routes}}
        onIndexChange={setIndex}
        labelMaxFontSizeMultiplier={2}
        renderScene={BottomNavigation.SceneMap({
          pao: () => <Page/>,
          charging: () => <Page/>,
          inputOutput: () => <Page/>,
          config: () => <Page/>,
        })}
        sceneAnimationEnabled={true}
        sceneAnimationType={'shifting'}
        sceneAnimationEasing={Easing.ease}
      />
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        // there is no 'grid' type in RN :(
        display: 'grid' as 'none',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gridRowGap: '8px',
        gridColumnGap: '8px',
        padding: 8,
      },
      item: {
        width: '100%',
        height: 150,
      },
    },
    default: {
      content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
      },
      item: {
        height: Dimensions.get('window').width / 2,
        width: '50%',
        padding: 4,
      },
    },
  }),
});
