<script setup lang='ts'>
import { useStore } from '~/store/project'
import { getLyrics } from '~/api/track'

const emits = defineEmits<{
  (e: 'play-pre'): void
  (e: 'playNext'): void
  (e: 'pause'): void
  (e: 'play'): void
}>()

const store = useStore()

const getImgUrl = computed(() => {
  return `${store.currentTrack.picUrl}?param=512y512`
})

let lyrics = ''
async function loadData() {
  const res = await getLyrics(store.currentMusicID)
  console.log(res)
  lyrics = res.data.lrc.lyric
  refactoryLyrics(lyrics)
}

const pattTime = /[0-9]{2}:[0-9]{2}/
const pattLyric = /(?<=\]).*/
let timeArray: number[] = []
let lyricsArray: string[] = []
function refactoryLyrics(lyrics: string) {
  const timeAndLyricsArray = lyrics.split('\n')

  if (!timeAndLyricsArray[timeAndLyricsArray.length - 1])
    timeAndLyricsArray.pop()

  // 待修改
  // lyricsArray = timeAndLyricsArray
  lyricsArray = []
  timeAndLyricsArray.forEach((item: string) => {
    const data = pattLyric.exec(item)
    if (data)
      lyricsArray.push(data[0])
  })

  const timeTmpArr: string[] = []
  timeAndLyricsArray.forEach((item: string) => {
    const data = pattTime.exec(item)
    if (data)
      timeTmpArr.push(data[0])
  })

  // 清空时间数组，并重新计算秒数，赋值填充
  timeArray = []
  timeTmpArr.forEach((item) => {
    const min = item.slice(0, 2)
    const sec = item.slice(3, 5)
    const total = Number(min) * 60 + Number(sec)
    timeArray.push(total)
  })
}

watch(() => store.currentMusicID, () => {
  loadData()
})

const currentLyric = ref('')

// duration是总时间/s, prograss是当前时间/s
// 待删除或注释掉
watch(() => store.prograss, () => {
  if (timeArray.includes(Math.floor(store.prograss)))
    currentLyric.value = lyricsArray[timeArray.indexOf(Math.floor(store.prograss))]
})

// const lyric = computed((): string => {
//   return currentLyric.value
// })
</script>

<template>
  <div class="lyrics">
    <div class="left" flex flex-col flex-1 justify-center items-end mr-10>
      <div h-100 w-100>
        <img :src="getImgUrl" alt="" rounded-1>
      </div>
      <div class="info" flex-col w-100 my-4>
        <div mb-1 text-2xl>
          {{ store.currentTrack.name }}
        </div>
        <div text-xl text-gray-5>
          {{ store.currentTrack.artistName }}
        </div>
      </div>
      <div class="control" flex justify-center w-100 border-t>
        <div flex justify-center items-center gap-4 my-4>
          <IconButton @click.stop="emits('play-pre')">
            <div i-fluent-previous-20-filled />
          </IconButton>
          <IconButton
            v-if="!store.isPlaying"
            size="large"
            @click.stop="emits('play')"
          >
            <div class="w-2/3 h-2/3" i-carbon-play-filled-alt />
          </IconButton>
          <IconButton
            v-else
            size="large"
            @click.stop="emits('pause')"
          >
            <div class="w-3/4 h-3/4" i-carbon-pause-filled />
          </IconButton>
          <IconButton @click.stop="emits('playNext')">
            <div i-fluent-next-20-filled />
          </IconButton>
        </div>
      </div>
    </div>
    <div class="right" flex flex-col flex-1 justify-center items-start ml-10 text-2xl>
      {{ currentLyric }}
    </div>

    <div
      w-8 h-8
      rounded
      fixed top-4 right-4
      flex justify-center items-center
      hover:bg-green-2
      duration-200
      cursor-pointer
      @click="store.showLyrics = false"
    >
      <div i-carbon:chevron-down />
    </div>
  </div>
</template>

<style scoped>
.lyrics {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  background: rgb(173, 207, 194);
  display: flex;
  /* clip: rect(auto, auto, auto, auto); */
}
.dark .lyrics {
  background: rgb(33, 32, 32);
}
</style>
