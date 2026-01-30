export interface IFriendData {
    classname?: string
    class_desc?: string
    link_list: IFriendItem[]
}

export interface IFriendItem {
    name: string
    link: string
    avatar?: string
    desc?: string
    isAccessDenied?: boolean
}

export interface FriendAvatarProps {
    class?: string
    name: string
    avatar?: string
}
