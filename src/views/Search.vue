<script setup lang='ts'>
import { getSearch } from '~/api/search'
import type { MusicCardInfo, Track } from '~/utils/model/interface'
import { useStore } from '~/store/project'
import { getSongDetail, getSongURL } from '~/api/songUrl'
const imgUrl = 'http://p1.music.126.net/9aCJYVD0JZ0NckqAn3a_3w==/109951165566993818.jpg'
const router = useRouter()

const store = useStore()

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
  // console.log(result)
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
  console.log(tracksData.data.result.songs)
  // tracksData.data.result.songs.forEach(async (item: any) => {
  //   // const data = await getSongDetail({ ids: item.id })
  //   // console.log(data.data.songs[0].al.picUrl)
  //   tracks.value.push({
  //     id: item.id,
  //     name: item.name,
  //     alia: item.alias[0],
  //     picUrl: item.album.picUrl,
  //     artistID: item.artists[0].id,
  //     artistName: item.artists[0].name,
  //     albumID: item.album.id,
  //     albumName: item.album.name,
  //     duringTime: item.duration,
  //   })
  // })

  // 由于forEach是异步操作，内部无法进行promise逻辑
  // 解决方案一：使用for in替换，但这样的性能差，ajax耗时长
  for (const i in tracksData.data.result.songs) {
    const item = tracksData.data.result.songs[i]
    const data = await getSongDetail({ ids: item.id })
    console.log(data.data.songs[0])
    tracks.value.push({
      id: item.id,
      name: item.name,
      alia: item.alias[0],
      picUrl: data.data.songs[0].al.picUrl,
      artistID: item.artists[0].id,
      artistName: item.artists[0].name,
      albumID: item.album.id,
      albumName: item.album.name,
      duringTime: item.duration,
    })
  }
  console.log(tracks.value)
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
          @click="store.currentMusicURL = getSongURL(track.id)"
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
