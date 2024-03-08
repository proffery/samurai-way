import React from "react"
import styled, { keyframes } from "styled-components"
import { Input } from '../input/Input.styled'
import { theme } from '../../../styles/Theme.styled'
type CheckboxPropsType = {
  id: string
  label: string
  onSand?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  onChange?: (e?: React.ChangeEvent<any>) => void
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
  padding: 0px 0px 0px 2em;
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


