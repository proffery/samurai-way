import { useFormik } from 'formik'
import React, { memo } from "react"
import styled from "styled-components"
import { GetProfileResponseContactsType } from '../../../api/social-network-api'
import { AlertType } from '../../../store/app/appReducer'
import { AuthStateType } from "../../../redux/auth/authReducer"
import { ContactsIconsType, ProfileStateType } from "../../../store/profile/profileReducer"
import { font } from "../../../styles/Font"
import { theme } from "../../../styles/Theme.styled"
import { BlockHeader } from "../BlockHeader.styled"
import { BlockSection } from "../BlockSection.styled"
import { EditableSpan } from "../../common/editableSpan/EditableSpan"
import { Icon } from "../../common/icon/Icon"

type ContactsBlockPropsType = {
    authStateData: AuthStateType
    className?: string
    profileStateData: ProfileStateType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileContacts: (contacts: GetProfileResponseContactsType) => void
}

export const ContactsBlock: React.FC<ContactsBlockPropsType> = memo((props) => {
    const { id: authId } = props.authStateData
    const { userId } = props.profileStateData.data

    return (
        <StyledContacts id="contacts" className={props.className}>
            <BlockHeader>Contacts</BlockHeader>
            {userId === authId ?
                <ContactsForm
                    contactsData={props.profileStateData.data.contacts}
                    contactsIcons={props.profileStateData.contactsIcons}
                    addAppAlert={props.addAppAlert}
                    changeProfileContacts={props.changeProfileContacts}
                />
                :
                <Contacts
                    contactsData={props.profileStateData.data.contacts}
                    contactsIcons={props.profileStateData.contactsIcons}
                />
            }
        </StyledContacts >
    )
})

type ContactsFormPropsType = {
    className?: string
    contactsData: GetProfileResponseContactsType
    contactsIcons: ContactsIconsType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileContacts: (contacts: GetProfileResponseContactsType) => void
}
type FormikErrorType = {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    github?: string
    vk?: string
    website?: string
    mainLink?: string
}
const ContactsForm: React.FC<ContactsFormPropsType> = memo((props) => {
    const { facebook, twitter, instagram, youtube, github, vk, website, mainLink } = props.contactsData
    const { contactsIcons } = props
    const CONTACTS_MAX_LENGTH = 40
    const formik = useFormik({
        initialValues: {
            facebook: facebook || '',
            twitter: twitter || '',
            instagram: instagram || '',
            youtube: youtube || '',
            github: github || '',
            vk: vk || '',
            website: website || '',
            mainLink: mainLink || ''
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            props.changeProfileContacts(values)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `facebook must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            if (values.twitter.length >= CONTACTS_MAX_LENGTH) {
                errors.twitter = `twitter must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.twitter)
            }
            if (values.instagram.length >= CONTACTS_MAX_LENGTH) {
                errors.instagram = `instagram must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.instagram)
            }
            if (values.youtube.length >= CONTACTS_MAX_LENGTH) {
                errors.youtube = `youtube must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.youtube)
            }
            if (values.github.length >= CONTACTS_MAX_LENGTH) {
                errors.github = `github must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.github)
            }
            if (values.vk.length >= CONTACTS_MAX_LENGTH) {
                errors.vk = `vk must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.vk)
            }
            if (values.website.length >= CONTACTS_MAX_LENGTH) {
                errors.website = `website must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.website)
            }
            if (values.mainLink.length >= CONTACTS_MAX_LENGTH) {
                errors.mainLink = `mainLink must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.mainLink)
            }
            return errors
        }
    })
    return (
        <CategoryWrapper>
            <form onSubmit={formik.handleSubmit}>
                {contactsIcons.map(icon =>
                    <ContactCategory key={icon.id}>
                        <ContactIcon
                            iconId={icon.icon_id}
                            viewBox={icon.viewBox}
                        />
                        <DescriptionEditable
                            actualValue={props.contactsData[icon.name as keyof GetProfileResponseContactsType]}
                            onSand={formik.handleSubmit}
                            {...formik.getFieldProps(icon.name)}
                        />
                    </ContactCategory>
                )}
            </form>
        </CategoryWrapper>
    )
})

type ContactsPropsType = {
    className?: string
    contactsData: GetProfileResponseContactsType
    contactsIcons: ContactsIconsType
}
const Contacts: React.FC<ContactsPropsType> = memo((props) => {
    const { facebook, twitter, instagram, youtube, github, vk, website, mainLink } = props.contactsData
    const { contactsIcons } = props
    return (
        <CategoryWrapper>
            {contactsIcons.map(icon => props.contactsData[icon.name as keyof GetProfileResponseContactsType] &&
                <ContactCategory key={icon.id}>
                    <ContactIcon
                        iconId={icon.icon_id}
                        viewBox={icon.viewBox}
                    />
                    <Description>{props.contactsData[icon.name as keyof GetProfileResponseContactsType]}</Description>
                </ContactCategory>
            )}
            {!facebook && !twitter && !instagram && !youtube && !github && !vk && !website && !mainLink &&
                <Description>No info...</Description>
            }
        </CategoryWrapper>
    )
})

const StyledContacts = styled(BlockSection)`
    width: 100%;
    display: flex;
    flex-direction: column;
    color: ${theme.color.text.primary};
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
`
const CategoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 5px;
    form {
        width: 100%;
    }
`
const ContactCategory = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: fit-content;
    gap: 5px;
    padding: 5px 0;
    &::after {
        position: absolute;
        content: '';
        width: 100%;
        height: 1px;
        background-color: ${theme.color.background.primary};
        bottom: 0%;
    }
    @media ${theme.media.mobile} {
        flex-direction: row;
        &::after {
            position: absolute;
            content: '';
            width: 0;
            height: 0;
        }
    }
`
const ContactIcon = styled(Icon)`
    width: 20%;
    min-width: 24px;
    @media ${theme.media.mobile} {
        min-width: 18px;
        width: 18px;
    }
 `
const Description = styled.span`
    display: flex;
    align-items: center;
    width: 75%;
    overflow-wrap: anywhere;
 `
const DescriptionEditable = styled(EditableSpan)`
    display: flex;
    align-items: center;
    width: 75%;
    overflow-wrap: anywhere;
 `
