<script setup lang='ts'>
import type { AxiosResponse } from 'axios'
import { checkLogin, checkQRstate, generationQR, generationQRkey, phoneLogin } from '~/api/user'

type loginMode = 'QR' | 'PHONE' | 'MAIL'
const mode = ref<loginMode>('QR')

const phone = ref('')
const phonePassword = ref('')

const getSearchStyle = computed(() => {
  return 'bg-gray-100 color-gray-400 dark:bg-gray-800'
})

const logining = ref(false)
const loginTip = computed(() => {
  return logining.value ? '登 录 中 . . .' : '登 录'
})

const router = useRouter()
async function login() {
  console.log('login')
  logining.value = true
  const data = await phoneLogin(phone.value, phonePassword.value)
  console.log(data.data)

  if (data.data.code === 200) {
    localStorage.setItem('cookie', data.data.cookie)
    localStorage.setItem('uid', data.data.account.id)
    router.push(`/user/${data.data.account.id}`)
  }

  logining.value = false
}

const qrcode = ref('')
let key = ''
async function loadQR() {
  const data = await generationQRkey()
  console.log(data)
  key = data.data.data.unikey as string
  console.log(key)
  const qrImg = await generationQR(key)
  console.log(qrImg.data.data.qrimg)
  qrcode.value = qrImg.data.data.qrimg
}

let checkTimer: any
let QRstate: AxiosResponse
async function checkQR() {
  checkTimer = setInterval(async () => {
    QRstate = await checkQRstate(key)
    console.log(QRstate.data)
    if (QRstate.data.code === 800) {
      console.log('out date')
      await loadQR()
    }
    else if (QRstate.data.code === 803) {
      const cookie = QRstate.data.cookie as string
      clearInterval(checkTimer)
      console.log('success')
      const loginInfo = await checkLogin(cookie)
      console.log(loginInfo.data.data)
      localStorage.setItem('uid', loginInfo.data.data.account.id)
      localStorage.setItem('cookie', cookie)
      router.push(`/user/${loginInfo.data.data.account.id}`)
    }
  }, 1000)
}

onActivated(async () => {
  await loadQR()
  await checkQR()
})

onDeactivated(() => {
  clearInterval(checkTimer)
})
</script>

<template>
  <div my-14 flex flex-col items-center>
    <img w-20 h-20 src="../assets/netease-music.png" alt="">

    <div class="title" mt-10>
      <h2 text-2xl font-bold>
        登录网易云账号
      </h2>
    </div>

    <div v-if="mode === 'QR'" flex flex-col items-center my-10 gap-2>
      <div w-60 h-60>
        <img class="qrcode w-1/1 aspect-1" :src="qrcode" alt="">
      </div>
      <div mt-2>
        打开网易云音乐APP扫码登录
      </div>
    </div>

    <div v-if="mode === 'PHONE'" flex flex-col items-center my-10 gap-4>
      <div
        h-12 w-80
        rounded
        flex gap-2 justify-center items-center
        :class="getSearchStyle"
      >
        <div i-carbon-phone />
        <h2 text-gray-600 font-bold>
          +86
        </h2>
        <input
          v-model="phone"
          type="text"
          h-10 w-60
          font-bold
          :class="getSearchStyle"
          placeholder="手机号"
        >
      </div>

      <div
        h-12 w-80
        rounded
        flex gap-2 justify-center items-center
        :class="getSearchStyle"
      >
        <div i-carbon-password />
        <input
          v-model="phonePassword"
          type="password"
          h-10 w-70
          font-bold
          :class="getSearchStyle"
          placeholder="密码"
          @keydown.enter="login()"
        >
      </div>

      <button mt-6 h-12 w-80 rounded bg-green-500 hover:bg-green-400 text-xl font-bold @click="login">
        {{ loginTip }}
      </button>
    </div>

    <div v-if="mode === 'MAIL'" flex flex-col items-center my-10 gap-2>
      <h1 text-4xl>
        暂未开发，不支持
      </h1>
      <div
        h-8 w-50
        rounded
        flex gap-2 justify-center items-center
        :class="getSearchStyle"
      >
        <div i-carbon-search />
        <input
          v-model="phone"
          type="search"
          h-6 w-40
          font-bold
          :class="getSearchStyle"
          placeholder=""
        >
      </div>

      <div
        h-8 w-50
        rounded
        flex gap-2 justify-center items-center
        :class="getSearchStyle"
      >
        <div i-carbon-search />
        <input
          v-model="phone"
          type="search"
          h-6 w-40
          font-bold
          :class="getSearchStyle"
          placeholder=""
        >
      </div>
    </div>

    <div class="select-mode" text-gray-400 flex gap-2>
      <button v-if="mode !== 'QR'" @click="mode = 'QR'">
        二维码登录
      </button>
      <!-- <span> | </span> -->
      <button v-if="mode !== 'PHONE'" @click="mode = 'PHONE'">
        手机号登录
      </button>
      <!-- <span> | </span> -->
      <button v-if="mode !== 'MAIL'" @click="mode = 'MAIL'">
        邮箱登录
      </button>
    </div>

    <div v-if="mode === 'PHONE' || mode === 'MAIL'" class="notice" w-80 text-gray-400 mt-8 border-t-1 pt-2 text-xs>
      YiPlayMusic 承诺不会保存你的任何账号信息到云端。
      你的密码会在本地进行 MD5 加密后再传输到网易云 API。
      YiPlayMusic 并非网易云官方网站，输入账号信息前请慎重考虑。 你也可以前往 YiPlayMusic 的 GitHub 源代码仓库 自行构建并使用自托管的网易云 API。
    </div>

    <div id="qrcode" />
  </div>
</template>

<style scoped>
</style>
