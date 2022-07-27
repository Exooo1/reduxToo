import styled from 'styled-components'
import {FlexDiv} from '../Common/StyleCommon';

export const AppStyle = styled(FlexDiv)`
  margin: 0 auto;
  flex-direction: column;
`
export const InputFile = styled.input`
  width: 200px;
  height: 300px;
`
export const ButtonTest = styled.button`
  width: 100px;
  height: 50px;
  :hover{
    transform: translate(-150px);
    transition: 2s;
    background: aqua;
  }
`