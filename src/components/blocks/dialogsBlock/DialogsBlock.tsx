import { DialogResponse } from 'api/dialogsAPI'
import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { memo, useEffect, useRef } from 'react'
import { useDraggable } from 'react-use-draggable-scroll'
import { S } from './DialogsBlock_Styles'
import { Patch } from 'components/app/Router/routeNames'

type Props = {
    dialogs: DialogResponse[]
}

export const DialogsBlock: React.FC<Props> = memo(({ dialogs }) => {
    const scrollIntoViewRef = useRef<null | HTMLAnchorElement>(null)
    const draggRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
    const { events } = useDraggable(draggRef, { isMounted: true })

    useEffect(() => {
        scrollIntoViewRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [dialogs])

    return <BlockSection id="dialogs-block">
        <BlockHeader>Dialogs: {dialogs.length}</BlockHeader>
        <S.Wrapper ref={draggRef} {...events}>
            {dialogs.map((dialog, index) =>
                <S.Dialog
                    key={dialog.id}
                    ref={index === 0 ? scrollIntoViewRef : null}
                    to={Patch.Messages + dialog.id}
                >
                    <S.Photo
                        avatarURL={dialog.photos.small}
                        lastUserActivityDate={dialog.lastUserActivityDate}
                    />
                    <S.Name>{dialog.userName}</S.Name>
                </S.Dialog>
            )}
        </S.Wrapper>
    </BlockSection>
})

