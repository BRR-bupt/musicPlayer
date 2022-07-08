<script setup lang='ts'>
import { stringTypeAnnotation } from '@babel/types'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import { useStore } from '~/store/project'
import Player from '~/utils/player'

const store = useStore()

const getSubTextStyle = computed(() => {
  if (store.currentTrack.fee === 0 || store.currentTrack.fee === 8)
    return 'text-gray-400'
  else return 'text-gray-600'
})

const volume = ref(100)

function setImgSize(imgUrl: string) {
  return `${imgUrl}?param=224y224`
}

const player = new Player()

let PreOrNext: 'PRE' | 'NEXT' = 'NEXT'
function playNext() {
  PreOrNext = 'NEXT'
  // player._playAudioSource(store.nextMusicUrl)
  store.changeToNextMusicID()
}

function playPre() {
  PreOrNext = 'PRE'
  // player._playAudioSource(store.preMusicUrl)
  store.changeToPreMusicID()
}

watch(() => store.currentMusicID, () => {
  if (!store.currentMusicID) {
    player._stop()
    return
  }
  if (store.currentTrack.fee === 0 || store.currentTrack.fee === 8) { player._playAudioSource(store.currentMusicURL) }
  else {
    if (PreOrNext === 'NEXT')
      store.changeToNextMusicID()

    else store.changeToPreMusicID()
  }
})

watch(() => volume.value, () => {
  player.volume = volume.value / 100
})
</script>

<template>
  <div
    v-if="store.currentMusicID"
    class="player w-1/1 h-16"
    fixed right-0 left-0 bottom-0
    bg-white
    dark:bg-hex-121212
  >
    <div class="process w-1/1 h-1">
      <vue-slider
        v-model="player.progress"
        :min="0"
        :max="player._duration.value"
        :interval="1"
        :height="1"
        :dot-size="8"
        :lazy="true"
        :silent="true"
        :drag-on-click="true"
      />
    </div>

    <div class="control h-1/1" px-40 grid grid-cols-3>
      <div flex justify-start items-center>
        <img :src="setImgSize(store.currentTrack.picUrl)" class="h-10 aspect-1 rounded-2" alt="">
        <div ml-4>
          <h4 class="title">
            {{ store.currentTrack.name }} <span v-if="store.currentTrack.alia" :class="getSubTextStyle">({{ store.currentTrack.alia }})</span>
          </h4>
          <h4 text-xs text-gray-400 mt-1>
            {{ store.currentTrack.artistName }}
          </h4>
        </div>
      </div>
      <div flex justify-center items-center gap-4>
        <IconButton @click="playPre()">
          <div i-fluent-previous-20-filled />
        </IconButton>
        <IconButton
          v-if="!player._isPlay.value"
          size="large"
          @click="player._play()"
        >
          <div class="w-2/3 h-2/3" i-carbon-play-filled-alt />
        </IconButton>
        <IconButton
          v-else
          size="large"
          @click="player._pause()"
        >
          <div class="w-3/4 h-3/4" i-carbon-pause-filled />
        </IconButton>
        <IconButton @click="playNext()">
          <div i-fluent-next-20-filled />
        </IconButton>
      </div>
      <div flex justify-end items-center gap-2>
        <div i-carbon-volume-down-filled />
        <div class="volume w-1/3">
          <vue-slider v-model="volume" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media(max-width: 1280px) {
.control {
  padding: 0rem 4rem;
}
}
@media(max-width: 970px) {
.control {
  padding: 0rem 1rem;
}
}
.title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
