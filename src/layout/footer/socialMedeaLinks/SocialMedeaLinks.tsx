import styled from "styled-components"
import { Icon } from "../../../components/icon/Icon"
import { Link } from "../../../components/link/Link.styled"
import { socialLinks } from "../../../data/socialLinks"
import { theme } from "../../../styles/Theme.styled"

export const SocialMedeaLinks = () => {
    return (
        <LinksContainer>
            {socialLinks.map(link => {
                return (
                    <Link key={link.id}
                        href={link.href} 
                        title={link.name} 
                        aria-label={link.name + ' link'} 
                        type="primary"
                    ><Icon iconId={link.icon_id} /></Link>
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
    @media ${theme.media.mobile} {
        gap: 15px;
    }
    ${Link} {
        @media ${theme.media.mobile} {
            svg {
                min-width: 18px;
                width: 18px;
            }
        }
    }
`