export const Patch = {
    Home: '/',
    Profile: '/profile/',
    ProfileParams: '/profile/:userId?',
    Messages: '/messages/',
    MessagesParams: '/messages/:userId?',
    Users: '/users',
    Notifications: '/notifications',
    Settings: '/settings',
    NotFound: '/404',
    Login: '/login',
    Other: '*'
} as const