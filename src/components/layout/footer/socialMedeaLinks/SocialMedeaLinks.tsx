import styled from "styled-components"
import { Icon } from "../../../common/icon/Icon"
import { Link } from "../../../common/link/Link.styled"
import { theme } from "../../../../styles/Theme.styled"
import { IconLinksStateType } from "../../../../store/app/appReducer"
import { memo } from 'react'

type SocialMedeaLinksPropsType = {
    footerLinks: IconLinksStateType[]
}

export const SocialMedeaLinks: React.FC<SocialMedeaLinksPropsType> = memo((props) => {
    return (
        <LinksContainer>
            {props.footerLinks.map(link => {
                return (
                    <Link key={link.id}
                        href={link.href}
                        title={link.name}
                        aria-label={link.name + ' link'}
                        variant="primary"
                    ><Icon iconId={link.icon_id} /></Link>
                )
            })}
        </LinksContainer>
    )
})

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