import { memo } from 'react'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'
import { Icon } from 'components/common/icon/Icon'
import { OnlineMarker } from 'components/common/avatar/onlineMarker/OnlineMarker'

type AvatarPropsType = {
    className?: string
    avatarURL?: string
    lastUserActivityDate?: string
}

export const Avatar: React.FC<AvatarPropsType> = memo(({avatarURL, lastUserActivityDate, className}) => {
    return (
        <AvaterContainer className={className}>
            {avatarURL
                ? <AvatarImage src={avatarURL} alt='Avatar' />
                : <DefaultImage
                    iconId={'avatarDefault'}
                    viewBox="0 0 1024 1024"
                    height={'100%'}
                    width={'100%'}
                />}
            {lastUserActivityDate && <OnlineMarker
                className={className}
                lastUserActivityDate={lastUserActivityDate}
             />}
        </AvaterContainer>
    )
})

const AvaterContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    color: ${theme.color.text.placeholder};
`
const AvatarImage = styled.img`
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