import { DialogResponseType } from 'api/dialogsAPI'
import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { Avatar } from 'components/common/avatar/Avatar'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { memo, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useDraggable } from 'react-use-draggable-scroll'
import styled from 'styled-components'
import { font } from 'styles/Font'
import { theme } from 'styles/Theme.styled'

type DialogsBlockPtopsType = {
    className?: string
    dialogs: DialogResponseType[]
}

export const DialogsBlock: React.FC<DialogsBlockPtopsType> = memo(({ dialogs, className }) => {
    const scrollIntoViewRef = useRef<null | HTMLAnchorElement>(null)
    const draggRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(draggRef, { isMounted: true })

    useEffect(() => {
        scrollIntoViewRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [dialogs])

    return <StyledDialogsBlock id="dialogs-block" className={className}>
        <BlockHeader>Dialogs: {dialogs.length}</BlockHeader>
        <DialogWrapper ref={draggRef} {...events}>
            {dialogs.map((dialog, index) =>
                <Dialog
                    key={dialog.id}
                    ref={index === 0 ? scrollIntoViewRef : null}
                    to={'/messages/' + dialog.id}
                >
                    <StyledAvatar
                        avatarURL={dialog.photos.small}
                        lastUserActivityDate={dialog.lastUserActivityDate}
                    />
                    <StyledName>{dialog.userName}</StyledName>
                </Dialog>
            )}
        </DialogWrapper>
    </StyledDialogsBlock>
})
const StyledDialogsBlock = styled(BlockSection)`
    width: 100%;
`
const Dialog = styled(NavLink)`
    position: relative;
    display: flex;
    height: 60%;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    flex-direction: column;
    aspect-ratio: 1 / 1;
    padding: min(15px, 2vw);
    &.active {
        outline: 1px solid ${theme.color.background.primary};
        background-color: ${theme.color.background.primary};
        border-radius: 10px;
    }
    &:hover {
        outline: 1px solid ${theme.color.background.primary};
        background-color: ${theme.color.background.primary};
        border-radius: 10px;
    }
    ${font({ weight: 400, Fmin: 10, Fmax: 14 })}
    word-break: break-all;
`
const DialogWrapper = styled(FlexWrapper)`
    overflow-x: auto;
    min-height: 100%;
`
const StyledAvatar = styled(Avatar)`
    width: 70%;
`
const StyledName = styled.span`
    color: ${theme.color.text.primary_dark}
`