import React from "react"
import styled from "styled-components/native"

interface Props {
  text: string
  onPress: () => void
}

const Button = ({ ...props }: Props) => {
  return (
    <CustomButton onPress={props.onPress}>
      <ButtonText>{props.text}</ButtonText>
    </CustomButton>
  )
}

export default Button

const CustomButton = styled.TouchableHighlight`
  min-width: 40%;
  height: 50px;
  background: #333333;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`
const ButtonText = styled.Text`
  color: white;
  font-size: 18px;
`
