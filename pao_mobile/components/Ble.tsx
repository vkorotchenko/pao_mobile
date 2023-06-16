import React, { useEffect, useState } from 'react'
import BleManager from 'react-native-ble-manager'
import styled from "styled-components/native"
import { convertString } from 'convert-string'

import ScreenContainer from './ScreenContainer'
import Button from './Button';
import { TextInput, Text, TouchableHighlight } from 'react-native';

const Ble = () => {
  const [discoveredPeripherals, setDiscoveredPeripherals] = useState<Array<any>>(null)
  const [connectedPeripheral, setConnectedPeripheral] = useState<object>(null)
  const [characteristics, setCharacteristics] = useState<Array<object>>(null)
  const [scanning, setScanning] = useState<boolean>(false)
  const [connecting, setConnecting] = useState<boolean>(false)
  const [retrievingServices, setRetrievingServices] = useState<boolean>(false)

  useEffect(() => {
    BleManager.start({showAlert: false})
  }, [])

  const scan = (seconds:number) => {
    setScanning(true)
    BleManager.scan([], seconds, true)
    setTimeout(() => {
      BleManager.getDiscoveredPeripherals().then((peripheralsArray) => {
        if (peripheralsArray.length > 0) {
          setDiscoveredPeripherals(peripheralsArray)
        }
      })
      setScanning(false)
    }, seconds * 1000)
  }

  const connect = (peripheral:object) => {
    setConnecting(true)
    BleManager.connect(peripheral.id).then(() => {
      setConnectedPeripheral(peripheral)
      setRetrievingServices(true)
      BleManager.retrieveServices(peripheral.id).then((peripheralInfo) => {
        setCharacteristics(peripheralInfo.characteristics)
        setRetrievingServices(false)
      })
      setConnecting(false)
    }).catch((error) => {
      console.log(error);
      setConnecting(false)
    })
  }

  const disconnect = () => {
    BleManager.disconnect(connectedPeripheral.id).then(() => {
      setConnectedPeripheral(null)
    })
  }

  const write = (data:string) => {
    const byteData = convertString.stringToBytes(data)
    BleManager.write(connectedPeripheral.id, service, characteristic, byteData)
  }

  return (
    <ScreenContainer>
      <Header>BLE scanner</Header>
      <ResultsListContainer>
        <Text>Results:</Text>
        <ResultsList>
          {discoveredPeripherals && discoveredPeripherals.map((peripheral) => (
            <TouchableHighlight key={peripheral.id} onPress={() => connect(peripheral)}>
              <Result>
                <Text>{peripheral.name ? peripheral.name : peripheral.id}</Text><Text>connect</Text>
              </Result>
            </TouchableHighlight>
          ))}
          </ResultsList>
        </ResultsListContainer>
        <ActionsContainer>
          <Button text={scanning ? "scanning ..." : "scan"} onPress={() => scan(3)} />
          {connecting &&
            <Text>connecting ...</Text>
          }
          {connectedPeripheral &&
            <>
              <Text>Connected to {connectedPeripheral.name ? connectedPeripheral.name : connectedPeripheral.id}</Text>
              {retrievingServices && <Text>Fetching Characteristics ...</Text>}
              {characteristics && 
                <>
                  <Text>Characteristics:</Text>
                  {characteristics.map((characteristic) => (
                    <Characteristic key={characteristic.characteristic}>
                      <Text>ID: {characteristic.characteristic}</Text>
                      <Text>Notifying: {characteristic.isNotifying.toString()}</Text>
                      <Text>Properties: {characteristic.properties.map((property) => (property))}</Text>
                      <Text>Service ID: {characteristic.service}</Text>
                    </Characteristic>
                  ))}
                </>
              }
              {/* <TextInput onBlur={(e) => write(e.nativeEvent.target.toString())} /> */}
              <Button text="Disconnect" onPress={disconnect}/>
            </>
          }
      </ActionsContainer>
    </ScreenContainer>
  )
}

export default Ble

const Header = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
`
const ResultsListContainer = styled.View`
  width: 100%;
  height: 50%;
  border: 1px solid black;
  padding: 10px;
  margin: 30px 0 30px 0;
`
const ResultsList = styled.ScrollView`
  height: 100%;
  width: 100%;
`
const Result = styled.View`
  width: 100%;
  height: 50px;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const ActionsContainer = styled.View`
  align-items: center;
  width: 100%;
`
const Characteristic = styled.View`
`