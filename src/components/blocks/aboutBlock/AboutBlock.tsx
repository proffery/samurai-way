import React from "react"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { Icon } from "../../micro/icon/Icon"
import { font } from "../../../styles/Font"
import { ProfileDataType } from "../../../redux/profileReducer"
import { AuthStateType } from "../../../redux/authReducer"
import { EditableSpan } from "../../micro/editableSpan/EditableSpan"
import { useFormik } from 'formik'
import { AlertType } from '../../../redux/appReducer'
import { ChangeProfileDataType } from '../../../api/social-network-api'

type AboutBlockPropsType = {
    authData: AuthStateType
    className?: string
    profileData: ProfileDataType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileData: (key: keyof ChangeProfileDataType, value: any) => void
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
export const AboutBlock: React.FC<AboutBlockPropsType> = (props) => {
    const { facebook, twitter, instagram, youtube, github, vk, website, mainLink } = props.profileData.contacts
    const { userId } = props.profileData
    const { id: authId } = props.authData
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
            props.changeProfileData('contacts', values)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `Status must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `Status must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `Status must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `Status must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `Status must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `Status must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            if (values.facebook.length >= CONTACTS_MAX_LENGTH) {
                errors.facebook = `Status must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.facebook)
            }
            return errors
        }
    })

    return (
        <About id="about" className={props.className}>
            <BlockHeader>About</BlockHeader>
            {userId === authId ?
                <CategoryWrapper>
                    <form onSubmit={formik.handleSubmit}>
                        <ContactCategory>
                            <ContactIcon iconId="facebook" />
                            <DescriptionEditable
                                value={formik.values.facebook}
                                actualValue={facebook}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'facebook'}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="twitter" />
                            <DescriptionEditable
                                value={formik.values.twitter}
                                actualValue={twitter}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'twitter'}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="instagram" />
                            <DescriptionEditable
                                value={formik.values.instagram}
                                actualValue={instagram}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'instagram'}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="youtube" />
                            <DescriptionEditable
                                value={formik.values.youtube}
                                actualValue={youtube}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'youtube'}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="github" viewBox="-10 -10 150 150" />
                            <DescriptionEditable
                                value={formik.values.github}
                                actualValue={github}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'github'}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="vk" viewBox="-3 -3 40 40" />
                            <DescriptionEditable
                                value={formik.values.vk}
                                actualValue={vk}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'vk'}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="home" viewBox="-2 -2 24 24" />
                            <DescriptionEditable
                                value={formik.values.website}
                                actualValue={website}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'website'}
                            />
                        </ContactCategory>
                        <ContactCategory>
                            <ContactIcon iconId="linkedin" viewBox="0 2 24 24" />
                            <DescriptionEditable
                                value={formik.values.mainLink}
                                actualValue={mainLink}
                                onSand={formik.handleSubmit}
                                onChange={formik.handleChange}
                                name={'mainLink'}
                            />
                        </ContactCategory>
                    </form>
                </CategoryWrapper>
                :
                <CategoryWrapper>
                    {facebook &&
                        <ContactCategory>
                            <ContactIcon iconId="facebook" />
                            <Description>{facebook}</Description>
                        </ContactCategory>
                    }
                    {twitter &&
                        <ContactCategory>
                            <ContactIcon iconId="twitter" />
                            <Description>{twitter}</Description>
                        </ContactCategory>
                    }
                    {instagram &&
                        <ContactCategory>
                            <ContactIcon iconId="instagram" />
                            <Description>{instagram}</Description>
                        </ContactCategory>
                    }
                    {youtube &&
                        <ContactCategory>
                            <ContactIcon iconId="youtube" />
                            <Description>{youtube}</Description>
                        </ContactCategory>
                    }
                    {github &&
                        <ContactCategory>
                            <ContactIcon iconId="github" viewBox="-10 -10 150 150" />
                            <Description>{github}</Description>
                        </ContactCategory>
                    }
                    {vk &&
                        <ContactCategory>
                            <ContactIcon iconId="vk" viewBox="-3 -3 40 40" />
                            <Description>{vk}</Description>
                        </ContactCategory>
                    }
                    {website &&
                        <ContactCategory>
                            <ContactIcon iconId="home" viewBox="-2 -2 24 24" />
                            <Description>{website}</Description>
                        </ContactCategory>
                    }
                    {mainLink &&
                        <ContactCategory>
                            <ContactIcon iconId="linkedin" viewBox="0 2 24 24" />
                            <Description>{mainLink}</Description>
                        </ContactCategory>
                    }
                    {!facebook && !twitter && !instagram && !youtube && !github && !vk && !website && !mainLink &&
                        <Description>No info...</Description>
                    }
                </CategoryWrapper>

            }
        </About >
    )
}

const About = styled(BlockSection)`
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
