<script setup lang="ts">
import type { AxiosResponse } from 'axios'
import { byAppleMusic } from '~/utils/staticData'
import { getRecommendlist } from '~/api/recommendlist'
import { getArtistList } from '~/api/artist'
import { getNewAlbum } from '~/api/album'
import { getRankList } from '~/api/ranklist'
import type { MusicCardInfo } from '~/utils/model/interface'

const recommendPlaylist = ref<MusicCardInfo[]>([])
const artistlist = ref<MusicCardInfo[]>([])
const newAlbum = ref<MusicCardInfo[]>([])
const rankList = ref<MusicCardInfo[]>([])
const homeRankListId = [19723756, 180106, 60198, 3812895, 60131]

let res: AxiosResponse

async function loadData() {
  // 获取推荐列表数据并重构
  res = await getRecommendlist({ limit: 10 })
  res.data.result.forEach((item: any) => {
    recommendPlaylist.value.push({
      id: item.id,
      picUrl: item.picUrl,
      name: item.name,
    })
  })

  // 获取歌手列表数据并重构
  res = await getArtistList({ type: 1 })
  for (let i = 0; i < 6; i++) {
    artistlist.value.push({
      id: res.data.list.artists[i].id,
      picUrl: res.data.list.artists[i].img1v1Url,
      name: res.data.list.artists[i].name,
    })
  }
  console.log(artistlist.value)

  // 获取专辑列表数据并重构
  res = await getNewAlbum({
    area: 'All',
    limit: 10,
  })
  res.data.albums.forEach((item: any) => {
    newAlbum.value.push({
      id: item.id,
      picUrl: item.picUrl,
      name: item.name,
      subText: item.artist.name,
    })
  })

  // 获取排行榜列表数据并重构
  res = await getRankList()
  const rankListTemp = res.data.list.filter((item: any) => {
    return homeRankListId.includes(item.id)
  })
  rankListTemp.forEach((item: any) => {
    rankList.value.push({
      id: item.id,
      picUrl: item.coverImgUrl,
      name: item.name,
      subText: item.updateFrequency,
    })
  })
}

// onMounted(async () => {
//   await loadData()
// })
loadData()
</script>

<template>
  <div class="home">
    <MusicSection
      section-name="By Apple Music"
      :items="byAppleMusic"
    />

    <MusicSection
      section-name="Recommend"
      :items="recommendPlaylist"
    />

    <MusicSection
      section-name="Top Artists"
      :items="artistlist"
    />

    <ForYouSection
      section-name="For You"
      :items="artistlist"
    />

    <MusicSection
      section-name="New Album"
      :items="newAlbum"
    />

    <MusicSection
      section-name="Rank List"
      :items="rankList"
    />
  </div>
</template>

<style scoped></style>
