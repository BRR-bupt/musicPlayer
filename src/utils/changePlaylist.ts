import type { Track } from './model/interface'
import { useStore } from '~/store/project'

const store = useStore()

export function changeCurrentMusic(track: Track) {
  store.currentMusicID = track.id
}

export function changePlaylist(tracks: Track[], currentTrack: Track) {
  // 存储当前 music url
  store.currentMusicID = currentTrack.id

  // 获取当前music在musiclists中的索引位置
  store.musicIDList = tracks.map((track) => {
    return track.id
  })
  console.log(store.musicIDList)

  // 存储整个musiclist的url
  // store.musicUrlList = tracksIds.map((trackId) => {
  //   return getSongURL(trackId)
  // })
  // console.log(store.listIndex)
  // console.log(store.musicUrlList)
}
