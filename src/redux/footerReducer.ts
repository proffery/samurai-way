export type SocialLinkStateType = {
    id: number
    name: string
    href: string
    icon_id: string
    viewBox: string
}
export type FooterStateType = {
    socialLinks: SocialLinkStateType[]
}

const initialState: FooterStateType = {
    socialLinks: [
        {
            id: 1,
            name: "Facebook",
            href: "#",
            icon_id: "facebook",
            viewBox: "0 0 24 24",
        },
        {
            id: 2,
            name: "Twitter",
            href: "#",
            icon_id: "twitter",
            viewBox: "0 0 24 24",
        },
        {
            id: 3,
            name: "Linkedin",
            href: "#",
            icon_id: "linkedin",
            viewBox: "0 0 24 24",
        },
        {
            id: 4,
            name: "Instagram",
            href: "#",
            icon_id: "instagram",
            viewBox: "0 0 24 24",
        },
        {
            id: 5,
            name: "YouTube",
            href: "#",
            icon_id: "youtube",
            viewBox: "0 0 24 24",
        },
        {
            id: 6,
            name: "RSS",
            href: "#",
            icon_id: "rss",
            viewBox: "0 0 24 24",
        },
    ]
}

const footerReducer = (state: FooterStateType = initialState, action: any): FooterStateType => {
    return state
}

export default footerReducer