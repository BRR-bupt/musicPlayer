import http from '~/utils/request'

interface ArtistListParams {
  type?: number
}

export function getArtistList(params: ArtistListParams) {
  return http.get('/toplist/artist', {
    params,
  })
}

/**
 * 获取歌手单曲
 * 说明 : 调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
 * @param {number} id - 歌手 id, 可由搜索接口获得
 */
export function getArtistInfoAndTracks(id: number) {
  return http.get('/artists', {
    params: {
      id,
    },
  })
}
