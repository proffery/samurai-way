import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { UserStateType } from "../../../redux/usersReducer";
import { getPossibleFriendsTC } from "../../../redux/possibleFriendsReducer";
import { PossibleFriendsBlock } from "./PossibleFriendsBlock";


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

export const PossibleFriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(PossibleFriendsBlock)