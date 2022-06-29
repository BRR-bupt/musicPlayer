<script setup lang='ts'>
import { getArtistInfoAndTracks } from '~/api/artist'
import type { Artist, Track } from '~/utils/model/interface'
import { loadTracks } from '~/utils/loadTracks'
import { useStore } from '~/store/project'

const store = useStore()

const router = useRouter()

const artist = reactive<Artist>({
  id: 0,
  name: '',
  coverImgUrl: '',
  description: '',
  musicNum: 0,
  albumNum: 0,
  mvNum: 0,
})
artist.id = Number(router.currentRoute.value.params.id)

const tracks = ref<Track[]>([])

async function loadData() {
  // initData()
  const data = await getArtistInfoAndTracks(artist.id)
  console.log(data)
  const artistTmp = data.data.artist
  artist.id = artistTmp.id
  artist.name = artistTmp.name
  artist.coverImgUrl = artistTmp.img1v1Url
  artist.description = artistTmp.briefDesc
  artist.musicNum = artistTmp.musicSize
  artist.albumNum = artistTmp.albumSize
  artist.mvNum = artistTmp.mvSize
  console.log(artist)

  const hotTracks = data.data.hotSongs
  tracks.value = loadTracks(hotTracks)

  console.log(tracks)
}

function initData() {
  tracks.value = []
}

loadData()
</script>

<script lang="ts">
export default {
  name: 'Artist',
}
</script>

<template>
  <div class="artist" my-14>
    <ArtistInfo :artist="artist" />

    <div class="tracks" mt-14>
      <div class="title w-1/1" flex justify-between text-2xl font-bold mb-6>
        热门歌曲
        <router-link flex items-end text-gray-500 text-xl to="">
          查看更多
        </router-link>
      </div>
      <div class="artist-card w-1/1" grid grid-cols-4 gap-x-6 gap-y-4>
        <SearchTrackCard
          v-for="(track, index) in tracks" :key="index"
          :track="track"
          @click="store.loadMusicIDList(tracks, track)"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
