import React, { memo } from "react"
import styled from "styled-components"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"
import { theme } from "../../../styles/Theme.styled"
import { font } from "../../../styles/Font"
import { NavLink } from "react-router-dom"
import { BlockSection } from "../../micro/BlockSection.styled"
import { ProfileStateType } from "../../../redux/profileReducer"
import { AuthStateType } from "../../../redux/authReducer"
import { EditableSpan } from "../../micro/editableSpan/EditableSpan"
import { useFormik } from "formik"
import { AlertType } from "../../../redux/appReducer"

type HeaderBlockPropsType = {
    className?: string
    authData: AuthStateType
    profileData: ProfileStateType
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
    const { isFollow, fullName, userId, status } = props.profileData.data
    const { small, large } = props.profileData.data.photos
    const { id: authId } = props.authData
    console.log('from props: ' + status)

    const followOnClickHandler = () => {
        isFollow ? props.unfollow(userId) : props.follow(userId)
    }

    const formik = useFormik({
        initialValues: {
            formStatus: status
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            props.changeProfileStatus(values.formStatus)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.formStatus.length >= 299) {
                errors.formStatus = 'Status must be less than 300 symbols'
                props.addAppAlert('failed', errors.formStatus)
            }
            return errors
        }

    })
    console.log('from formik: ' + formik.initialValues.formStatus)

    return (
        <StyledHeaderBlock id="profile-header" className={props.className}>
            <BackgroundConainer>
                {large
                    ? <BackgroundImage src={large} />
                    : <Icon iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
                {small
                    ? <AvatarImage src={small} />
                    : <DefaultAvatar iconId={'avatarDefault'} viewBox="0 0 1024 1024" height={'100%'} width={'100%'} />}
            </BackgroundConainer>
            <InfoConainer>
                <TextContainer>
                    <Name>{fullName}</Name>
                    {authId === userId ?
                        <form onSubmit={formik.handleSubmit}>
                            <EditableSpan
                                onSand={formik.handleSubmit}
                                name={'formStatus'}
                                emptyText={'No status...'}
                                value={formik.values.formStatus}
                                actualValue={status}
                                onChange={formik.handleChange}
                                error={!!formik.errors.formStatus ? 'true' : 'false'}
                            />
                        </form> :
                        <Status>{status}</Status>}
                </TextContainer>
                {authId !== userId ?
                    <ButtonsContainer>
                        <MessagesButton
                            to={`/messages/${userId}`}
                        ><Icon iconId={'messages'} viewBox="-2 -3 24 24" height={'50%'} width={'50%'} /></MessagesButton>
                        <Button variant={isFollow ? 'primary' : 'outlined'}
                            onClick={followOnClickHandler}
                            disabled={props.appIsLoading}
                        >{isFollow ? 'Unfollow' : 'Follow'}</Button>
                    </ButtonsContainer> :
                    <ButtonsContainer>
                        <Button variant={'outlined'}
                            disabled={props.appIsLoading}
                        >Edit profile</Button>
                    </ButtonsContainer>
                }
            </InfoConainer>
        </StyledHeaderBlock>
    )
})

const StyledHeaderBlock = styled(BlockSection)`
    aspect-ratio: 19 / 7;
    flex-direction: column;
    padding: 0;
`
const BackgroundConainer = styled.div`
    display: flex;
    position: relative;
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
const AvatarImage = styled.img`
    position: absolute;
    top: 45%;
    left: 5%;
    width: 17%;
    border-radius: 50%;
    border: 1px solid ${theme.color.text.placeholder};
`
const DefaultAvatar = styled(Icon)`
    position: absolute;
    top: 45%;
    left: 5%;
    width: 17%;
    height: auto;
    border-radius: 50% 50%;
    border: 1px solid ${theme.color.text.placeholder};
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
    ${font({ weight: 100, Fmin: 10, Fmax: 22 })}
`
const Name = styled.span`
    white-space: nowrap;
    ${font({ weight: 700, Fmin: 16, Fmax: 30 })}
`
const Status = styled.span`
    overflow-y: auto;
`

const ButtonsContainer = styled.div`
    display: flex;
    height: 40%;
    width: 35%;
    min-height: 30px;
    gap: 10px;
    justify-content: end;
    button {
        display: flex;
        align-items: center;
    }
`
const MessagesButton = styled(NavLink)`
    display: flex;
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