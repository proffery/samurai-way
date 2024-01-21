import { connect } from "react-redux";
import { AppRootStateType } from "../../../redux/redux-store";
import { FriendsBlock } from "./FriendsBlock";


const mapStateToProps = (state: AppRootStateType) => {
    return {
        friendsData: state.posts.friends
    }
}

const mapDispatchToProps = () => {
    return {}
}

export const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlock)