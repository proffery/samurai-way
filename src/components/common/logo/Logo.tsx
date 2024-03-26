
import { memo } from 'react'
import { S } from './Logo_Styles'
import { Patch } from 'components/app/Router/routeNames'

type Props = {
    variant: 'primary' | 'secondary'
    type: 'text' | 'logo'
}

export const Logo: React.FC<Props> = memo(({ variant, type }) => {
    return (type === 'text' ?
        <S.Link variant={variant} to={Patch.Home}>
            <p>Social</p>
            <p>Network</p>
        </S.Link>
        : <S.BurgerIcon iconId={'burgerMenu'} viewBox='0 0 24 24' />
    )
})

