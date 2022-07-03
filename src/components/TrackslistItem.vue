<script setup lang='ts'>
import type { Track } from '~/utils/model/interface'

const props = defineProps<{
  track: Track
}>()

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

const formatTime = computed(() => {
  const time = Math.floor(props.track.duringTime / 1000)
  const minute = Math.floor(time / 60)
  let second: number | string = time % 60
  if (second < 10)
    second = `0${second}`

  return `${minute} : ${second}`
})
</script>

<template>
  <div
    :class="getStyle"
    h-20
    px-4
    rounded-2
    flex items-center
  >
    <img v-lazy="getImgUrl" :class="getImgStyle" w-14 h-14 rounded-2>
    <div
      class="name-artist"
      flex flex-col flex-1
      mx-4
    >
      <h4>{{ track.name }} <span v-if="track.alia" :class="getSubTextStyle">({{ track.alia }})</span></h4>
      <h4 :class="getSubTextStyle">
        {{ track.artistName }}
      </h4>
    </div>
    <div class="name" flex flex-1>
      {{ track.albumName }}
    </div>
    <div class="during-time">
      {{ formatTime }}
    </div>
  </div>
</template>

<style scoped>
</style>
