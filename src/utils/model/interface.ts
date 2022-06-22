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
  artist: string
  albumID: number
  albumName: string
}
