import styled from "styled-components"
import { theme } from "../../../../styles/Theme.styled"
import { Button } from "../../../micro/button/Button"
import { FlexWrapper } from "../../../micro/FlexWrapper.styled"
import { font } from "../../../../styles/Font"
import avatarImg from '../../../../assets/images/Author.webp'
import { Icon } from "../../../micro/icon/Icon"
import { PostStateType } from "../../../../redux/profile/profileReducer"
import { memo } from 'react'

type PostPropsType = {
    postData: PostStateType
}

export const Post: React.FC<PostPropsType> = memo((props) => {
    const moreButtonOnClickHandler = () => {
        alert('More Button')
    }
    const likesButtonOnClickHandler = () => {
        alert('Likes Button')
    }
    const commentsButtonOnClickHandler = () => {
        alert('Comments Button')
    }
    return (
        <StyledPost>
            <Author>
                <AuthorInfo>
                    <AuthorAvatar src={avatarImg} />
                    <FlexWrapper direction="column">
                        <AuthorName>Dmitry Shamko</AuthorName>
                        <PostDate>15mins ago</PostDate>
                    </FlexWrapper>
                </AuthorInfo>
                <MoreButton variant="link" name={'...'} onClick={moreButtonOnClickHandler} />
            </Author>
            <Picture>

            </Picture>
            <Message>
                <MessageText>{props.postData.message}</MessageText>
            </Message>
            <PostActivites>
                <FlexWrapper align="center">
                    <Button onClick={likesButtonOnClickHandler}
                        variant="link"
                    ><Icon iconId="likes" viewBox="0 0 28 28" width="100%" height="100%" /></Button>
                    <AuthorName>{props.postData.likeCount}</AuthorName>
                </FlexWrapper>
                <FlexWrapper align="center">
                    <Button onClick={commentsButtonOnClickHandler}
                        variant="link"
                    ><Icon iconId="comments" viewBox="0 0 28 28" width="100%" height="100%" /></Button>
                    <AuthorName>{props.postData.commentsCount}</AuthorName>
                </FlexWrapper>
            </PostActivites>
        </StyledPost>
    )
})

const StyledPost = styled.div`
    display: flex;
    flex-direction: column;
    ${font({ weight: 300, Fmin: 10, Fmax: 16 })}
    border-top: 1px solid;
    border-color: ${theme.color.background.primary};
    gap: 20px;
    padding: 20px 0;
`

const Author = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const AuthorInfo = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    color: ${theme.color.text.primary_dark};
    gap: 5px;
`

const AuthorAvatar = styled.img`
   border-radius: 50% 50%;
   width: 20%;
   max-width: 60px;
   aspect-ratio: 1/1;
`

const AuthorName = styled.span`
    white-space: nowrap;
    ${font({ weight: 700, Fmin: 10, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`
const MessageText = styled.span`
    word-break: break-all;
    ${font({ weight: 400, Fmin: 10, Fmax: 16 })}
    color: ${theme.color.text.primary_dark};
`

const PostDate = styled.span`
    ${font({ weight: 300, Fmin: 8, Fmax: 10 })}
`

const MoreButton = styled(Button)`
    ${font({ weight: 800, Fmin: 10, Fmax: 16 })}
    align-self: flex-start;
`

const Picture = styled.div`
    display: flex;
    aspect-ratio: 15 / 8;
    border-radius: 10px;
    background-color: ${theme.color.background.primary};
`

const Message = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const PostActivites = styled.div`
    display: flex;
    color: ${theme.color.text.primary};
    gap: 20px;
    button {
        height: 24px;
        @media ${theme.media.mobile} {
            height: 18px;
        }
    }
`


