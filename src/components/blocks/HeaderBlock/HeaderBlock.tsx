import { BlockSection } from 'components/blocks/BlockSection.styled'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Avatar } from 'components/common/avatar/Avatar'
import { Button } from 'components/common/button/Button'
import { EditableSpan } from 'components/common/editableSpan/EditableSpan'
import { Icon } from 'components/common/icon/Icon'
import { useFormik } from 'formik'
import { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { AlertType } from 'store/app/appReducer'
import { AuthStateType } from 'store/auth/authReducer'
import { ProfileStateType } from 'store/profile/profileReducer'
import styled from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'


type HeaderBlockPropsType = {
    className?: string
    authStateData: AuthStateType
    profileStateData: ProfileStateType
    appIsLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    changeProfileStatus: (newStatus: string) => void
    addAppAlert: (type: AlertType, message: string) => void
}

type FormikErrorType = {
    formStatus?: string
}

export const HeaderBlock: React.FC<HeaderBlockPropsType> = memo((props) => {
    const { isFollow, fullName, userId, status } = props.profileStateData.data
    const { small, large } = props.profileStateData.data.photos
    const { id: authId } = props.authStateData
    const STATUS_MAX_LENGTH = 300

    const followOnClickHandler = () => {
        isFollow ? props.unfollow(userId) : props.follow(userId)
    }

    const formik = useFormik({
        initialValues: {
            status: status
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            props.changeProfileStatus(values.status)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.status.length >= STATUS_MAX_LENGTH) {
                errors.formStatus = `Status must be less than ${STATUS_MAX_LENGTH} symbols`
                props.addAppAlert('failed', errors.formStatus)
            }
            return errors
        }
    })

    return (
        <StyledHeaderBlock id="profile-header" className={props.className}>
            <BackgroundConainer>
                {large
                    ? <BackgroundImage src={large} />
                    : <Icon iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
                <StyledAvatar avatarURL={small} />
            </BackgroundConainer>
            <InfoConainer>
                <TextContainer>
                    <Name>{fullName}</Name>
                    {authId === userId ?
                        <form onSubmit={formik.handleSubmit}>
                            <EditableSpan
                                onSand={formik.handleSubmit}
                                name={'status'}
                                emptyText={'No status...'}
                                value={formik.values.status}
                                actualValue={status}
                                onChange={formik.handleChange}
                                error={!!formik.errors.status ? 'true' : 'false'}
                            />
                        </form> :
                        <span>{status}</span>}
                </TextContainer>
                {authId !== userId ?
                    <ButtonsContainer>
                        <MessagesButton
                            to={`/messages/${userId}`}
                        ><Icon iconId={'messages'} viewBox="-2 -3 24 24" height={'50%'} width={'50%'} /></MessagesButton>
                        <Button
                            ariaLabel={'Follow/Unfollow button'}
                            variant={isFollow ? 'primary' : 'outlined'}
                            onClick={followOnClickHandler}
                            disabled={props.appIsLoading}
                        >{isFollow ? 'Unfollow' : 'Follow'}</Button>
                    </ButtonsContainer> :
                    <ButtonsContainer>
                    </ButtonsContainer>
                }
            </InfoConainer>
        </StyledHeaderBlock>
    )
})

const StyledHeaderBlock = styled(BlockSection)`
    aspect-ratio: 19 / 7;
    flex-direction: column;
    position: relative;
    padding: 0;
`
const BackgroundConainer = styled.div`
    display: flex;
    width: 100%;
    height: 70%;
    color: ${theme.color.text.placeholder};
    `
const BackgroundImage = styled.img`
    object-fit: cover;
    object-position: center;
    border-radius: 10px 10px 0 0;
    width: 100%;
    height: 100%;
`
const StyledAvatar = styled(Avatar)`
    position: absolute;
    top: 35%;
    left: 5%;
    width: 17%;
    border-radius: 50%;
`
const InfoConainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30%;
    padding: 0 5%;
`
const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: ${theme.color.text.primary};
    height: 90%;
    width: 60%;
`
const Name = styled.span`
    white-space: nowrap;
    ${font({ weight: 700, Fmin: 16, Fmax: 30 })}
    @media ${theme.media.mobile} {
        ${font({ weight: 700, Fmin: 26, Fmax: 30 })}
        position: absolute;
        top: 12%;
        right: 5%;
        text-shadow: ${theme.shadow.header};
  }
`

const ButtonsContainer = styled(FlexWrapper)`
    display: flex;
    width: 35%;
    gap: 10px;
    justify-content: end;
    max-height: 50px;
`
const MessagesButton = styled(NavLink)`
    display: flex;
    max-height: 50px;
    min-width: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 50% 50%; 
    aspect-ratio: 1 / 1;
    padding: 0;
    background-color: ${theme.color.background.second};
    color: ${theme.color.text.second};
    border-width: 1px;
    border-style: solid;
    border-color: ${theme.color.background.second};
    &:active {
            background-color: ${theme.color.background.primary};
            color: ${theme.color.text.primary};
            border-color: ${theme.color.background.second};
        }
`