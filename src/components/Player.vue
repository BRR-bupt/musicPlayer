<script setup lang='ts'>
import { useStore } from '~/store/project'
import Player from '~/utils/player'

const store = useStore()

const player = new Player()

function playNext() {
  player._playAudioSource(store.nextMusicUrl)
  store.changeToNextMusicID()
}

function playPre() {
  player._playAudioSource(store.preMusicUrl)
  store.changeToPreMusicID()
}
</script>

<template>
  <div
    class="player w-1/1 h-16"
    fixed right-0 left-0 bottom-0
    bg-gray-100
    dark:bg-hex-121212
  >
    <div
      class="process w-1/1 h-0.4"
      bg-gray-200
      dark:bg-gray-800
    />
    <div class="control h-1/1" px-40 grid grid-cols-3>
      <div flex justify-center items-center>
        11
      </div>
      <div flex justify-center items-center>
        22
      </div>
      <div flex gap-4>
        <button @click="player._playAudioSource(store.currentMusicURL)">
          load
        </button>
        <button @click="player._play()">
          play
        </button>
        <button @click="player._pause()">
          pause
        </button>
        <button @click="player._stop()">
          stop
        </button>
        <button @click="playNext()">
          next
        </button>
        <button @click="playPre()">
          pre
        </button>
        <!-- <button @click="player._halfVolume()">
          halfVloume
        </button>
        <button @click="player._MaxVolume()">
          max-vloume
        </button> -->
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
</style>
