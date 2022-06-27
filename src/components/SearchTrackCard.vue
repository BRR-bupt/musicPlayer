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
  <div class="track-card dark:hover:bg-hex-202020" flex p-2 rounded-2>
    <img :src="getImgUrl" w-12 h-12 rounded-1>
    <div class="card-info" flex flex-col justify-center ml-2>
      <h2 class="title">
        {{ name }}
      </h2>
      <h4 text-gray-400 text-xs>
        {{ track.artistName }}
      </h4>
    </div>
  </div>
</template>

<style scoped>
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
