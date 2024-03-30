import { font } from "./../../../styles/Font"
import { Icon } from "components/common/icon/Icon"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const Container = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    color: ${theme.color.text.placeholder};
    ${font({ weight: 300, Fmin: 8, Fmax: 10 })}
`
const Image = styled.img`
    border-radius: 50% 50%;
    object-fit: fill;
    aspect-ratio: 1/1;
    width: 100%;
    background-color: ${theme.color.background.primary};
    border: 1px solid ${theme.color.text.placeholder};
`
const DefaultImage = styled(Icon)`
    border-radius: 50% 50%;
    object-fit: fill;
    aspect-ratio: 1/1;
    width: 100%;
    background-color: ${theme.color.background.primary};
    border: 1px solid ${theme.color.text.placeholder};
`

export const S = {
    Container,
    Image,
    DefaultImage,
}
