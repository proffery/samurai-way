import { Input } from "components/common/input/Input.styled"
import styled, { keyframes } from "styled-components"
import { theme } from "styles/Theme.styled"

const CheckboxInput = styled(Input)`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`
const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 0 0 2em;
`
const rotate = keyframes`
  from {
    opacity: 0;
    transform: rotate(0deg);
  }
  to {
    opacity: 1;
    transform: rotate(45deg);
  }
`
const Indicator = styled.div`
  width: 1.2em;
  height: 1.2em;
  background: ${theme.color.background.primary};
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  border: 1px solid ${theme.color.text.primary};
  border-radius: 0.2em;
  ${CheckboxInput}:not(:disabled):checked & {
    background: #d1d1d1;
  }
  ${Label}:hover & {
    background: #ccc;
  }
  &::after {
    content: "";
    position: absolute;
    display: none;
  }
  ${CheckboxInput}:checked + &::after {
    display: block;
    top: -33%;
    left: 20%;
    width: 65%;
    height: 120%;
    border: solid ${theme.color.background.status_success};
    border-width: 0 0.3em 0.3em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }
  &:disabled {
    cursor: not-allowed;
  }
`

export const S = {
  CheckboxInput,
  Indicator,
  Label,
}
