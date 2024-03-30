import { font } from "styles/Font"
import { BlockSection } from "components/blocks/BlockSection.styled"
import { Avatar } from "components/common/avatar/Avatar"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const HeaderBlock = styled(BlockSection)`
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
const Photo = styled(Avatar)`
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
        ${font({ family: "Orbitron", weight: 700, Fmin: 22, Fmax: 36 })}
        position: absolute;
        top: 12%;
        right: 5%;
        text-shadow: ${theme.shadow.header};
    }
`
const ButtonsContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    width: 35%;
    gap: min(30px, 2vw);
    justify-content: end;
`
const MessagesButton = styled(NavLink)`
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: end;
    svg {
        min-width: 24px;
        min-height: 24px;
    }

    &:active {
        background-color: ${theme.color.background.primary};
        color: ${theme.color.text.primary};
        border-color: ${theme.color.background.second};
    }
`
const UploadForm = styled.form`
    display: flex;
    & input[type="file"] {
        display: none;
    }
    justify-content: end;
    align-items: center;
`
const UploadButton = styled.label`
    display: flex;
    align-items: center;
    justify-content: end;
    height: 100%;
    color: ${theme.color.text.primary};
    cursor: copy;
`

export const S = {
    HeaderBlock,
    BackgroundConainer,
    BackgroundImage,
    Photo,
    InfoConainer,
    TextContainer,
    Name,
    ButtonsContainer,
    MessagesButton,
    UploadForm,
    UploadButton,
}
