import type { Translation } from '../i18n.svelte'

export default {
  hey: 'Hey',
  im: "I'm",
  yanren: 'Yanren',
  access_denied: 'Signal Lost',
  error_loading: 'Loading failed',
  no_friends: 'No friends yet',
  friend_list: 'Teleports',
  my_friend: 'Localhost',
  my_friend_descr: 'nice -20 Game && nice 19 Code',
  friend_info: {
    name: 'Name',
    site_name: 'Site Name',
    address: 'Address',
    avatar: 'Avatar',
    description: 'Description',
  },
  nav: {
    home: '~',
    friend: '/etc/hosts',
    about: '/etc/profile',
    comment: '/var/log',
    travelling: '/dev/random',
  },

  travelling_title: 'Travellings',
  info: [
    'Frontend, Flutter & Android developer with some backend skills.',
    'Passionate about creating interesting projects.',
  ],
  project: 'Project',
} satisfies Translation
