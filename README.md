# expo-BLE-boilerplate

This repo is designed to be a quick start to help you connect your React Native Expo app with a Bluetooth device via BLE

Built with Typescript, React hooks, and Expo.

instructions:
clone repo
in root dir, run `yarn`
make sure you have the latest expo-cli (to install, run `yarn global add expo-cli`)
run `expo eject`, choose expoKit option
name your bundle identifier for ios and package name for android (usually in tld.domain.appname format)

running on ios:
run `react-native link react-native-ble-manager`
`cd ios`
run `pod install`
open .xcworkspace file in Xcode
select your workspace in the project navigator
General tab, Signing, Team, choose a team from the list
you should now be able to tun the app via xcode, using either a connected device or a simulator

android:
todo - android instructions