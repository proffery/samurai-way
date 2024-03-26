import { Patch } from 'components/app/Router/routeNames'
import { Logout } from 'components/layout/header/logout/Logout'
import { useFormik } from 'formik'
import { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { selectAuthData } from 'store/auth/authSelectors'
import { useActions } from 'utils/customHooks/useActions'
import search from '../../../assets/images/Search.svg'
import { S } from './Header_Styles'

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

    return <S.Header id="header">
        <S.Form onSubmit={formik.handleSubmit}>
            <S.Field search={search}
                bordered="false"
                placeholder={"Search"}
                onChange={searchChangeHandler}
                name='searchTerm'
                value={formik.values.searchTerm}
                error={!!formik.errors.searchTerm ? 'true' : 'false'}
            />
        </S.Form>
        <Logout
            login={login}
            email={email}
            photoUrl={photoUrl}
            logOut={logout}
        />
    </S.Header>
})