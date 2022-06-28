import { defineStore } from 'pinia'
import { getSongURL } from '~/api/track'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('project', {
  // other options...
  state: () => ({
    count: 0,
    currentMusicID: 0,
    musicIDList: [0],
    listIndex: 0,
  }),
  getters: {
    currentMusicURL(): string {
      return getSongURL(this.currentMusicID)
    },
    // automatically infers the return type as a number
    doubleCount(state): number {
      return state.count * 2
    },
    // the return type **must** be explicitly set
    doublePlusOne(): number {
      // autocompletion and typings for the whole store ✨
      return this.doubleCount + 1
    },
  },
  actions: {
    increase() {
      this.count++
    },
  },
})
