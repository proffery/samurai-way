import React, { memo, useEffect, useState } from 'react'
import { Input } from '../input/Input.styled'
import styled from 'styled-components'
import { theme } from '../../../styles/Theme.styled'

type EditableSpanPropsType = {
    className?: string
    value: string
    actualValue: string
    emptyText?: string
    name?: string
    error?: 'true' | 'false'
    onChange: (e: React.ChangeEvent<any>) => void
    onSand: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = memo((props) => {
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

    return editMode
        ? <StyledInput
            value={value}
            bordered={'false'}
            onChange={onChange}
            autoFocus
            onBlur={activateViewModeonBlur}
            onKeyPress={activateViewModeonEnter}
            error={error}
            name={name}
            className={props.className}
        />
        : <StyledSpan className={props.className} onClick={activateEditMode}>{localValue || emptyText}</StyledSpan>
})

const StyledInput = styled(Input)`
    width: 100%;
    color: ${theme.color.background.second};
    font-size: inherit;
    font-weight: inherit;
    border-radius: 0;
    padding: min(10px, 1vw) 0;
`

const StyledSpan = styled.p`
    display: flex;
    width: 100%;
    font-size: inherit;
    font-weight: inherit;
    padding: min(10px, 1vw) 0;
`