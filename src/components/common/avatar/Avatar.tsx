import { memo } from 'react'
import { S } from './Avatar_Styles'
import { OnlineMarker } from './onlineMarker/OnlineMarker'

type AvatarPropsType = {
    className?: string
    avatarURL?: string
    lastUserActivityDate?: string
}

export const Avatar: React.FC<AvatarPropsType> = memo(({ avatarURL, lastUserActivityDate, className }) => {
    return <S.Container className={className}>
        {avatarURL
            ? <S.Image src={avatarURL} alt='Avatar' />
            : <S.DefaultImage
                iconId={'avatarDefault'}
                viewBox="0 0 1024 1024"
                height={'100%'}
                width={'100%'}
            />}
        {lastUserActivityDate &&
            <OnlineMarker
                className={className}
                lastUserActivityDate={lastUserActivityDate}
            />
        }
    </S.Container>
})

