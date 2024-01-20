import React from "react"
import { UsersBlockContainer } from "../../../blocks/usersBlock/UsersBlockContainer"

type UsersPropsType = {

}

export const Users: React.FC<UsersPropsType> = (props) => {
    return (
        <main id="users">
            <UsersBlockContainer />
        </main>
    )
}