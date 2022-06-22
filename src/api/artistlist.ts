import http from '~/utils/request'

interface ArtistListParams {
  type?: number
}

export function getArtistList(params: ArtistListParams) {
  return http.get('/toplist/artist', {
    params,
  })
}
