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
const getStyle = computed(() => {
  if (props.track.fee === 0 || props.track.fee === 8)
    return 'track hover:bg-gray-100 dark:hover:bg-hex-202020'
  else return 'track text-gray-600'
})
const getImgStyle = computed(() => {
  if (props.track.fee === 0 || props.track.fee === 8)
    return ''
  else return 'opacity-50'
})
const getSubTextStyle = computed(() => {
  if (props.track.fee === 0 || props.track.fee === 8)
    return 'text-gray-400'
  else return 'text-gray-600'
})
</script>

<template>
  <div :class="getStyle" flex p-2 rounded-2>
    <img v-lazy="getImgUrl" :class="getImgStyle" w-12 h-12 rounded-1>
    <div class="card-info" flex flex-col justify-center gap-2 ml-2>
      <h4 class="title">
        {{ track.name }} <span v-if="track.alia" :class="getSubTextStyle">({{ track.alia }})</span>
      </h4>
      <h4 :class="getSubTextStyle" text-xs>
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
