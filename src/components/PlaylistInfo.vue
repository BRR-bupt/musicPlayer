<script setup lang='ts'>
import type { PlaylistDetail, SectionName } from '~/utils/model/interface'
interface Props {
  playlistDetail: PlaylistDetail
  type?: 'artist' | 'playlist'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'playlist',
})

const getMusicCardtype = computed((): SectionName => {
  if (props.type === 'artist')
    return 'Top Artists'
  return 'Recommend'
})
</script>

<template>
  <div class="playlist-info" mt-14 flex>
    <div class="cover-info" w-80 h-80>
      <MusicCard
        :id="playlistDetail.id"
        :img-url="playlistDetail.coverImgUrl"
        :show-shade="true"
        :section-name="getMusicCardtype"
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
        {{ playlistDetail.name }}
      </h1>
      <h3 class="artist" text-xl mt-8>
        Playlist by {{ playlistDetail.artist }}
      </h3>
      <h3 class="update-time" mt-1 text-gray-700 dark:text-gray-400>
        最后更新于 {{ playlistDetail.updateTime }}
      </h3>
      <h3
        class="description hover:text-black hover:dark:text-gray-200"
        mt-8
        text-gray-700 dark:text-gray-400
        cursor-pointer
      >
        {{ playlistDetail.description }}
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
</style>
