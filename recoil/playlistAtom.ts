import { atom } from 'recoil'

export const playlistIdState = atom({
  key: 'playlistIdState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
})


