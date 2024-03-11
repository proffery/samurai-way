import styled, { css } from "styled-components"
import { memo, useEffect } from "react"
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Icon } from 'components/common/icon/Icon'
import { AlertType } from 'store/app/appReducer'
import { theme } from 'styles/Theme.styled'

type AlertPropsType = {
    alertType: AlertType
    alertMessage: string
    alertId: string
    removeAlert: (id: string) => void
}

const REMOVE_ALERT_DELAY = 3000

export const Alert: React.FC<AlertPropsType> = memo((props) => {

    useEffect(() => {
        const timeout = setTimeout(() => {
            props.removeAlert(props.alertId)
        }, REMOVE_ALERT_DELAY)
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    const iconSwitcher = (status: AlertType) => {
        switch (status) {
            case 'failed':
                return <Icon iconId="error" />
            case 'succeeded':
                return <Icon iconId="success" viewBox="0 0 1024 1024" />
            case 'info':
                return <Icon iconId="info" />
            default:
                return null
        }
    }

    return (
        <AlertContainer request={props.alertType}>
            <FlexWrapper gap={"10px"} align={"center"}>
                {iconSwitcher(props.alertType)}
                <Message>{props.alertMessage}</Message>
            </FlexWrapper>
            <FlexWrapper align={"center"} onClick={() => props.removeAlert(props.alertId)}>
                <Icon iconId={'cross'} />
            </FlexWrapper>
        </AlertContainer>
    )
})

type StyledAlertPropsType = {
    className?: string
    request: AlertType
}
const AlertContainer = styled.div<StyledAlertPropsType>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    color: #ffffff;
    border-radius: .5em;
    border: 1px solid;
    margin: 10px 0px;
    padding: 12px;
    width: 100%;
    
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
        padding: 6px;
  }
`
const Message = styled.span`
    color: ${theme.color.text.second};
`