import iconsSprite from '../../../assets/images/icons-sprite.svg'


export type IconPropsType = {
    className?: string
    iconId: string
    viewBox?: string
    width?: string
    height?: string
}

export const Icon = (props: IconPropsType) => {
    return (
        <svg className={props.className}
            xmlns="http://www.w3.org/2000/svg"
            viewBox={props.viewBox || "0 0 24 24"}
            width={props.width || "24px"}
            height={props.height || "24px"}
        >
            <use xlinkHref={`${iconsSprite}#${props.iconId}`} href={`${iconsSprite}#${props.iconId}`} />
        </svg>
    )
}