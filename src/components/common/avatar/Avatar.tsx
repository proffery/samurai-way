import styled from 'styled-components'
import { theme } from '../../../styles/Theme.styled'
import { Icon } from '../icon/Icon'
import { memo } from 'react'

type AvatarPropsType = {
    className?: string
    avatarURL?: string
}

export const Avatar: React.FC<AvatarPropsType> = memo((props) => {
    return (
        <AvaterContainer className={props.className}>
            {props.avatarURL
                ? <AvatarImage src={props.avatarURL} />
                : <DefaultImage
                    iconId={'avatarDefault'}
                    viewBox="0 0 1024 1024"
                    height={'100%'}
                    width={'100%'}
                />}
        </AvaterContainer>
    )
})

const AvaterContainer = styled.div`
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