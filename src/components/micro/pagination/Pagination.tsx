import { memo, useEffect, useState } from "react"
import { Button } from "../button/Button"
import { Icon } from "../icon/Icon"
import { FlexWrapper } from '../FlexWrapper.styled'
import { Input } from '../input/Input.styled'
import styled from 'styled-components'
import { useFormik } from 'formik'
import { theme } from '../../../styles/Theme.styled'


type PaginationPropsType = {
    className?: string
    currentPage: number
    usersOnPage: number
    totalUsersCount: number
    appIsLoading: boolean
    pagesNumber: number
    onPageChangeHandler: (pageNumber: number) => void
}

export const Pagination:React.FC<PaginationPropsType> = memo((props) => {
    const { currentPage, usersOnPage, totalUsersCount, appIsLoading, pagesNumber, onPageChangeHandler } = props

    const rangesCount = Math.ceil(totalUsersCount / usersOnPage)
    const rangesArray = Array.from({ length: rangesCount }, (_, i) => i + 1)
    const pagesRange = Math.ceil(rangesArray.length / pagesNumber)
    const [currentRange, setCurrentRange] = useState(Math.ceil(currentPage / pagesNumber))
    const [showInput, setShowInput] = useState(false)

    const minPageIndex = currentRange * pagesNumber - pagesNumber
    const maxPageIndex = currentRange * pagesNumber

    useEffect(() => {
        setCurrentRange(Math.ceil(currentPage / pagesNumber))
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
        <FlexWrapper direction={'column'} justify='center'>
            <FlexWrapper justify='center'>
                {rangesCount > pagesNumber &&
                    <Button
                        variant={'link'}
                        disabled={props.appIsLoading}
                        onClick={pagesRangeDec}
                    ><Icon iconId="leftArrow" viewBox="-5 3 24 24" /></Button>
                }
                <FlexWrapper gap='8px' justify='center'>
                    {rangesArray
                        .filter((el, index) => (index >= minPageIndex && index < maxPageIndex))
                        .map(el =>
                            <Button
                                key={el}
                                className={props.className}
                                variant={'link'}
                                disabled={currentPage === el || props.appIsLoading}
                                isActive={currentPage === el}
                                onClick={() => { onPageChangeHandler(el) }}
                            >{el.toString()}</Button>
                        )
                    }
                </FlexWrapper>
                {rangesCount > pagesNumber &&
                    <Button variant={'link'}
                        disabled={appIsLoading}
                        onClick={pagesRangeInc}
                    ><Icon iconId="rightArrow" viewBox="15 3 24 24" /></Button>
                }
            </FlexWrapper>
            <InputWrapper justify='center' align='center' direction='column'>
                {rangesCount > pagesNumber && showInput &&
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
                                // formChangeHandle(e)
                            }}
                            onBlur={(e: React.ChangeEvent<HTMLInputElement>) => {
                                formik.handleBlur(e)
                                formBlurHandle(e)
                            }}
                            autoFocus
                        />
                    </form>
                }
                {rangesCount > pagesNumber &&
                    <Button
                        variant='link'
                        onClick={showInputHandler}
                    ><Icon iconId='dots' /></Button>}
            </InputWrapper>
        </FlexWrapper>
    )
})

const SyledInput = styled(Input)`
    display: flex;
    position: absolute;
    top: -150%;
    left: 50%;
    width: 90px;
    transform: translateX(-50%);
    box-shadow: ${theme.shadow.text};
    color: ${theme.color.text.primary};
    &::placeholder {
    }
`

const InputWrapper = styled(FlexWrapper)`
    position: relative;
`