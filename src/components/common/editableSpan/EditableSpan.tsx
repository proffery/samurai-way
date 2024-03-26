import React, { memo, useEffect, useState } from 'react'
import { S } from './EditableSpan_Styles'

type Props = {
    name?: string
    value: string
    className?: string
    actualValue: string
    emptyText?: string
    error?: 'true' | 'false'
    onChange: (e: React.ChangeEvent<any>) => void
    onSand: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const EditableSpan: React.FC<Props> = memo((props) => {
    const { value, error, actualValue, emptyText, name, onChange, onSand } = props
    const [editMode, setEditMode] = useState(false)
    const [localValue, setLocalValue] = useState(value)

    useEffect(() => {
        if (actualValue !== value) {
            setLocalValue(actualValue)
        } else setLocalValue(value)

        if (error === 'true') {
            setLocalValue(actualValue)
        }
    }, [value, error, actualValue])

    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewModeonBlur = (e: React.ChangeEvent<any>) => {
        setEditMode(false)
        error !== 'true' && actualValue !== value && onSand(e.currentTarget.value)
    }
    const activateViewModeonEnter = (e: React.KeyboardEvent<any>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            error !== 'true' && actualValue !== value && onSand(e.currentTarget.value)
        }
    }

    return editMode ? <S.EditableInput
        value={value}
        bordered={'false'}
        onChange={onChange}
        autoFocus
        onBlur={activateViewModeonBlur}
        onKeyPress={activateViewModeonEnter}
        error={error}
        name={name}
        className={props.className}
    /> : <S.EditableSpan
        className={props.className}
        onClick={activateEditMode}>{localValue || emptyText}
    </S.EditableSpan>
})
