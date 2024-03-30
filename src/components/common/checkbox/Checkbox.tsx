import React, { memo } from "react"
import { S } from "./Checkbox_Styles"

type Props = {
  id: string
  label: string
  onSand?: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
  onChange?: (e?: React.ChangeEvent<any>) => void
}
export const Checkbox: React.FC<Props & React.HTMLProps<HTMLInputElement> & React.HTMLProps<HTMLLabelElement>> = memo(
  (props) => {
    const { id, label, name, disabled, checked, onChange, onSand } = props
    const onClickHandler = (e: React.MouseEvent<any>) => {
      onSand && onSand(e.currentTarget.value)
    }

    return (
      <S.Label htmlFor={id}>
        {label}
        <S.CheckboxInput
          id={id}
          type="checkbox"
          onChange={onChange}
          onClick={onClickHandler}
          name={name}
          disabled={disabled}
          checked={checked}
        />
        <S.Indicator />
      </S.Label>
    )
  },
)
