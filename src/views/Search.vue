<script setup lang='ts'>
import { loadTracks } from '~/utils/loadTracks'
import { getSearch } from '~/api/search'
import type { MusicCardInfo, Track } from '~/utils/model/interface'
import { getSongDetail } from '~/api/track'
import { useStore } from '~/store/project'

const store = useStore()

const router = useRouter()

// const store = useStore()

const typeTable = {
  all: 1018,
  musicVideos: 1004,
  tracks: 1,
  albums: 10,
  artists: 100,
  playlists: 1000,
}
type TypeTable = 'all' | 'musicVideos' | 'tracks' | 'albums' | 'artists' | 'playlists'

const artists = ref<MusicCardInfo[]>([])
const albums = ref<MusicCardInfo[]>([])
const tracks = ref<Track[]>([])

async function Search(type: TypeTable = 'all', limit = 30) {
  return await getSearch({
    keywords: router.currentRoute.value.params.keywords as string,
    type: typeTable[type],
    limit,
  })
}

async function loadData() {
  const data = await Search('all')
  const result = data.data.result
  // console.log(data)
  result.artist.artists.forEach((artist: any) => {
    artists.value.push({
      id: artist.id,
      picUrl: artist.img1v1Url,
      name: artist.name,
    })
  })
  result.album.albums.forEach((album: any) => {
    albums.value.push({
      id: album.id,
      picUrl: album.picUrl,
      name: album.name,
      subText: album.artist.name,
    })
  })
  // console.log(artists.value)

  const tracksData = await Search('tracks', 16)
  const tracksIds = tracksData.data.result.songs.map((track: any) => track.id)
  const ids = tracksIds.join(',')
  const songs = await getSongDetail({ ids })
  tracks.value = loadTracks(songs.data.songs)
}

function initData() {
  artists.value = []
  albums.value = []
  tracks.value = []
}

function setImgSize(imgUrl: string) {
  return `${imgUrl}?param=224y224`
}

watch(
  () => router.currentRoute.value.params.keywords,
  () => {
    if (!router.currentRoute.value.params.keywords)
      return
    initData()
    loadData()
  },
  { immediate: true },
)
</script>

<script lang="ts">
export default {
  name: 'Search',
}
</script>

<template>
  <div class="search" mt-14>
    <div class="artists-albums" flex gap-30>
      <div class="artists" flex flex-wrap flex-1>
        <div class="title w-1/1" flex justify-between text-2xl font-bold mb-6>
          艺人
          <router-link pt-1 text-gray-500 text-xl to="">
            查看更多
          </router-link>
        </div>
        <div class="artist-card w-1/1" grid grid-cols-3 gap-6>
          <div v-for="(artist, index) in artists" :key="index">
            <MusicCard
              :id="artist.id"
              :img-url="setImgSize(artist.picUrl)"
              section-name="Top Artists"
            />
            <div text-center text-xl mt-4>
              <h2>
                {{ artist.name }}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div class="albums" flex flex-wrap flex-1>
        <div class="title w-1/1" flex justify-between text-2xl font-bold mb-6>
          专辑
          <router-link pt-1 text-gray-500 text-xl to="">
            查看更多
          </router-link>
        </div>
        <div class="album-card w-1/1" grid grid-cols-3 gap-6>
          <div v-for="(album, index) in albums" :key="index">
            <MusicCard
              :id="album.id"
              :img-url="setImgSize(album.picUrl)"
              section-name="New Album"
            />
            <div mt-2>
              <h2>
                {{ album.name }}
              </h2>
              <h4 text-gray-500 text-xs>
                {{ album.subText }}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="tracks" mt-14>
      <div class="title w-1/1" flex justify-between text-2xl font-bold mb-6>
        歌曲
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
/* .title{
  display: flex;
  align-items: center;
  height: 2rem;
} */
.artist-card {
  align-content: flex-start;
}
</style>
