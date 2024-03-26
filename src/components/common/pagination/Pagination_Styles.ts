import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Input } from 'components/common/input/Input.styled'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'

const PaginationInput = styled(Input)`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${theme.shadow.text};
    color: ${theme.color.text.primary};
    z-index: 999;
`
const Pagination = styled(FlexWrapper)`
    position: relative;
    button {
        min-height: 15px;
        min-width: 15px;
    }
`

export const S = {
    Pagination,
    PaginationInput
}