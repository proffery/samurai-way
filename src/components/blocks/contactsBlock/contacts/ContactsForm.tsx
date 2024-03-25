import { GetProfileContacts } from 'api/profileAPI'
import { useFormik } from 'formik'
import { memo } from 'react'
import { AlertType } from 'store/app/appReducer'
import { ContactsIconsType } from 'store/profile/profileReducer'
import { S } from './Contacts_Styles'

type Props = {
    contactsData: GetProfileContacts
    contactsIcons: ContactsIconsType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileContacts: (contacts: GetProfileContacts) => void
}
type FormikError = {
    facebook?: string
    twitter?: string
    instagram?: string
    youtube?: string
    github?: string
    vk?: string
    website?: string
    mainLink?: string
}
export const ContactsForm: React.FC<Props> = memo(({ contactsIcons, ...props }) => {
    const { facebook, twitter, instagram, youtube, github, vk, website, mainLink } = props.contactsData
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
            const errors: FormikError = {}
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
    return <S.Wrapper>
        <form onSubmit={formik.handleSubmit}>
            {contactsIcons.map(icon =>
                <S.Category key={icon.id}>
                    <S.ContactIcon
                        iconId={icon.icon_id}
                        viewBox={icon.viewBox}
                    />
                    <S.DescriptionEditable
                        actualValue={props.contactsData[icon.name as keyof GetProfileContacts]}
                        onSand={formik.handleSubmit}
                        {...formik.getFieldProps(icon.name)}
                    />
                </S.Category>
            )}
        </form>
    </S.Wrapper>
})