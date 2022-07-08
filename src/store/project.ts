import { defineStore } from 'pinia'
import { getSongURL } from '~/api/track'
import type { Track, User } from '~/utils/model/interface'

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('project', {
  // other options...
  state: () => ({
    currentMusicID: 0,
    musicIDList: <number[]>[0],
    currentTrack: <Track>{},
    tracks: <Track[]>[],
    user: <User>{
      id: 0,
      name: '',
      avatarUrl: '',
      level: 0,
      followeds: 0,
      follows: 0,
      signature: '',
    },
    isLogin: false,
  }),
  getters: {
    // isLogin(): boolean {
    //   return !!localStorage.getItem('uid')
    // },
    listIndex(): number {
      return this.musicIDList.indexOf(this.currentMusicID)
    },
    currentMusicURL(): string {
      return getSongURL(this.currentMusicID)
    },
    nextMusicID(): number {
      if (this.currentMusicID === this.musicIDList[-1])
        return this.currentMusicID
      return this.musicIDList[this.listIndex + 1]
    },
    nextMusicUrl(): string {
      return getSongURL(this.nextMusicID)
    },
    preMusicID(): number {
      if (!this.listIndex)
        return this.currentMusicID
      return this.musicIDList[this.listIndex - 1]
    },
    preMusicUrl(): string {
      return getSongURL(this.preMusicID)
    },
  },
  actions: {
    changeToNextMusicID() {
      this.currentMusicID = this.nextMusicID
      this.currentTrack = this.tracks[this.listIndex]
    },
    changeToPreMusicID() {
      this.currentMusicID = this.preMusicID
      this.currentTrack = this.tracks[this.listIndex]
    },
    loadMusicIDList(tracks: Track[], currentTrack: Track) {
      this.currentTrack = currentTrack
      this.tracks = tracks
      // 存储当前 music id
      this.currentMusicID = currentTrack.id
      localStorage.setItem('currentMusicID', this.currentMusicID.toString())

      // 存储 music 列表的 ids 信息
      this.musicIDList = tracks.map((track) => {
        return track.id
      })
      // localStorage.setItem('musicIDList', this.currentMusicID.toString())
    },
  },
})
