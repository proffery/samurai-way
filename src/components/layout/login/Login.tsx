import { BlockHeader } from "components/blocks/BlockHeader.styled"
import { LoginForm } from "components/layout/login/loginForm/LoinForm"
import React, { memo } from "react"
import { S } from "./Login_Styles"

const Login: React.FC = memo(() => {
    return (
        <S.Login>
            <S.Section id={"login"}>
                <BlockHeader>Log In</BlockHeader>
                <LoginForm />
            </S.Section>
        </S.Login>
    )
})

export default Login
