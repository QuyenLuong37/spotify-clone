import { atom } from 'recoil'

export const playerState = atom({
  key: 'playerState',
  default: null
})

export const isActivePlaybackState = atom({
  key: 'isActivePlaybackState',
  default: false
})
