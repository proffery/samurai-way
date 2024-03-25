import { GetProfileResponseContactsType } from 'api/profileAPI'
import { memo } from 'react'
import { ContactsIconsType } from 'store/profile/profileReducer'
import { S } from './Contacts_Styles'

type Props = {
    contactsData: GetProfileResponseContactsType
    contactsIcons: ContactsIconsType
}
export const Contacts: React.FC<Props> = memo(({ contactsIcons, ...props }) => {
    const { facebook, twitter, instagram, youtube, github, vk, website, mainLink } = props.contactsData

    return <S.Wrapper>
        {contactsIcons.map(icon => props.contactsData[icon.name as keyof GetProfileResponseContactsType] &&
            <S.Category key={icon.id}>
                <S.ContactIcon
                    iconId={icon.icon_id}
                    viewBox={icon.viewBox}
                />
                <S.Description>{props.contactsData[icon.name as keyof GetProfileResponseContactsType]}</S.Description>
            </S.Category>
        )}
        {!facebook && !twitter && !instagram && !youtube && !github && !vk && !website && !mainLink &&
            <S.Description>No info...</S.Description>
        }
    </S.Wrapper>
})
