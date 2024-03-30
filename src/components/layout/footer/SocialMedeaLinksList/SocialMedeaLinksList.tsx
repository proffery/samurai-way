import { Icon } from "components/common/icon/Icon"
import { Link } from "components/common/link/Link.styled"
import { memo } from "react"
import { IconsLinks } from "store/app/appReducer"
import { S } from "../Footer_Styles"

type Props = {
  footerLinks: IconsLinks[]
}

export const SocialMedeaLinksList: React.FC<Props> = memo(({ footerLinks }) => {
  return (
    <S.List>
      {footerLinks.map((link) => {
        return (
          <Link key={link.id} href={link.href} title={link.name} aria-label={link.name + " link"} variant="primary">
            <Icon iconId={link.icon_id} />
          </Link>
        )
      })}
    </S.List>
  )
})
