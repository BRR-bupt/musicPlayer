// 获取歌曲 url
// 参数为其 id
import http from '~/utils/request'

interface SongURLParams {
  ids: number
}

// 获取歌曲详情
export function getSongDetail(params: SongURLParams) {
  return http.get('/song/detail', {
    params,
  })
}

export function getSongURL(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id.toString()}`
}
