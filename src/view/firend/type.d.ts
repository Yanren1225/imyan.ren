interface IFirendData {
  classname?: string
  class_desc?: string
  link_list: IFirendItem[]
}

interface IFirendItem {
  name: string
  link: string
  avatar?: string
  descr?: string
  isAccessDenied?: boolean
}

interface FirendAvatarProps {
  class: string
  name: string
  avatar?: string
}
