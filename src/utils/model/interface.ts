// interface BaseTrackInfo {
//   id: number
//   picUrl: string
//   name: string
// }

// export interface ByAppleMusic extends BaseTrackInfo {
//   subText: string
// }

// export interface RankList extends BaseTrackInfo {
//   updateFrequency: string
// }

// export interface NewAlbum extends BaseTrackInfo {
//   artistName: string
// }

// 各类卡片信息，如歌单、艺人、专辑、排行榜卡片均使用此接口
export interface MusicCardInfo {
  id: number
  picUrl: string
  name: string
  subText?: string
}

export type SectionName = 'By Apple Music' | 'Recommend' | 'For You' | 'Top Artists' | 'New Album' | 'Rank List'

export interface Track {
  id: number
  picUrl: string
  name: string
  alia: string
  artistID: number
  artistName: string
  albumID: number
  albumName: string
  duringTime: number
}

export interface TrackslistInfo {
  id: number
  coverImgUrl: string
  name: string
  artistID?: number
  artistName: string
  updateTime: number
  description: string
}

export interface Artist {
  id: number
  coverImgUrl: string
  name: string
  description: string
  musicNum: number
  albumNum: number
  mvNum: number
}

