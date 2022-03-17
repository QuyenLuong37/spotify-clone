import { atom } from 'recoil'

export const playerState = atom({
    key: 'playerState', // unique ID (with respect to other atoms/selectors)
    default: null // default value (aka initial value)
  })