import { atom } from 'recoil'

export const currentTrackIsPlayingState = atom({
    key: 'currentTrackIsPlayingState', // unique ID (with respect to other atoms/selectors)
    default: null, // default value (aka initial value)
  })