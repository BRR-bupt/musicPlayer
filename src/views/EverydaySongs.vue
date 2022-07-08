<script setup lang='ts'>
import type { Track, TrackslistInfo } from '~/utils/model/interface'
import { loadTracks } from '~/utils/loadTracks'
import { useStore } from '~/store/project'
import { getRecommendSongs } from '~/api/user'

const store = useStore()

const trackslistInfo = reactive<TrackslistInfo>({
  id: 0,
  coverImgUrl: '',
  name: '每日推荐',
  artistName: '网易云音乐',
  updateTime: 0,
  description: '每日推荐，根据登录用户进行个性化推荐',
})

const tracks = ref<Track[]>([])

async function loadData() {
  const data = await getRecommendSongs()

  console.log(data)

  const tracksTmp = data.data.data.dailySongs
  tracks.value = loadTracks(tracksTmp, 0)

  console.log(tracks)

  trackslistInfo.coverImgUrl = tracks.value[0].picUrl
  // trackslistInfo.artistName = data.data.playlist.creator.nickname
  // trackslistInfo.description = data.data.playlist.description
  // trackslistInfo.updateTime = data.data.playlist.updateTime

  // tracks.value = loadTracks(data.data.playlist.tracks, 0)
  // console.log(tracks.value)
}

loadData()

onActivated(() => {
  window.scrollTo({
    top: 0,
    // behavior: 'smooth',
  })
})
</script>

<script lang="ts">
export default {
  name: 'DailySongs',
}
</script>

<template>
  <div class="palylist-detail" my-14>
    <TrackslistInfo
      :tracklist-info="trackslistInfo"
      type="dailySongs"
      @playlist="store.loadMusicIDList(tracks, tracks[0])"
    />
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
