import http from '~/utils/request'

interface NewAlbumParams {
  area: string
  limit: number
}

export function getNewAlbum(params: NewAlbumParams) {
  return http.get('/album/new', {
    params,
  })
}

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param {number} id
 */
export function getAlbumInfo(id: number) {
  return http.get('/album', {
    params: {
      id,
    },
  })
}
