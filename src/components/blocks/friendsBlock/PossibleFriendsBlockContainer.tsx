import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { getPossibleFriendsTC } from "../../../redux/possibleFriendsReducer";
import { UserStateType } from "../../../api/social-network-api";
import { FriendsBlock } from "./FriendsBlock";
import { useEffect } from "react";

type PossibleFriendsBlockAPIPropsType = {
    className?: string
    possibleFriends: UserStateType[]
    getPossibleFriends: () => void
}


export const PossibleFriendsBlockAPI: React.FC<PossibleFriendsBlockAPIPropsType> = (props) => {
    useEffect(() => {
        props.getPossibleFriends()
    }, [])

    return (
        <FriendsBlock
            friends={props.possibleFriends}
            blockHeaderName={"Possible friends"}
            className={props.className}
        />
    )
}


type MapStatePropsType = {
    possibleFriends: UserStateType[]
}

const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        possibleFriends: state.possibleFriends,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getPossibleFriends: () => {
            dispatch(getPossibleFriendsTC())
        },
    }
}

export const PossibleFriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(PossibleFriendsBlockAPI)