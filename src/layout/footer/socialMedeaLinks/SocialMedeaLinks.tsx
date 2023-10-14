import styled from "styled-components"
import { Icon } from "../../../components/icon/Icon"
import { Link } from "../../../components/link/Link.styled"
import { socialLinks } from "../../../data/socialLinks"

export const SocialMedeaLinks = () => {
    return (
        <LinksContainer>
            {socialLinks.map(link => {
                return (
                    <Link key={link.id}
                        href={link.item_href} 
                        title={link.item_name} 
                        aria-label={link.item_name + ' link'} 
                        type="primary"
                    ><Icon iconId={link.item_icon} /></Link>
                )
            })}
        </LinksContainer>
    )
}

const LinksContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    flex-wrap: wrap;
    gap: 24px;
`