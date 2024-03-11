import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { Checkbox } from 'components/common/checkbox/Checkbox'
import { EditableSpan } from 'components/common/editableSpan/EditableSpan'
import { Icon } from 'components/common/icon/Icon'
import { useFormik } from 'formik'
import { memo } from 'react'
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import { ProfileDataType, AboutProfileType } from 'store/profile/profileReducer'
import styled from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'


type AboutMeBlockPropsType = {
    className?: string
    profileData: ProfileDataType
    authStateData: AuthStateType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileAbout: (about: AboutProfileType) => void
}

export const AboutMeBlock: React.FC<AboutMeBlockPropsType> = memo((props) => {
    const { id: authId } = props.authStateData
    const { userId } = props.profileData

    return (
        <StyledAbout id="contacts" className={props.className}>
            <BlockHeader>About</BlockHeader>
            {userId === authId ?
                <AboutForm
                    profileData={props.profileData}
                    addAppAlert={props.addAppAlert}
                    changeProfileAbout={props.changeProfileAbout}
                />
                :
                <About profileData={props.profileData} />
            }
        </StyledAbout >
    )
})

type AboutFormPropsType = {
    className?: string
    profileData: ProfileDataType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileAbout: (about: AboutProfileType) => void
}

type FormikErrorType = {
    aboutMe?: string
    lookingForAJob?: boolean
    lookingForAJobDescription?: string
    fullName?: string
}

const AboutForm: React.FC<AboutFormPropsType> = memo((props) => {
    const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription } = props.profileData
    const CONTACTS_MAX_LENGTH = 40
    const formik = useFormik({
        initialValues: {
            fullName: fullName,
            aboutMe: aboutMe,
            lookingForAJob: lookingForAJob,
            lookingForAJobDescription: lookingForAJobDescription
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            props.changeProfileAbout(values)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.fullName.length >= CONTACTS_MAX_LENGTH) {
                errors.fullName = `FullName must be less than ${CONTACTS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.fullName)
            }
            return errors
        }
    })
    return (
        <CategoryWrapper>
            <form onSubmit={formik.handleSubmit}>
                <ContactCategory>
                    <ContactIcon
                        iconId={'profile'}
                        viewBox='-4 -4 22 22'
                    />
                    <DescriptionEditable
                        actualValue={fullName}
                        onSand={formik.handleSubmit}
                        {...formik.getFieldProps('fullName')}
                    />
                </ContactCategory>
                <ContactCategory>
                    <ContactIcon
                        iconId={'info'}
                    />
                    <DescriptionEditable
                        actualValue={aboutMe}
                        onSand={formik.handleSubmit}
                        {...formik.getFieldProps('aboutMe')}
                    />
                </ContactCategory>
                <ContactCategory>
                    <Checkbox label='Looking job'
                        id='lookingForAJob'
                        onSand={formik.handleSubmit}
                        checked={lookingForAJob}
                        {...formik.getFieldProps('lookingForAJob')}
                    />
                </ContactCategory>
                {lookingForAJob &&
                    <ContactCategory>
                        <ContactIcon
                            iconId={'info'}
                        />
                        <DescriptionEditable
                            actualValue={lookingForAJobDescription}
                            onSand={formik.handleSubmit}
                            {...formik.getFieldProps('lookingForAJobDescription')}
                        />
                    </ContactCategory>
                }
            </form>
        </CategoryWrapper>
    )
})

type AboutPropsType = {
    className?: string
    profileData: ProfileDataType
}
const About: React.FC<AboutPropsType> = memo((props) => {
    const { fullName, aboutMe, lookingForAJob, lookingForAJobDescription } = props.profileData
    return (
        <CategoryWrapper>
            {fullName &&
                <ContactCategory>
                    <ContactIcon
                        iconId={'profile'}
                        viewBox='-4 -4 22 22'
                    />
                    <Description>{fullName}</Description>
                </ContactCategory>
            }
            {aboutMe &&
                <ContactCategory>
                    <ContactIcon
                        iconId={'info'}
                    />
                    <Description>{aboutMe}</Description>
                </ContactCategory>
            }
            {lookingForAJob &&
                <ContactCategory>
                    <Checkbox label='Looking job'
                        id='lookingForAJob'
                        checked={lookingForAJob}
                        onChange={() => { }}
                        readOnly
                    />
                </ContactCategory>
            }
            {lookingForAJob &&
                <ContactCategory>
                    <ContactIcon
                        iconId={'info'}
                    />
                    <Description>{lookingForAJobDescription}</Description>
                </ContactCategory>
            }
            {!fullName && !lookingForAJobDescription && !lookingForAJob && aboutMe &&
                <Description>No info...</Description>
            }
        </CategoryWrapper >
    )
})

const StyledAbout = styled(BlockSection)`
    width: 100%;
    height: 100%;
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
