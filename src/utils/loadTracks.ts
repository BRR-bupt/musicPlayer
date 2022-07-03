import type { Track } from './model/interface'

/**
 * 重构tracks
 * 说明 : 参数 length = 0 代表不限制长度
 * @param {number} length
 * @param {any[]} tmp
 */
export function loadTracks(tmp: any[], length = 16): Track[] {
  const tracks: Track[] = []
  if (length === 0) {
    tmp.forEach((track) => {
      tracks.push({
        id: track.id,
        name: track.name,
        alia: track.alia[0],
        picUrl: track.al.picUrl,
        artistID: track.ar[0].id,
        artistName: track.ar[0].name,
        albumID: track.al.id,
        albumName: track.al.name,
        duringTime: track.dt,
        fee: track.fee,
      })
    })
  }
  else {
    tmp.forEach((track, i) => {
      if (i >= length)
        return
      tracks.push({
        id: track.id,
        name: track.name,
        alia: track.alia[0],
        picUrl: track.al.picUrl,
        artistID: track.ar[0].id,
        artistName: track.ar[0].name,
        albumID: track.al.id,
        albumName: track.al.name,
        duringTime: track.dt,
        fee: track.fee,
      })
    })
  }
  return tracks
}
