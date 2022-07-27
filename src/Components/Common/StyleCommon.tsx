import styled from 'styled-components'

type FlexDivType = {
    back: string
    width: string
    height: string
}

export const FlexDiv = styled.div<FlexDivType>`
  width: ${props => props.width};
  height: ${props => props.height};
  background: ${props => props.back};
  display: flex;
  justify-content: center;
  align-items: center;
`
