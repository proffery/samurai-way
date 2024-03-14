import { memo, useEffect } from 'react'
import { theme } from 'styles/Theme.styled'
import styled, { css } from 'styled-components'
import { AlertType } from 'store/app/appReducer'
import { Icon } from 'components/common/icon/Icon'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'

type AlertPropsType = {
    alertType: AlertType
    alertMessage: string
    alertId: string
    removeAlert: (id: string) => void
}

const REMOVE_ALERT_DELAY = 4000

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
        <AlertContainer request={props.alertType} delay={REMOVE_ALERT_DELAY}>
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
    delay: number
}
const AlertContainer = styled.div<StyledAlertPropsType>`
    display: flex;
    position: relative;
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
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: translateY(100%);
        background: ${theme.gradient.banner};
        animation: moveColor ${props => props.delay / 1000}s linear;
        animation-fill-mode: forwards;
        z-index: 2;
        }

        @keyframes moveColor {
        0% {
            transform: translateY(100%);
        }
        100% {
            transform: translateY(0);
        }
    }
`
const Message = styled.span`
    color: ${theme.color.text.second};
`