import React from "react"
import styled, { keyframes } from "styled-components"
import { Input } from '../input/Input.styled'
type CheckboxPropsType = {
  id: string
  label: string
  onSand?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}
export const Checkbox: React.FC<CheckboxPropsType &
  React.HTMLProps<HTMLInputElement> & React.HTMLProps<HTMLLabelElement>> = ({
    id,
    label,
    name,
    disabled,
    checked,
    onChange,
    onSand,
  }) => {
    const onClickHandler = (e: React.MouseEvent<any>) => {
      onSand && onSand(e.currentTarget.value)
    }
    return (
      <Label htmlFor={id} >
        {label}
        <StyledInput
          id={id}
          type="checkbox"
          onChange={onChange}
          onClick={onClickHandler}
          name={name}
          disabled={disabled}
          checked={checked}
        />
        <Indicator />
      </Label>
    )
  }

const StyledInput = styled(Input)`
  height: 0;
  width: 0;
  opacity: 0;
  z-index: -1;
`

const Label = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0px 0px 0px 34px;
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
  background: #e6e6e6;
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
  border: 1px solid #757575;
  border-radius: 0.2em;

  ${StyledInput}:not(:disabled):checked & {
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

  ${StyledInput}:checked + &::after {
    display: block;
    top: 0.1em;
    left: 0.35em;
    width: 35%;
    height: 70%;
    border: solid #263238;
    border-width: 0 0.2em 0.2em 0;
    animation-name: ${rotate};
    animation-duration: 0.3s;
    animation-fill-mode: forwards;
  }

  &:disabled {
    cursor: not-allowed;
  }
`


