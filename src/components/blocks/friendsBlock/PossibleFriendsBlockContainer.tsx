import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { getPossibleFriendsTC } from "../../../redux/possibleFriendsReducer";
import { PossibleFriendsBlock } from "./PossibleFriendsBlock";
import { UserStateType } from "../../../api/social-network-api";

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