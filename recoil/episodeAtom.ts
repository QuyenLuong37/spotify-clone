import { atom } from 'recoil'

export const savedEpisodeState = atom({
  key: 'savedEpisodeState', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
})