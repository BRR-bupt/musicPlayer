// 各类卡片信息，如歌单、艺人、专辑、排行榜卡片均使用此接口
export interface MusicCardInfo {
  id: number
  picUrl: string
  name: string
  subText?: string
  playCount?: number
}

export type SectionName = 'User' | 'By Apple Music' | 'Recommend' | 'For You' | 'Top Artists' | 'New Album' | 'Rank List'

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
  fee: number
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

export interface User {
  id: number
  name: string
  avatarUrl: string
  level: number
  followeds: number
  follows: number
  signature: string
}

export interface LoveTracks {
  id: number
  name: string
  tracksCount: number
  coverImgUrl: string
  updateTime: number
}

