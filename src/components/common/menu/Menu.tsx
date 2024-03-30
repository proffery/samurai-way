import { S } from "./Menu_Styles"
import React, { memo, MouseEvent } from "react"
import { Icon } from "components/common/icon/Icon"
import { IconsLinks } from "store/app/appReducer"

type Props = {
    type: "primary" | "secondary"
    direction: "row" | "column"
    icons?: boolean
    name: boolean
    menuItems: IconsLinks[]
}

export const Menu: React.FC<Props> = memo((props) => {
    const { direction, menuItems, name, type, icons } = props
    const onClickHandler = (e: MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <S.Menu direction={direction} type={type}>
            <ul role="menu" aria-label="Menu">
                {menuItems.map((item) => (
                    <li role="menuitem" aria-label={item.name} key={item.id}>
                        <S.Link
                            to={item.href}
                            type={type}
                            tabIndex={0}
                            onClick={onClickHandler}
                            aria-label={"Go to " + item.name}
                        >
                            {icons && (
                                <S.Wrapper>
                                    <Icon iconId={item.icon_id} height="100%" width="100%" viewBox={item.viewBox} />
                                </S.Wrapper>
                            )}
                            {name && item.name}
                        </S.Link>
                    </li>
                ))}
            </ul>
        </S.Menu>
    )
})
