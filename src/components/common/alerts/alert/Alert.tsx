import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Icon } from 'components/common/icon/Icon'
import { memo, useEffect } from 'react'
import { S } from './Alert_Styles'
import { AlertType } from 'store/app/appReducer'

type Props = {
    alertType: AlertType
    alertMessage: string
    alertId: string
    removeAlert: (id: string) => void
}

const REMOVE_ALERT_DELAY = 4000

export const Alert: React.FC<Props> = memo(({ alertType, alertId, alertMessage, removeAlert }) => {
    useEffect(() => {
        const timeout = setTimeout(() => {
            removeAlert(alertId)
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
        }
    }

    return <S.Alert request={alertType} delay={REMOVE_ALERT_DELAY}>
        <FlexWrapper gap={"10px"} align={"center"}>
            {iconSwitcher(alertType)}
            <S.Message>{alertMessage}</S.Message>
        </FlexWrapper>
        <FlexWrapper align={"center"} onClick={() => removeAlert(alertId)}>
            <Icon iconId={'cross'} />
        </FlexWrapper>
    </S.Alert>
})

