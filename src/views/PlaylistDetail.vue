<script setup lang='ts'>
import { getTarckOrRankDetail } from '~/api/playlistDetail'
import { getSongURL } from '~/api/songUrl'
import type { Track } from '~/utils/model/interface'
import { useStore } from '~/store/project'

const store = useStore()
interface Params {
  id: number
}

const router = useRouter()
const listID = ref<any>()

const tracks = ref<Track[]>([])

async function getTrackDetail() {
  const data = await getTarckOrRankDetail({ id: listID.value.id })
  tracks.value = []
  data.data.playlist.tracks.forEach((item: any) => {
    tracks.value.push({
      id: item.id,
      name: item.name,
      picUrl: item.al.picUrl,
      artist: item.ar[0].name,
      albumID: item.al.id,
      albumName: item.al.name,
    })
  })
}

function geturl() {
  const url = getSongURL(tracks.value[0].id)
  console.log(url)
}

// keepalive中组件不会被销毁，所以没有需要一个特殊的钩子函数
// onActivated 在路由激活时调用
onActivated(async () => {
  listID.value = router.currentRoute.value.params
  await getTrackDetail()
  console.log(tracks.value)
  geturl()

  // console.log(data.data.playlist.tracks)
  // const url = getSongURL(data.data.playlist.tracks[0].id)
  // console.log(url)
})
</script>

<template>
  <div>
    TrackDetail---{{ listID?.id }}
  </div>
  <div class="list">
    <div
      v-for="(track, i) in tracks" :key="i"
      @click="store.currentMusicURL = getSongURL(track.id)"
    >
      {{ track.name }}
    </div>
  </div>
</template>

<style scoped>
</style>
