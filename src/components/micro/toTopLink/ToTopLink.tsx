import { useEffect, useState } from "react"
import { Icon } from "../icon/Icon"
import styled from "styled-components"
import { Link } from "../link/Link.styled"

type ToTopLinkPropsType = {
    top_block_anchor_id: string
}

export const ToTopLink: React.FC<ToTopLinkPropsType> = (props) => {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const main = document.querySelector('main')
        const onScroll = () => {
            if (main && main.scrollTop > 50) {
                setScrolled(true)
            }
            else {
                setScrolled(false)
            }
        }
        main && main.addEventListener('scroll', onScroll)
        return () => {main && main.removeEventListener('scroll', onScroll)}
    }, [])
    
    return (
        scrolled ? 
            <StyledToTopLink 
                link_style="buttonPrimary" 
                href={"#" + props.top_block_anchor_id} 
                title="Go to top"
            ><Icon iconId="leftArrow" viewBox="-1 9 14 14"/>
            </StyledToTopLink> : 
        null
    )
}

const StyledToTopLink = styled(Link)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 30px;
    top: 95%;
    left: 95%;
    padding: 5px;
    border-radius: 50%;
    transform: translate(-95%, -95%) rotate(90deg);
    z-index: 99999;
`