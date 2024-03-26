import { Patch } from 'components/app/Router/routeNames'
import { Input } from 'components/common/input/Input.styled'
import { Logout } from 'components/layout/header/Logout'
import { useFormik } from 'formik'
import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectAuthData } from 'store/auth/authSelectors'
import styled from "styled-components"
import { theme } from 'styles/Theme.styled'
import { useActions } from 'utils/customHooks/useActions'
import search from '../../../assets/images/Search.svg'

export const Header: React.FC = memo(() => {

    const { login, email, photoUrl } = useSelector(selectAuthData)
    const { setUsersSearchTerm, logout, addAppAlert } = useActions()
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const history = useHistory()

    const formik = useFormik({
        initialValues: {
            searchTerm: '',
        },
        enableReinitialize: true,
        onSubmit: (values) => {
            setUsersSearchTerm(values.searchTerm)
        },
        validate: (values) => {
            const errors: { searchTerm?: string } = {}
            if (!/^[A-Za-zА-Яа-я_0-9)(;:!@-]*$/i.test(values.searchTerm)) {
                errors.searchTerm = 'Wrong symbol!'
                addAppAlert('failed', errors.searchTerm)
            }
            return errors
        }
    })

    useEffect(() => {
        if (formik.values.searchTerm && history.location.pathname !== Patch.Users) {
            history.push(Patch.Users)
        }
    }, [formik.values.searchTerm])

    const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.value === '') {
            setUsersSearchTerm('')
        }
        formik.handleChange(e)
        clearTimeout(timerId)
        const newTimout = Number(setTimeout(() => formik.handleSubmit(), 1500))
        setTimerId(newTimout)
    }

    return (
        <StyledHeader id="header">
            <StyledForm onSubmit={formik.handleSubmit}>
                <StyledField search={search}
                    bordered="false"
                    placeholder={"Search"}
                    onChange={searchChangeHandler}
                    name='searchTerm'
                    value={formik.values.searchTerm}
                    error={!!formik.errors.searchTerm ? 'true' : 'false'}
                />
            </StyledForm>
            <Logout
                login={login}
                email={email}
                photoUrl={photoUrl}
                logOut={logout}
            />
        </StyledHeader>
    )
})

const StyledHeader = styled.header`
    display: flex;
    align-items: center;
    background-color: ${theme.color.background.primary};
    padding: min(30px, 2vw);
    gap: min(30px, 2vw);
`

type StyledFieldPropsType = {
    search: string
}
const StyledForm = styled.form`
    display: flex;
    width: 100%;
`
const StyledField = styled(Input) <StyledFieldPropsType>`
    padding-left: 40px;
    width: 100%;
    background-image: url(${props => props.search});
    background-repeat: no-repeat;
    background-position-y: center;
    background-position-x: 22px; 
    height: min(100%, 4vh);
    &::placeholder {
        color: ${theme.color.text.primary_dark};
    }
    &:focus {
        box-shadow: ${theme.shadow.block};
    }

`