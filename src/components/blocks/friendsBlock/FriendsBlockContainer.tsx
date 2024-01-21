import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { FriendsBlock } from "./FriendsBlock";
import { FriendsReducerActionsType, FriendStateType, setFriendsAC } from "../../../redux/friendsReducer";


const mapStateToProps = (state: AppRootStateType) => {
    return {
        friendsData: state.friends.friends
    }
}

const mapDispatchToProps = (dispatch: (action : FriendsReducerActionsType) => void) => {
    return {
        setFriends: (friends: FriendStateType[]) => {
            dispatch(setFriendsAC(friends))
        }
    }
}

export const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlock)