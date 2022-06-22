import http from '~/utils/request'
interface RecommendListParams {
  limit: number
}

export function getRecommendlist(params: RecommendListParams) {
  return http.get('/personalized', {
    params,
  })
}
