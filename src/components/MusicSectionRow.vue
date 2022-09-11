<script setup lang='ts'>
import type { MusicCardInfo, SectionName } from '~/utils/model/interface'

const props = defineProps<{
  sectionName: SectionName
  items: MusicCardInfo[]
}>()

function getImgUrl(item: MusicCardInfo) {
  return `${item.picUrl}?param=512y512`
}
</script>

<template>
  <div
    class="MusicSectionRow" my-6 gap-x-6 gap-y-8 grid
    :class="sectionName === 'Top Artists' ? 'grid-cols-6' : 'grid-cols-5'"
  >
    <div
      v-for="(item, index) in items" :key="index"
    >
      <MusicCard :id="item.id" :section-name="sectionName" :img-url="getImgUrl(item)" />
      <div v-if="item.playCount" class="play-count" text-xs text-gray-400 mt-1 flex>
        <div i-carbon-play />
        {{ item.playCount }}万
      </div>
      <div
        class="text" font-bold text-4 mt-2
        :class="sectionName === 'Top Artists' ? 'text-center' : ''"
      >
        {{ item.name }}
      </div>
      <div
        class="sub-text"
        text-gray-500 text-3
      >
        <h4>{{ item.subText }}</h4>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 970px) {
.text {
  font-size: 0.9rem;
}
.sub-text {
  font-size: 0.6rem;
}
}
</style>
