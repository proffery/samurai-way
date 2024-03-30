import { FlexWrapper } from "components/common/FlexWrapper.styled"
import { Link } from "components/common/link/Link.styled"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const List = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
  gap: 24px;
  @media ${theme.media.mobile} {
    gap: 15px;
  }
  ${Link} {
    @media ${theme.media.mobile} {
      svg {
        min-width: 18px;
        width: 18px;
      }
    }
  }
`
const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 50px;
  gap: 20px;
  background-color: ${theme.color.background.primary};
  z-index: 1;
  @media ${theme.media.mobile} {
    padding: 25px;
  }
`
const Contacts = styled(FlexWrapper)`
  width: 50%;
  height: 100%;
  padding: 50px 20px;
  gap: 22px;
`
const TopWrapper = styled(FlexWrapper)`
  position: relative;
  height: 100%;
  width: 100%;
  &::before {
    position: absolute;
    content: "";
    width: 100%;
    height: 2px;
    top: 0;
    background-color: ${theme.color.background.second};
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    height: 1px;
    bottom: 0;
    background-color: ${theme.color.text.placeholder};
  }
`
const BottomWrapper = styled(FlexWrapper)`
  width: 100%;
  gap: 32px;
  @media ${theme.media.mobile} {
    gap: 25px;
  }
`
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.text.placeholder};
  svg {
    color: ${theme.color.text.primary};
  }
  span {
    white-space: nowrap;
  }
  gap: 10px;
  @media ${theme.media.mobile} {
    svg {
      min-width: 18px;
      width: 18px;
    }
  }
`
const Copyright = styled.div`
  display: flex;
  flex-wrap: wrap;
  span {
    white-space: nowrap;
  }
`

export const S = {
  List,
  BottomWrapper,
  Contacts,
  IconWrapper,
  TopWrapper,
  Copyright,
  Footer,
}
