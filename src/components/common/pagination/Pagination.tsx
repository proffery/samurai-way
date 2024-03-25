import { useFormik } from 'formik'
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'
import { memo, useEffect, useState } from 'react'
import { Icon } from 'components/common/icon/Icon'
import { Button } from 'components/common/button/Button'
import { Input } from 'components/common/input/Input.styled'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'

type Props = {
    className?: string
    currentPage: number
    usersOnPage: number
    totalUsersCount: number
    appIsLoading: boolean
    onPageChangeHandler: (pageNumber: number) => void
}
const PAGES_NUMBER = 2 //number of pages to show before last page. Exemple for PAGES_NUMBER = 2:  <1,2...3>
export const Pagination: React.FC<Props> = memo((props) => {
    const {
        currentPage, usersOnPage, totalUsersCount, className,
        appIsLoading, onPageChangeHandler
    } = props

    const rangesCount = Math.ceil(totalUsersCount / usersOnPage)
    const rangesArray = Array.from({ length: rangesCount }, (_, i) => i + 1)
    const pagesRange = Math.ceil(rangesArray.length / PAGES_NUMBER)
    const [currentRange, setCurrentRange] = useState(Math.ceil(currentPage / PAGES_NUMBER))
    const [showInput, setShowInput] = useState(false)

    const minPageIndex = currentRange * PAGES_NUMBER - PAGES_NUMBER
    const maxPageIndex = currentRange * PAGES_NUMBER

    useEffect(() => {
        setCurrentRange(Math.ceil(currentPage / PAGES_NUMBER))
    }, [currentPage])

    const pagesRangeInc = () => {
        if (currentRange >= pagesRange) {
            setCurrentRange(1)
        } else {
            setCurrentRange(prev => prev + 1)
        }
    }
    const pagesRangeDec = () => {
        if (currentRange <= 1) {
            setCurrentRange(pagesRange)

        } else {
            setCurrentRange(prev => prev - 1)
        }
    }

    type FormikErrorType = {
        page?: string
    }
    const formik = useFormik({
        initialValues: {
            page: currentPage,
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            onPageChangeHandler(values.page)
            setShowInput(false)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.page) {
                errors.page = 'Page required'
            } else if (values.page < 1) {
                errors.page = 'wrong range'
            } else if (values.page > rangesCount) {
                errors.page = 'wrong range'
            }
            return errors
        },
    })

    const showInputHandler = () => {
        setShowInput(prev => !prev)
    }
    const formBlurHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        formik.handleSubmit()
        setShowInput(false)
    }

    return (
        <StyledPagination direction={'column'} justify='center' align='center'>
            <FlexWrapper justify='center'>
                {rangesCount > PAGES_NUMBER &&
                    <Button
                        className={props.className}
                        ariaLabel={'Change pages range - button'}
                        variant={'link'}
                        disabled={props.appIsLoading}
                        onClick={pagesRangeDec}
                    >
                        <Icon
                            iconId="leftArrow"
                            viewBox="-5 7 20 20"
                            height='100%'
                            width='100%' />
                    </Button>
                }
                <FlexWrapper justify='center' align='center' className={props.className}>
                    {rangesArray
                        .filter((el, index) => (index >= minPageIndex && index < maxPageIndex))
                        .map((el, index, arr) =>
                            <Button
                                ariaLabel={'Go to page button'}
                                key={el}
                                className={props.className}
                                variant={'link'}
                                disabled={currentPage === el || props.appIsLoading}
                                isActive={currentPage === el}
                                onClick={() => { onPageChangeHandler(el) }}
                            >
                                {index === arr.length - 1 ? el.toString() : el.toString() + ','}
                            </Button>
                        )
                    }
                </FlexWrapper>
                <FlexWrapper justify='center' align='center' className={props.className}>
                    {rangesCount > PAGES_NUMBER && showInput &&
                        <form onSubmit={formik.handleSubmit}>
                            <SyledInput
                                type='number'
                                placeholder={`1-${rangesCount}`}
                                error={!!formik.errors.page && !!formik.touched.page ? 'true' : 'false'}
                                name='page'
                                min={'1'}
                                max={rangesCount}
                                value={formik.values.page}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.handleChange(e)
                                }}
                                onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    formik.handleBlur(e)
                                    formBlurHandle(e)
                                }}
                                autoFocus
                            />
                        </form>
                    }
                    {maxPageIndex < rangesCount && <>
                        <Button
                            className={className}
                            ariaLabel={'Show pages input button'}
                            variant='link'
                            onClick={showInputHandler}
                        >&nbsp;...&nbsp;</Button>
                        <Button
                            ariaLabel={'Go to page button'}
                            className={className}
                            variant={'link'}
                            disabled={currentPage === rangesCount || props.appIsLoading}
                            isActive={currentPage === rangesCount}
                            onClick={() => { onPageChangeHandler(rangesCount) }}
                        >{rangesCount.toString()}</Button>
                    </>
                    }
                </FlexWrapper>
                {rangesCount > PAGES_NUMBER &&
                    <Button
                        className={className}
                        variant={'link'}
                        ariaLabel={'Change pages range + button'}
                        disabled={appIsLoading}
                        onClick={pagesRangeInc}
                    >
                        <Icon
                            iconId="rightArrow"
                            height='100%' width='100%'
                            viewBox="15 7 20 20"
                        />
                    </Button>
                }
            </FlexWrapper>
        </StyledPagination>
    )
})

const SyledInput = styled(Input)`
    display: flex;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: ${theme.shadow.text};
    color: ${theme.color.text.primary};
    z-index: 999;
`
const StyledPagination = styled(FlexWrapper)`
    position: relative;
`