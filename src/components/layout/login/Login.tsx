import { BlockHeader } from 'components/blocks/BlockHeader.styled'
import { BlockSection } from 'components/blocks/BlockSection.styled'
import { FlexWrapper } from 'components/common/FlexWrapper.styled'
import { Button } from 'components/common/button/Button'
import { Checkbox } from 'components/common/checkbox/Checkbox'
import { Input } from 'components/common/input/Input.styled'
import { useFormik } from 'formik'
import React, { memo } from "react"
import styled from 'styled-components'
import { theme } from 'styles/Theme.styled'
import { useActions } from 'utils/customHooks/useActions'

type FormikErrorType = {
    email?: string
    password?: string
}

export const Login: React.FC = memo(() => {
    const {login, addAppAlert} = useActions()
    const formik = useFormik({
        initialValues: {
            email: 'free@samuraijs.com',
            password: 'free',
            remember: false
        },
        onSubmit: (values) => {
            login(values)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Email required'
                addAppAlert('failed', errors.email)
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
                addAppAlert('failed', errors.email)
            }
            if (!values.password) {
                errors.password = 'Password required'
                addAppAlert('failed', errors.password)
            } else if (values.password.length < 4) {
                errors.password = 'Password must be longer than 3'
                addAppAlert('failed', errors.password)
            }
            return errors
        },
    })

    return (
        <StyledLogin>
            <StyledSection id={'login'}>
                <BlockHeader>Log In</BlockHeader>
                <StyledForm onSubmit={formik.handleSubmit}>
                    <Notification>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'} rel="noreferrer"> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </Notification>
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
                        <Checkbox
                            label='Remember me'
                            type={'checkbox'}
                            id={'remember'}
                            {...formik.getFieldProps('remember')}
                        />
                    </FlexWrapper>
                    <FlexWrapper justify={'center'}>
                        <Button
                            ariaLabel={'Submit button'}
                            variant={'primary'}
                            type={'submit'}
                            disabled={!!formik.errors.email || !!formik.errors.password}>Sign in</Button>
                    </FlexWrapper>
                </StyledForm>
            </StyledSection>
        </StyledLogin>
    )
})

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
const Notification = styled.div`
    display: flex;
    flex-direction: column;
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