import { useEffect, useState } from "react"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"
import { UsersFilterType } from "../../../redux/usersReducer"

const PAGES_COUNT = 5

type UserPaginationPropsType = {
    currentPage: number
    usersOnPage: number
    totalUsersCount: number
    usersFilter: UsersFilterType
    appIsLoading: boolean
    onPageChangeHandler: (pageNumber: number) => void
}

export const UsersPagination = (props: UserPaginationPropsType) => {
    const { currentPage, usersOnPage, totalUsersCount, usersFilter, appIsLoading } = props
    const [currentRange, setCurrentRange] = useState(1)

    useEffect(() => {
        props.onPageChangeHandler(minPageIndex + 1)
    }, [currentRange])

    useEffect(() => {
        setCurrentRange(1)
    }, [usersFilter])

    const pagesCount = Math.ceil(totalUsersCount / usersOnPage)
    const pagesCountArray = Array.from({ length: pagesCount }, (_, i) => i + 1)
    const pagesRange = Math.ceil(pagesCountArray.length / PAGES_COUNT)

    let minPageIndex = currentRange * PAGES_COUNT - PAGES_COUNT
    let maxPageIndex = currentRange * PAGES_COUNT

    const pagesRangeInc = () => {
        currentRange >= pagesRange
            ? setCurrentRange(1)
            : setCurrentRange(currentRange + 1)
    }
    const pagesRangeDec = () => {
        currentRange <= 1
            ? setCurrentRange(pagesRange)
            : setCurrentRange(currentRange - 1)
    }

    return (
        <>
            {pagesRange > PAGES_COUNT &&
                <Button variant={'link'}
                    disabled={props.appIsLoading}
                    onClick={pagesRangeDec}
                ><Icon iconId="leftArrow" viewBox="-5 3 24 24" /></Button>
            }
            {
                pagesCountArray
                    .filter((el, index) => (index >= minPageIndex && index < maxPageIndex))
                    .map(el =>
                        <Button
                            key={el}
                            variant={'link'}
                            disabled={currentPage === el || props.appIsLoading}
                            isActive={currentPage === el}
                            onClick={() => { props.onPageChangeHandler(el) }}
                        >{el.toString()}</Button>
                    )
            }
            {pagesRange > PAGES_COUNT &&
                <Button variant={'link'}
                    disabled={appIsLoading}
                    onClick={pagesRangeInc}
                ><Icon iconId="rightArrow" viewBox="15 3 24 24" /></Button>
            }
        </>
    )
}