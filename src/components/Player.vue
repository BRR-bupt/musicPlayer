<script setup lang='ts'>
import { useStore } from '~/store/project'

const store = useStore()
const getCurrentMusicUrl = computed(() => {
  return 'https://music.163.com/song/media/outer/url?id=1393659632'
})
</script>

<template>
  <div
    v-show="true"
    class="player w-1/1 h-14"
    fixed right-0 left-0 bottom-0
    bg-gray-100
    dark:bg-gray-900
  >
    <div
      class="process w-1/1 h-0.5"
      bg-gray-200
      dark:bg-gray-500
    />
    <div class="control" px-40 grid grid-cols-3>
      <div>1</div>
      <div>
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
