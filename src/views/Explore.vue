<script setup lang='ts'>
import { getHighQualityTracks } from '~/api/Trackslist'
import type { MusicCardInfo } from '~/utils/model/interface'
const active = ref('全部')
const playlists = ref<MusicCardInfo[]>([])

function handleActive(val: string) {
  if (active.value === val)
    return
  active.value = val
  loadData()
}

async function loadData() {
  playlists.value = []
  console.log(`load${active.value}`)
  const data = await getHighQualityTracks(active.value, 20)
  console.log(data)
  data.data.playlists.forEach((playlist: any) => {
    const countTmp = Math.floor(playlist.playCount / 100)
    const count = countTmp / 10
    playlists.value.push({
      id: playlist.id,
      name: playlist.name,
      picUrl: playlist.coverImgUrl,
      playCount: count,
    })
  })
  console.log(playlists.value)
}
loadData()
</script>

<template>
  <div class="explore" pt-12>
    <h2 font-bold text-4xl>
      发现
    </h2>
    <div class="select-options" mt-4 flex gap-4>
      <TextButton text="全部" :active="active" @change-active="handleActive" />
      <TextButton text="流行" :active="active" @change-active="handleActive" />
      <TextButton text="古典" :active="active" @change-active="handleActive" />
      <!-- <TextButton text="排行榜" :active="active" @change-active="handleActive" /> -->
      <TextButton text="ACG" :active="active" @change-active="handleActive" />
      <TextButton text="欧美" :active="active" @change-active="handleActive" />
      <TextButton text="电子" :active="active" @change-active="handleActive" />
      <TextButton text="摇滚" :active="active" @change-active="handleActive" />
      <TextButton text="说唱" :active="active" @change-active="handleActive" />
      <TextButton text="···" :active="active" @change-active="handleActive" />
    </div>

    <MusicSectionRow
      section-name="Recommend"
      :items="playlists"
    />
  </div>
</template>

<style scoped>
</style>
