<script setup lang='ts'>
import { getUserDetail, getUserPlaylist, signOut } from '~/api/user'
import type { LoveTracks, MusicCardInfo, User } from '~/utils/model/interface'
import { useStore } from '~/store/project'
const store = useStore()

const loveTracks = reactive<LoveTracks>({
  id: 0,
  name: '',
  tracksCount: 0,
  coverImgUrl: '',
  updateTime: 0,
})

const otherTracks = ref<MusicCardInfo[]>([])

const router = useRouter()
// store.user.id = Number(router.currentRoute.value.params.id)

async function loadData() {
  if (!store.isLogin) {
    console.log('111111111111')
    store.isLogin = true
    store.user.id = Number(router.currentRoute.value.params.id)
    const data = await getUserDetail(store.user.id)
    const profile = data.data.profile
    store.user.avatarUrl = profile.avatarUrl
    store.user.level = data.data.level
    store.user.name = profile.nickname
    store.user.followeds = profile.followeds
    store.user.follows = profile.follows
    store.user.signature = profile.signature
  }

  const playlistTmp = await getUserPlaylist(store.user.id)
  console.log(playlistTmp)
  otherTracks.value = []
  playlistTmp.data.playlist.forEach((playlist: any, i: number) => {
    if (i === 0) {
      loveTracks.id = playlist.id
      loveTracks.coverImgUrl = playlist.coverImgUrl
      loveTracks.name = playlist.name
      loveTracks.tracksCount = playlist.trackCount
      loveTracks.updateTime = playlist.updateTime
    }
    else {
      otherTracks.value.push({
        id: playlist.id,
        name: playlist.name,
        picUrl: playlist.coverImgUrl,
      })
    }
  })
  console.log(loveTracks)
  console.log(otherTracks.value)
}

onActivated(async () => {
  await loadData()
})

// async function check() {
//   console.log(await checkLogin(localStorage.getItem('cookie') as string))
// }
async function logout() {
  await signOut()
  store.$reset()
  console.log(store.$state)
  localStorage.removeItem('uid')
  localStorage.removeItem('cookie')
  router.push('/login')
  console.log('return login')
}
</script>

<template>
  <div class="user" my-14>
    <div class="user-info" flex>
      <div class="cover-info" w-60 h-60>
        <MusicCard
          :id="0"
          :img-url="store.user.avatarUrl"
          :show-shade="true"
          section-name="User"
        />
      </div>
      <div
        class="profile-info"
        justify-center flex flex-col gap-6 ml-30 h-60 relative
      >
        <h2 text-4xl font-bold>
          {{ store.user.name }}
        </h2>
        <div flex gap-10 text-xl>
          <h2>level ： {{ store.user.level }}</h2>
          <h2>粉丝 ：{{ store.user.followeds }}</h2>
          <h2>关注 ：{{ store.user.follows }}</h2>
        </div>

        <div text-gray-400 class="description">
          简介 ：{{ store.user.signature }}
        </div>
        <div>
          <button p-2 rounded bg-green-500 @click="logout()">
            退出登录
          </button>
          <!-- <button @click="check()">
            check
          </button> -->
        </div>
      </div>
    </div>

    <div
      class="love-tracks w-1/1 h-30 dark:hover:bg-gray-7"
      hover:bg-blue-100
      cursor-pointer
      flex my-12
      bg-gray-1 dark:bg-gray-8
      p-2 rounded-2
      duration-200
      @click="router.push(`/trackslist/${loveTracks.id}`)"
    >
      <img v-lazy="loveTracks.coverImgUrl" alt="" class="h-1/1" rounded>
      <div ml-40 flex flex-col justify-center gap-4>
        <h2 text-2xl font-bold>
          {{ loveTracks.name }}
        </h2>
        <h2>歌曲数：{{ loveTracks.tracksCount }}</h2>
      </div>
    </div>

    <div class="other-tracks">
      <h2 font-bold text-2xl>
        其他歌单
      </h2>
      <MusicSectionRow :items="otherTracks" section-name="Recommend" />
    </div>
  </div>
</template>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
