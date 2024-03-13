import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { theme } from 'styles/Theme.styled'
import { useLocation } from 'react-router-dom'
import { Icon } from 'components/common/icon/Icon'
import { memo, useEffect, useRef, useState } from 'react'

type ToTopLinkPropsType = {
    anchor_id: string
}

export const ToTop: React.FC<ToTopLinkPropsType> = memo((props) => {
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const lastHash = useRef('')

    useEffect(() => {
        const main = document.querySelector('main')
        const onScroll = () => {
            if (main && main.scrollTop > 300) {
                setScrolled(true)
            }
            else {
                setScrolled(false)
            }
        }
        main && main.addEventListener('scroll', onScroll)
        return () => { main && main.removeEventListener('scroll', onScroll) }
    }, [])

    useEffect(() => {
        if (location.hash) {
            lastHash.current = location.hash.slice(1)
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document
                    .getElementById(lastHash.current)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                lastHash.current = ''
            }, 100)
        }
    }, [location])
    const onClickHandler = () => {
        document.location = '#' + props.anchor_id
    }
    return (
        scrolled ?
            <StyledToTopLink
                to={'#' + props.anchor_id}
                onClick={onClickHandler}
            ><Icon iconId="leftArrow" viewBox="-1 9 14 14" />
            </StyledToTopLink> :
            null
    )
})

const StyledToTopLink = styled(Link)`
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    background-color: ${theme.color.background.primary};
    height: 30px;
    width: 30px;
    top: 95%;
    left: 95%;
    padding: 5px;
    border-radius: 50%;
    transform: translate(-95%, -95%) rotate(90deg);
    z-index: 99999;
    &:hover {
        box-shadow: ${theme.shadow.block};
    }
`