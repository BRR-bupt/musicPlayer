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

  console.log(data)

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
  console.log(tracks.value)
}

// keepalive中组件不会被销毁，所以没有需要一个特殊的钩子函数
// onActivated 在路由激活时调用
onMounted(async () => {
  playlistDetail.id = Number(router.currentRoute.value.params.id)
  await getPlaylistDetail()
})
</script>

<script lang="ts">
export default {
  name: 'Playlist',
}
</script>

<template>
  <div class="palylist-detail" mt-14>
    <div class="playlist-info" flex>
      <div class="cover-info" w-80 h-80>
        <MusicCard
          :id="playlistDetail.id"
          :img-url="playlistDetail.coverImgUrl"
          :show-shade="true"
        />
      </div>
      <div
        class="text-info"
        h-80
        relative
        flex flex-1 flex-col
        ml-20
      >
        <h1 class="name" font-bold text-4xl>
          {{ playlistDetail.name }}
        </h1>
        <h3 class="artist" text-xl mt-8>
          Playlist by {{ playlistDetail.artist }}
        </h3>
        <h3 class="update-time" mt-1 text-gray-700 dark:text-gray-400>
          最后更新于 {{ playlistDetail.updateTime }}
        </h3>
        <h3
          class="description hover:text-black hover:dark:text-gray-200"
          mt-8
          text-gray-700 dark:text-gray-400
          cursor-pointer
        >
          {{ playlistDetail.description }}
        </h3>
        <div
          class="control-button"
          flex gap-10
          absolute bottom-0
        >
          <button border-1 rounded-1 p-2>
            123
          </button>
          <button border-1 rounded-1 p-2>
            123
          </button>
          <button border-1 rounded-1 p-2>
            123
          </button>
        </div>
      </div>
    </div>
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
