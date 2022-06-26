<script setup lang='ts'>
import type { Track } from '~/utils/model/interface'

const props = defineProps<{
  track: Track
}>()

const name = computed(() => {
  if (props.track.alia)
    return `${props.track.name} (${props.track.alia})`

  return props.track.name
})
const getImgUrl = computed(() => {
  return `${props.track.picUrl}?param=224y224`
})
</script>

<template>
  <div
    class="track hover:bg-gray-100 dark:hover:bg-hex-202020"
    h-20
    px-4
    rounded-2
    flex items-center
  >
    <img :src="getImgUrl" w-14 h-14 rounded-2>
    <div
      class="name-artist"
      flex flex-col flex-1
      mx-4
    >
      <h4>{{ name }}</h4>
      <h4>{{ track.artistName }}</h4>
    </div>
    <div class="name" flex flex-1>
      {{ track.albumName }}
    </div>
    <div class="during-time">
      {{ track.duringTime }}
    </div>
  </div>
</template>

<style scoped>
</style>
