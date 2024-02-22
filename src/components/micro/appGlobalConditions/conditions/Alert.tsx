import styled, { css } from "styled-components"
import { RequestStatusType, setAppAlertMessageAC, setAppIsLoading } from "../../../../redux/appReducer"
import { theme } from "../../../../styles/Theme.styled"
import { Icon } from "../../icon/Icon"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

type AlertPropsType = {
    requestStatus: RequestStatusType
    alertMessage: string | null
}


export const Alert: React.FC<AlertPropsType> = (props) => {
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(setAppIsLoading(props.requestStatus))
    //     dispatch(setAppAlertMessageAC(props.alertMessage))
    //     const timeout = setTimeout(() => {
    //         dispatch(setAppIsLoading(null))
    //         dispatch(setAppAlertMessageAC(null))
    //     }, 2000)
    //     return () => {
    //         clearTimeout(timeout)
    //     }
    // }, [])

    const iconSwitcher = (status: RequestStatusType) => {
        switch (status) {
            case 'failed':
                return <Icon iconId="error" />
            case 'succeeded':
                return <Icon iconId="success" viewBox="0 0 1024 1024" />
            case 'info':
                return <Icon iconId="info" />
            default:
                return
        }
    }

    return props.alertMessage ?
        <AlertContainer request={props.requestStatus}>
            {iconSwitcher(props.requestStatus)}
            <Message>{props.alertMessage}</Message>
        </AlertContainer>
        : null
}
type StyledAlertPropsType = {
    request: RequestStatusType
}
const AlertContainer = styled.div<StyledAlertPropsType>`
    display: flex;
    align-items: center;
    gap: 10px;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    color: #ffffff;
    border-radius: .5em;
    border: 1px solid;
    margin: 10px 0px;
    padding: 12px;
    width: 400px;
    z-index: 1000;
    ${props => props.request === 'failed' && css<StyledAlertPropsType>`
        background-color: ${theme.color.background.status_error};
    `}
    ${props => props.request === 'succeeded' && css<StyledAlertPropsType>`
        background-color: ${theme.color.background.status_success};
    `}
    ${props => (props.request === 'info') && css<StyledAlertPropsType>`
        background-color: ${theme.color.background.status_info};
    `}
    @media ${theme.media.mobile} {
        width: 200px;
        padding: 6px;
  }
`
const Message = styled.span`
    color: ${theme.color.text.second};
`