import { About } from 'components/blocks/aboutBlock/about/About'
import { AboutForm } from 'components/blocks/aboutBlock/about/AboutForm'
import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { memo } from 'react'
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import { ChangeAboutProfileType, ProfileDataType } from 'store/profile/profileReducer'
import { S } from './AboutBlock_Styles'

type Props = {
    className?:string
    profileData: ProfileDataType
    authStateData: AuthStateType
    addAppAlert: (type: AlertType, message: string) => void
    changeProfileAbout: (about: ChangeAboutProfileType) => void
}

export const AboutBlock: React.FC<Props> = memo(({ className, profileData, authStateData, addAppAlert, changeProfileAbout }) => {
    const { id: authId } = authStateData
    const { userId } = profileData

    return (
        <S.AboutBlock id="contacts" className={className}>
            <BlockHeader>About</BlockHeader>
            {userId === authId ?
                <AboutForm
                    profileData={profileData}
                    addAppAlert={addAppAlert}
                    changeProfileAbout={changeProfileAbout}
                /> : <About profileData={profileData} />
            }
        </S.AboutBlock >
    )
})



