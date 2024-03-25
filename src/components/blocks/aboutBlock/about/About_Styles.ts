import { EditableSpan } from 'components/common/editableSpan/EditableSpan'
import { Icon } from 'components/common/icon/Icon'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 5px;
    form {
        width: 100%;
    }
`
const Category = styled.div`
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

export const S = {
    Wrapper,
    Category,
    ContactIcon,
    Description,
    DescriptionEditable,
}