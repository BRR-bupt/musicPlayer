import http from '~/utils/request'

export function phoneLogin(phone: string, password: string) {
  return http.get('login/cellphone', {
    params: {
      phone,
      password,
    },
  })
}

export function generationQRkey() {
  return http.get('/login/qr/key', {
    params: {
      timerstamp: Date.now(),
    },
  })
}

export function generationQR(key: string) {
  return http.get('/login/qr/create', {
    params: {
      key,
      timerstamp: Date.now(),
      qrimg: true,
    },
  })
}

export function checkQRstate(key: string) {
  return http.get('/login/qr/check', {
    params: {
      key,
      timerstamp: Date.now(),
    },
  })
}

export function getUserDetail(uid: number) {
  return http.get('user/detail', {
    params: {
      uid,
    },
  })
}

export function getUserPlaylist(uid: number) {
  return http.get('user/playlist', {
    params: {
      uid,
    },
  })
}

export function checkLogin(cookie: string) {
  return http.post(`/login/status?timerstamp=${Date.now()}`, {
    cookie,
  })
}

export function signOut() {
  return http.get('/logout')
}
