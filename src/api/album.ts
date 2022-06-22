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
