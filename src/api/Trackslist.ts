// 获取首页歌单、专辑卡片的详情歌曲请求
// 参数为其 id
import http from '~/utils/request'

interface PlaylistParams {
  id: number
}

// 获取歌单或排行榜详情
export function getTarckOrRankDetail(params: PlaylistParams) {
  return http.get('/playlist/detail', {
    params,
  })
}

export function getHighQualityTracks(cat?: string, limit?: number, before?: number) {
  return http.get('/top/playlist/highquality', {
    params: {
      cat,
      limit,
      before,
    },
  })
}

// // 获取专辑详情
// export function getAlbumDetail(params: PlaylistParams) {
//   return http.get('/album/detail', {
//     params,
//   })
// }
