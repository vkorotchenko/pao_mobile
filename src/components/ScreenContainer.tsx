import React from "react"
import styled from "styled-components/native"

interface Props {
  background?: string
}

const ScreenContainer: React.FC<Props> = ({ background="#FFFFFF", children }) => {
  return (
    <StyledContainer background={background}>
      {children}
    </StyledContainer>
  )
}

export default ScreenContainer

const StyledContainer = styled.View<{ background: string }>`
  height: 100%;
  width: 100%;
  padding: 50px 20px 20px 20px;
  background-color: ${p => p.background};
`