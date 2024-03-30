import { Input } from "components/common/input/Input.styled"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

type StyledFieldPropsType = {
  search: string
}

const Header = styled.header`
  display: flex;
  align-items: center;
  background-color: ${theme.color.background.primary};
  padding: min(30px, 2vw);
  gap: min(30px, 2vw);
`
const Form = styled.form`
  display: flex;
  width: 100%;
`
const Field = styled(Input)<StyledFieldPropsType>`
  padding-left: 40px;
  width: 100%;
  background-image: url(${(props) => props.search});
  background-repeat: no-repeat;
  background-position-y: center;
  background-position-x: 22px;
  height: min(100%, 4vh);
  &::placeholder {
    color: ${theme.color.text.primary_dark};
  }
  &:focus {
    box-shadow: ${theme.shadow.block};
  }
`

export const S = {
  Header,
  Field,
  Form,
}
