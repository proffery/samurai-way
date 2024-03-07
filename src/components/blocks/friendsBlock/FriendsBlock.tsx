import React from "react"
import styled from "styled-components"
import { FriendsType } from '../../../redux/friendsReducer'
import { theme } from "../../../styles/Theme.styled"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { BlockSection } from "../../micro/BlockSection.styled"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"
import { Pagination } from '../../micro/pagination/Pagination'
import { Friend } from "./friend/Friend"
import { font } from '../../../styles/Font'


type FriendsBlockPropsType = {
    className?: string
    isLoading: boolean
    friendsData: FriendsType
    blockHeaderName: string
    refreshFriends: () => void
    onPageChangeHandler: (pageNumber: number) => void
}

export const FriendsBlock: React.FC<FriendsBlockPropsType> = (props) => {
    const { users, currentPage, totalUsersCount, usersOnPage } = props.friendsData
    const { isLoading, onPageChangeHandler } = props
    const friendsList = () => {
        return (
            <StyledFriendsList>
                {users.map(friend => <Friend key={friend.id} friendData={friend} />)}
            </StyledFriendsList>
        )
    }

    return (
        <StyledFriends
            id={props.blockHeaderName.toLowerCase().replaceAll(' ', '-')}
            className={props.className}
        >
            <FlexWrapper justify={'space-between'}>
                <BlockHeader>
                    {props.blockHeaderName}
                </BlockHeader>
                <Button onClick={props.refreshFriends}
                    variant={'link'}
                    className={props.className}><Icon iconId={'refresh'} />
                </Button>
            </FlexWrapper>
            {friendsList()}
            <FlexWrapper justify={'center'} direction={'row'}>
                <StyledPagination
                    appIsLoading={isLoading}
                    currentPage={currentPage}
                    totalUsersCount={totalUsersCount}
                    usersOnPage={usersOnPage}
                    onPageChangeHandler={onPageChangeHandler}
                    pagesNumber={3}
                />
            </FlexWrapper>
        </StyledFriends>
    )
}
const StyledFriends = styled(BlockSection)`
    width: 100%;
    display: flex;
`
const StyledFriendsList = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    overflow-y: auto;
    overflow-x: auto;
    @media ${theme.media.mobile} {
        flex-direction: row;
    }
`
const StyledPagination = styled(Pagination)`
    ${font({ weight: 400, Fmin: 11, Fmax: 16 })}
`