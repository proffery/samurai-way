import { AboutBlock } from "components/blocks/aboutBlock/AboutBlock"
import { ContactsBlock } from "components/blocks/contactsBlock/ContactsBlock"
import { FriendsBlock } from "components/blocks/friendsBlock/FriendsBlock"
import { HeaderBlock } from "components/blocks/headerBlock/HeaderBlock"
import { PostsBlock } from "components/blocks/postsBlock/PostsBlock"
import styled from "styled-components"
import { theme } from "styles/Theme.styled"

const Profile = styled.main`
    display: grid;
    overflow-y: auto;
    overflow-x: hidden;
    grid-template-rows: auto auto repeat(4, 0.5fr);
    grid-template-columns: 21% 16% 15% 16% 21%;
    @media ${theme.media.mobile} {
        grid-template-rows: auto auto 1fr 1fr;
        grid-template-columns: 1fr 1fr;
    }
`
const Header = styled(HeaderBlock)`
    grid-area: 1 / 1 / 2 / 6;
    @media ${theme.media.mobile} {
        grid-area: 1 / 1 / 2 / 3;
    }
`
const About = styled(AboutBlock)`
    grid-area: 2 / 1 / 3 / 2;
    @media ${theme.media.mobile} {
        grid-area: 2 / 1 / 3 / 2;
    }
`
const Contacts = styled(ContactsBlock)`
    grid-area: 3 / 1 / 4 / 2;
    @media ${theme.media.mobile} {
        grid-area: 2 / 2 / 3 / 3;
    }
`
const Posts = styled(PostsBlock)`
    grid-area: 2 / 2 / 7 / 5;
    @media ${theme.media.mobile} {
        grid-area: 3 / 1 / 7 / 3;
    }
`
const Friends = styled(FriendsBlock)`
    grid-area: 2 / 5 / 3 / 6;
    @media ${theme.media.mobile} {
        display: none;
    }
`
const PossibleFriends = styled(FriendsBlock)`
    grid-area: 3 / 5 / 4 / 6;
    @media ${theme.media.mobile} {
        display: none;
    }
`

export const S = {
    About,
    Contacts,
    Friends,
    Header,
    PossibleFriends,
    Posts,
    Profile,
}
