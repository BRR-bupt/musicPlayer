import http from '~/utils/request'

export function getRankList() {
  return http.get('/toplist')
}
