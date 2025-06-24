interface IFriendData {
  classname?: string
  class_desc?: string
  link_list: IFriendItem[]
}

interface IFriendItem {
  name: string
  link: string
  avatar?: string
  desc?: string
  isAccessDenied?: boolean
}

interface FriendAvatarProps {
  class: string
  name: string
  avatar?: string
}
