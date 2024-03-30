import { MouseEvent, memo } from "react"
import { S } from "./Button_Styles"
type ButtonPropsType = {
    ariaLabel: string
    className?: string
    isActive?: boolean
    disabled?: boolean
    variant: "primary" | "outlined" | "link"
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.FC<ButtonPropsType & React.HTMLProps<HTMLButtonElement>> = memo((props) => {
    const { ariaLabel, variant, className, isActive, disabled, children, onClick } = props
    const onClickButtonHandler = (e: MouseEvent<HTMLButtonElement>) => {
        onClick && onClick(e)
    }

    return (
        <S.Button
            variant={variant}
            onClick={onClickButtonHandler}
            className={className}
            active={isActive?.toString() || "false"}
            disabled={disabled || false}
            aria-label={ariaLabel}
        >
            {children}
        </S.Button>
    )
})
