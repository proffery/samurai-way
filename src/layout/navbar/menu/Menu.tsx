import styled from "styled-components"
import { Icon } from "../../../components/icon/Icon"
import { Link } from "../../../components/link/Link.styled"
import { menuItems } from "../../../data/menuItems"

export const Menu = () => {
    return (
        <StyledMenu>
            <ul role="menu" aria-label="menu">
                {menuItems.map(item => {
                    return(
                        <li role="menuitem" key={item.id}>
                            <Link type={'secondary'} href={item.item_href}>
                                <Icon iconId={item.item_icon} viewBox={item.viewBox}/>
                                {item.item_name}
                            </Link>
                        </li>
                    )
                })}
            </ul>
        </StyledMenu>
    )
}

const StyledMenu = styled.nav`
    ul {
        display: flex;
        flex-direction: column;
        list-style-type: none;
        gap: 32px;
        li {
            display: flex;
            align-items: center;
            justify-content: flex-start;
        }
    }
`