import { GetProfileContacts } from 'api/profileAPI'
import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { Contacts } from 'components/blocks/contactsBlock/contacts/Contacts'
import { ContactsForm } from 'components/blocks/contactsBlock/contacts/ContactsForm'
import { memo } from 'react'
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import { ProfileStateType } from 'store/profile/profileReducer'
import { S } from './Contacts_Styles'

type Props = {
    authStateData: AuthStateType
    profileStateData: ProfileStateType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileContacts: (contacts: GetProfileContacts) => void
}

export const ContactsBlock: React.FC<Props> = memo((
    { authStateData, profileStateData, addAppAlert, changeProfileContacts }) => {
    const { id: authId } = authStateData
    const { userId, contacts } = profileStateData.data
    const { contactsIcons } = profileStateData

    return <S.ContactsBlock id="contacts">
        <BlockHeader>Contacts</BlockHeader>
        {userId === authId
            ? <ContactsForm
                contactsData={contacts}
                contactsIcons={contactsIcons}
                addAppAlert={addAppAlert}
                changeProfileContacts={changeProfileContacts}
            />
            : <Contacts
                contactsData={contacts}
                contactsIcons={contactsIcons}
            />
        }
    </S.ContactsBlock >
})

