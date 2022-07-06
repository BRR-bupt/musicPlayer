<script setup lang='ts'>
import { getTarckOrRankDetail } from '~/api/Trackslist'
import type { Track, TrackslistInfo } from '~/utils/model/interface'
import { loadTracks } from '~/utils/loadTracks'
import { useStore } from '~/store/project'

const store = useStore()

const router = useRouter()

const trackslistInfo = reactive<TrackslistInfo>({
  id: 0,
  coverImgUrl: '',
  name: '',
  artistName: '',
  updateTime: 0,
  description: '',
})

const tracks = ref<Track[]>([])

async function loadData() {
  const data = await getTarckOrRankDetail({ id: trackslistInfo.id })

  console.log(data.data.playlist.tracks)

  trackslistInfo.name = data.data.playlist.name
  trackslistInfo.coverImgUrl = data.data.playlist.coverImgUrl
  trackslistInfo.artistName = data.data.playlist.creator.nickname
  trackslistInfo.description = data.data.playlist.description
  trackslistInfo.updateTime = data.data.playlist.updateTime

  // 考虑采用for in实现。因为forEach是异步的，数据全部操作完，才能对完整的tracks渲染
  tracks.value = loadTracks(data.data.playlist.tracks, 0)
  console.log(tracks.value)
}

trackslistInfo.id = Number(router.currentRoute.value.params.id)

loadData()
</script>

<script lang="ts">
export default {
  name: 'Trackslist',
}
</script>

<template>
  <div class="palylist-detail" my-14>
    <TrackslistInfo
      :tracklist-info="trackslistInfo"
      @playlist="store.loadMusicIDList(tracks, tracks[0])"
    />
    <!-- 该模块消耗时间较长，需要优化 -->
    <!-- 设置img loading=lazy -->
    <div class="playlist-tracks" my-8>
      <TrackslistItem
        v-for="(track, i) in tracks" :key="i"
        :track="track"
        @click="store.loadMusicIDList(tracks, track)"
      />
    </div>
  </div>
</template>

<style scoped>
</style>
