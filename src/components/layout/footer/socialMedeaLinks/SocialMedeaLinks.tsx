import styled from "styled-components"
import { memo } from 'react'
import { Icon } from 'components/common/icon/Icon'
import { IconLinksStateType } from 'store/app/appReducer'
import { theme } from 'styles/Theme.styled'
import { Link } from 'components/common/link/Link.styled'

type Props = {
    footerLinks: IconLinksStateType[]
}

export const SocialMedeaLinks: React.FC<Props> = memo(({ footerLinks }) => {
    return (
        <LinksContainer>
            {footerLinks.map(link => {
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