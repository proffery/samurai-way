import styled from "styled-components"

type FlexWrapperPropsType = {
  gap?: string
  wrap?: string
  align?: string
  justify?: string
  direction?: string
}

export const FlexWrapper = styled.div<FlexWrapperPropsType>`
  display: flex;
  gap: ${(props) => props.gap || "0px"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  align-items: ${(props) => props.align || "stretch"};
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => props.justify || "flex-start"};
`
