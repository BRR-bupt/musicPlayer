<script setup lang='ts'>
import type { Artist } from '~/utils/model/interface'
defineProps<{
  artist: Artist
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
        :id="artist.id"
        :img-url="artist.coverImgUrl"
        :show-shade="true"
        section-name="Top Artists"
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
        {{ artist.name }}
      </h1>
      <h3 class="artist" text-xl mt-8>
        艺人
      </h3>
      <h3 class="update-time" mt-1 text-gray-700 dark:text-gray-400>
        {{ artist.musicNum }} 首歌 · {{ artist.albumNum }} 张专辑 · {{ artist.mvNum }} 个MV
      </h3>
      <h3
        class="description hover:text-black hover:dark:text-gray-200"
        mt-8
        text-gray-700 dark:text-gray-400
        cursor-pointer
      >
        {{ artist.description }}
      </h3>
      <div
        class="control-button"
        flex gap-10
        absolute bottom-0
      >
        <button border-1 rounded-1 p-2>
          123
        </button>
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
</style>
