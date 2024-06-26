import { GetProfileContacts } from "api/profileAPI"
import { memo } from "react"
import { IconsType } from "store/profile/profileReducer"
import { S } from "./Contacts_Styles"

type Props = {
    contactsData: GetProfileContacts
    contactsIcons: IconsType
}
export const Contacts: React.FC<Props> = memo(({ contactsIcons, ...props }) => {
    const { facebook, twitter, instagram, youtube, github, vk, website, mainLink } = props.contactsData

    return (
        <S.Wrapper>
            {contactsIcons.map(
                (icon) =>
                    props.contactsData[icon.name as keyof GetProfileContacts] && (
                        <S.Category key={icon.id}>
                            <S.ContactIcon iconId={icon.icon_id} viewBox={icon.viewBox} />
                            <S.Description>{props.contactsData[icon.name as keyof GetProfileContacts]}</S.Description>
                        </S.Category>
                    ),
            )}
            {!facebook && !twitter && !instagram && !youtube && !github && !vk && !website && !mainLink && (
                <S.Description>No info...</S.Description>
            )}
        </S.Wrapper>
    )
})
