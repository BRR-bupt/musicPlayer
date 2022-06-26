<script setup lang='ts'>
import { useStore } from '~/store/project'

const store = useStore()
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
      <div>1</div>
      <div flex justify-center items-center>
        <audio controls :src="store.currentMusicURL" />
      </div>
      <div>3</div>
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
