<script setup lang='ts'>
import type { TrackslistInfo } from '~/utils/model/interface'
defineProps<{
  tracklistInfo: TrackslistInfo
}>()

const emit = defineEmits<{
  (e: 'playlist'): void
}>()

// const getMusicCardtype = computed((): SectionName => {
//   if (props.type === 'artist')
//     return 'Top Artists'
//   return 'Recommend'
// })
</script>

<template>
  <div class="playlist-info" flex>
    <div class="cover-info" w-80 h-80>
      <MusicCard
        :id="tracklistInfo.id"
        :img-url="tracklistInfo.coverImgUrl"
        :show-shade="true"
      />
    </div>
    <div
      class="text-info"
      h-80
      relative
      flex flex-1 flex-col
      ml-20
    >
      <h1 class="name" font-bold text-4xl>
        {{ tracklistInfo.name }}
      </h1>
      <h3 class="artist" text-xl mt-8>
        Playlist by {{ tracklistInfo.artistName }}
      </h3>
      <h3 class="update-time" mt-1 text-gray-700 dark:text-gray-400>
        最后更新于 {{ tracklistInfo.updateTime }}
      </h3>
      <h3
        class="description hover:text-black hover:dark:text-gray-200"
        mt-8
        text-gray-700 dark:text-gray-400
        cursor-pointer
      >
        {{ tracklistInfo.description }}
      </h3>
      <div
        class="control-button"
        flex gap-10
        absolute bottom-0
      >
        <div
          flex gap-1 items-center
          rounded-2
          p-2
          bg-green-500
          cursor-pointer
          hover:bg-green-400
          @click="emit('playlist')"
        >
          <div i-carbon-play-filled-alt />
          <h4 font-bold>
            play
          </h4>
        </div>
        <button border-1 rounded-1 p-2>
          123
        </button>
        <button border-1 rounded-1 p-2>
          123
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  cursor: pointer;
}
@media(max-width: 970px) {
  .description{
    margin-top: 1rem;
  }
  .artist {
    margin-top: 1rem;
  }
}
</style>
