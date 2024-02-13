import { useState } from "react"
import { Button } from "../../micro/button/Button"
import { Icon } from "../../micro/icon/Icon"

type UserPaginationPropsType = {
    pagesCountArray: number[]
    currentPage: number
    onPageChangeHandler: (pageNumber: number) => void
}
export const UserPagination = (props: UserPaginationPropsType) => {
    const PAGES_COUNT = 5
    const pagesRange = Math.ceil(props.pagesCountArray.length / PAGES_COUNT)
    const [currentRange, setCurrentRange] = useState(1)
    let minPageIndex = currentRange * PAGES_COUNT - PAGES_COUNT
    let maxPageIndex = currentRange === pagesRange
        ? currentRange * PAGES_COUNT - props.pagesCountArray.length % PAGES_COUNT + 2
        : currentRange * PAGES_COUNT
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
                    name={<Icon iconId="leftArrow" viewBox="-5 3 24 24" />}
                    onClick={pagesRangeDec}
                />
            }
            {
                props.pagesCountArray
                    .filter((el, index) => (index >= minPageIndex && index < maxPageIndex))
                    .map(el =>
                        <Button
                            key={el}
                            variant={'link'}
                            disabled={props.currentPage === el}
                            onClick={() => { props.onPageChangeHandler(el) }}
                            name={el.toString()}
                            isActive={props.currentPage === el}
                        />
                    )
            }
            {pagesRange > PAGES_COUNT &&
                <Button variant={'link'}
                    name={<Icon iconId="rightArrow" viewBox="15 3 24 24" />}
                    onClick={pagesRangeInc}
                />
            }
        </>
    )
}