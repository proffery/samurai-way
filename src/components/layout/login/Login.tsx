import React from "react"
import { BlockSection } from "../../micro/BlockSection.styled"
import styled from "styled-components"
import { theme } from "../../../styles/Theme.styled"
import { BlockHeader } from "../../micro/BlockHeader.styled"
import { Input } from "../../micro/field/Input.styled"
import { FlexWrapper } from "../../micro/FlexWrapper.styled"
import { Button } from "../../micro/button/Button"
import { useFormik } from "formik"
import { AppDispatchType } from "../../../redux/redux-store"
import { addAppAlert } from "../../../redux/appReducer"

type LoginPagePropsType = {
    dispatch: AppDispatchType
}
type FormikErrorType = {
    email?: string
    password?: string
}
export const Login: React.FC<LoginPagePropsType> = (props) => {
    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            remember: false
        },
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email required'
                props.dispatch(addAppAlert('failed', errors.email))
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
                props.dispatch(addAppAlert('failed', errors.email))
            }
            else if (!values.password) {
                errors.password = 'Password required'
                props.dispatch(addAppAlert('failed', errors.password))
            } else if (values.password.length < 4) {
                errors.password = 'Password must be longer than 3'
                props.dispatch(addAppAlert('failed', errors.password))
            }
            console.log(errors)

            return errors
        },
    })
    return (
        <StyledLogin>
            <StyledSection id={'login'}>
                <BlockHeader>Log In</BlockHeader>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <FlexWrapper direction={'column'} gap={'min(10px, 1vw)'}>
                        <label htmlFor={'email'}>Email</label>
                        <Input bordered={'true'}
                            type={'email'}
                            id={'email'}
                            error={!!formik.errors.email && !!formik.touched.email ? 'true' : 'false'}
                            {...formik.getFieldProps('email')}
                            placeholder={'free@samuraijs.com'}
                        />
                    </FlexWrapper>
                    <FlexWrapper direction={'column'} gap={'min(10px, 1vw)'}>
                        <label htmlFor={'password'}>Password</label>
                        <Input bordered={'true'}
                            type={'password'}
                            id={'password'}
                            error={!!formik.errors.password && !!formik.touched.password ? 'true' : 'false'}
                            {...formik.getFieldProps('password')}
                            placeholder={'free'}
                        />
                    </FlexWrapper>
                    <FlexWrapper gap={'min(10px, 1vw)'} align={'center'}>
                        <Input type={'checkbox'}
                            id={'remember'}
                            {...formik.getFieldProps('remember')}
                        />
                        <label htmlFor={'remember'}>Remember me</label>
                    </FlexWrapper>
                    <FlexWrapper justify={'center'}>
                        <Button variant={'primary'}
                            type={'submit'}
                            disabled={!!formik.errors.email || !!formik.errors.password}>Sign in</Button>
                    </FlexWrapper>
                </StyledForm>
            </StyledSection>
        </StyledLogin>
    )
}

const StyledLogin = styled.main`
    display: flex;
    background-color: ${theme.color.background.primary};
    align-items: center;
    justify-content: center;
`
const StyledSection = styled(BlockSection)`
    display: flex;
    width: 35%;
    min-width: 320px;
    @media ${theme.media.mobile} {
        height: 100%;
        width: 100%;
    }
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: min(30px, 2vw);
    padding: min(30px, 2vw);
    @media ${theme.media.mobile} {
        background-color: ${theme.color.background.block};
        align-self: center;
        justify-self: center;
        height: 80%;
        width: 80%;
        justify-content: center;
    }
`