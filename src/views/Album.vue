<script setup lang='ts'>
import { getTarckOrRankDetail } from '~/api/Trackslist'
import { getSongURL } from '~/api/track'
import type { Track, TrackslistInfo } from '~/utils/model/interface'
import { loadTracks } from '~/utils/loadTracks'
import { getAlbumInfo } from '~/api/album'
import { useStore } from '~/store/project'

const store = useStore()

// const store = useStore()
const router = useRouter()

const album = reactive<TrackslistInfo>({
  id: 0,
  coverImgUrl: '',
  name: '',
  artistID: 0,
  artistName: '',
  updateTime: 0,
  description: '',
})

const tracks = ref<Track[]>([])

async function loadData() {
  const data = await getAlbumInfo(album.id)

  console.log(data)

  const albumTmp = data.data.album

  album.name = albumTmp.name
  album.coverImgUrl = albumTmp.picUrl
  album.artistID = albumTmp.artist.id
  album.artistName = albumTmp.artist.name
  album.description = albumTmp.description
  album.updateTime = albumTmp.publishTime

  console.log(album)

  // 考虑采用for in实现。因为forEach是异步的，数据全部操作完，才能对完整的tracks渲染
  tracks.value = loadTracks(data.data.songs, 0)
  // console.log(tracks.value)
}

album.id = Number(router.currentRoute.value.params.id)

loadData()
</script>

<script lang="ts">
export default {
  name: 'Album',
}
</script>

<template>
  <div class="palylist-detail" my-14>
    <TrackslistInfo :tracklist-info="album" />
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
