import { HeaderBlockForm } from "components/blocks/headerBlock/HeaderBlockForm"
import { Button } from "components/common/button/Button"
import { Icon } from "components/common/icon/Icon"
import { ChangeEvent, memo } from "react"
import { AuthState } from "store/auth/authReducer"
import { ProfileState } from "store/profile/profileReducer"
import { S } from "./HeaderBlock_Styles"
import { AlertType } from "store/app/appReducer"

type Props = {
    className?: string
    authStateData: AuthState
    profileStateData: ProfileState
    appIsLoading: boolean
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    changeProfilePhotos: (image: File) => void
    changeProfileStatus: (newStatus: string) => void
    addAppAlert: (type: AlertType, message: string) => void
}

export const HeaderBlock: React.FC<Props> = memo((props) => {
    const { follow, unfollow, addAppAlert, changeProfilePhotos, changeProfileStatus, className, appIsLoading } = props
    const { isFollow, fullName, userId, status } = props.profileStateData.data
    const { small, large } = props.profileStateData.data.photos
    const { id: authId } = props.authStateData

    const followHandler = () => {
        isFollow ? unfollow(userId) : follow(userId)
    }
    const uploadPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.files && changeProfilePhotos(e.currentTarget.files[0])
    }

    return (
        <S.HeaderBlock id="profile-header" className={className}>
            <S.BackgroundConainer>
                {large ? (
                    <S.BackgroundImage src={large} alt="Background" />
                ) : (
                    <Icon iconId={"avatarDefault"} viewBox="0 0 1024 1024" height={"100%"} width={"100%"} />
                )}
                <S.Photo avatarURL={small} />
            </S.BackgroundConainer>
            <S.InfoConainer>
                <S.TextContainer>
                    <S.Name>{fullName}</S.Name>
                    {authId === userId ? (
                        <HeaderBlockForm
                            addAppAlert={addAppAlert}
                            changeProfileStatus={changeProfileStatus}
                            status={status}
                        />
                    ) : (
                        <span>{status}</span>
                    )}
                </S.TextContainer>
                {authId !== userId ? (
                    <S.ButtonsContainer>
                        <S.MessagesButton aria-label={`Go to chat with ${fullName}`} to={`/messages/${userId}`}>
                            <Icon iconId={"messages"} viewBox="-2 -3 24 24" height="40%" width="40%" />
                        </S.MessagesButton>
                        <Button
                            ariaLabel={"Follow/Unfollow button"}
                            variant={isFollow ? "primary" : "outlined"}
                            onClick={followHandler}
                            disabled={appIsLoading}
                        >
                            {isFollow ? "Unfollow" : "Follow"}
                        </Button>
                    </S.ButtonsContainer>
                ) : (
                    <S.ButtonsContainer>
                        <S.UploadForm>
                            <S.UploadButton htmlFor={"photo-upload"} title="Uplod photo">
                                <input
                                    id={"photo-upload"}
                                    type={"file"}
                                    accept={"image/*"}
                                    onChange={uploadPhotoHandler}
                                />
                                <Icon iconId={"addPhoto"} viewBox="-3 -2 30 30" height="40%" width="40%" />
                            </S.UploadButton>
                        </S.UploadForm>
                    </S.ButtonsContainer>
                )}
            </S.InfoConainer>
        </S.HeaderBlock>
    )
})
