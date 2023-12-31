import styled from "styled-components"
import { Icon } from "../../../../components/micro/icon/Icon"
import { Link } from "../../../../components/micro/link/Link.styled"
import { theme } from "../../../../styles/Theme.styled"
import { SocialLinkStateType } from "../../../../redux/footerReducer"

type SocialMedeaLinksPropsType = {
    socialLinks: SocialLinkStateType[]
}

export const SocialMedeaLinks:React.FC<SocialMedeaLinksPropsType> = (props) => {
    return (
        <LinksContainer>
            {props.socialLinks.map(link => {
                return (
                    <Link key={link.id}
                        href={link.href} 
                        title={link.name} 
                        aria-label={link.name + ' link'} 
                        link_style="primary"
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