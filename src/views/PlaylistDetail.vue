<script setup lang='ts'>
import { getTarckOrRankDetail } from '~/api/playlistDetail'
import { getSongURL } from '~/api/songUrl'
import type { PlaylistDetail, Track } from '~/utils/model/interface'
import { useStore } from '~/store/project'

const store = useStore()
const router = useRouter()

const playlistDetail = reactive<PlaylistDetail>({
  id: 0,
  coverImgUrl: '',
  name: '',
  artist: '',
  updateTime: 0,
  description: '',
})

const tracks = ref<Track[]>([])

async function getPlaylistDetail() {
  const data = await getTarckOrRankDetail({ id: playlistDetail.id })

  // console.log(data)

  playlistDetail.name = data.data.playlist.name
  playlistDetail.coverImgUrl = data.data.playlist.coverImgUrl
  playlistDetail.artist = data.data.playlist.creator.nickname
  playlistDetail.description = data.data.playlist.description
  playlistDetail.updateTime = data.data.playlist.updateTime

  tracks.value = []
  data.data.playlist.tracks.forEach((item: any) => {
    tracks.value.push({
      id: item.id,
      name: item.name,
      alia: item.alia[0],
      picUrl: item.al.picUrl,
      artistID: item.ar[0].id,
      artistName: item.ar[0].name,
      albumID: item.al.id,
      albumName: item.al.name,
      duringTime: item.dt,
    })
  })
  // console.log(tracks.value)
}

// onMounted(async () => {
//   playlistDetail.id = Number(router.currentRoute.value.params.id)
//   await getPlaylistDetail()
// })
playlistDetail.id = Number(router.currentRoute.value.params.id)
getPlaylistDetail()
</script>

<script lang="ts">
export default {
  name: 'Playlist',
}
</script>

<template>
  <div class="palylist-detail">
    <PlaylistInfo :playlist-detail="playlistDetail" />
    <!-- 该模块消耗时间较长，需要优化 -->
    <!-- 设置img loading=lazy -->
    <div class="playlist-tracks" my-8>
      <PlaylistItem
        v-for="(track, i) in tracks" :key="i"
        :track="track"
        @click="store.currentMusicURL = getSongURL(track.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: pointer;
}

@media(max-width: 970px) {
  .description{
    margin-top: 1rem;
  }
  .artist {
    margin-top: 1rem;
  }
}
</style>
