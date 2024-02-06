import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { FriendsBlock } from "./FriendsBlock";
import { getFriendsTC } from "../../../redux/friendsReducer";


const mapStateToProps = (state: AppRootStateType) => {
    return {
        friends: state.friends
    }
}

const mapDispatchToProps = (dispatch: (dispatch: any) => void) => {
    return {
        getFriends: () => {
            dispatch(getFriendsTC())
        }
    }
}

export const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlock)