import { atom } from 'recoil'

export const playlistIdState = atom({
  key: 'playlistIdState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})
export const playerState = atom({
  key: 'playerState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
})

