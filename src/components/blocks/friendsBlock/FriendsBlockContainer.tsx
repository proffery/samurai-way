import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { FriendsBlock } from "./FriendsBlock";
import { getFriendsTC } from "../../../redux/friendsReducer";
import { UserStateType } from "../../../api/social-network-api";


type MapStatePropsType = {
    friends: UserStateType[]
}


const mapStateToProps = (state: AppRootStateType): MapStatePropsType => {
    return {
        friends: state.friends,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFriends: () => {
            dispatch(getFriendsTC())
        }
    }
}

export const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlock)