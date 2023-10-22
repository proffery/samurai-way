import styled from "styled-components"
import { PostStateType } from "../../../../redux/state"
import { theme } from "../../../../styles/Theme.styled"
import { Button } from "../../../button/Button"
import { FlexWrapper } from "../../../FlexWrapper"
import { font } from "../../../../styles/Font"
import Avatar from '../../../../assets/images/Author.webp'
import { Icon } from "../../../icon/Icon"

type PostPropsType = {
    postData: PostStateType
}

export const Post: React.FC<PostPropsType> = (props) => {
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
                    <AuthorAvatar src={Avatar}/>
                    <FlexWrapper direction="column">
                        <AuthorName>Dmitry Shamko</AuthorName>
                        <PostDate>15mins ago</PostDate>
                    </FlexWrapper>
                </AuthorInfo>
                <MoreButton button_style="link" name={'...'} callback={moreButtonOnClickHandler} />
            </Author>
            <Picture>

            </Picture>
            <Message>
                <AuthorName>Dmitry Shamko&nbsp;</AuthorName>
                <span>{props.postData.message}</span>
            </Message>
            <PostActivites>
                <FlexWrapper align="center">
                    <Button callback={likesButtonOnClickHandler} name={<Icon iconId="likes" viewBox="0 0 28 28" width="100%" height="100%" />} button_style="link" />
                    <AuthorName>{props.postData.likeCount}</AuthorName>
                </FlexWrapper>
                <FlexWrapper align="center">
                    <Button callback={commentsButtonOnClickHandler} name={<Icon iconId="comments" viewBox="0 0 28 28" width="100%" height="100%" />} button_style="link" />
                    <AuthorName>{props.postData.commentsCount}</AuthorName>
                </FlexWrapper>
            </PostActivites>
        </StyledPost>
    )
}

const StyledPost = styled.div`
    display: flex;
    flex-direction: column;
    ${font({weight: 300, Fmin: 10, Fmax: 16})}
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
   border-radius: 50%;
   width: 20%;
   max-width: 80px;
`

const AuthorName = styled.span`
    ${font({weight: 700, Fmin: 10, Fmax: 16})}
    color: ${theme.color.text.primary_dark};
`

const PostDate = styled.span`
    ${font({weight: 300, Fmin: 8, Fmax: 10})}
`

const MoreButton = styled(Button)`
    ${font({weight: 800, Fmin: 10, Fmax: 16})}
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


