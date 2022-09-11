<script setup lang='ts'>
import { getHighQualityTracks } from '~/api/Trackslist'
import type { CatInfo, MusicCardInfo } from '~/utils/model/interface'
import { playlistCategories } from '~/utils/staticData'
const active = ref('全部')
const playlists = ref<MusicCardInfo[]>([])

const showCatlist = ref([''])
const bigCatlist = ['语种', '风格', '场景', '情感', '主题']

const allCatlist: CatInfo[][] = []
const showAllcat = ref(false)

function initCatData() {
  for (let i = 0; i < bigCatlist.length; i++) {
    allCatlist[i] = playlistCategories.filter((item) => {
      return item.bigCat === bigCatlist[i]
    })
  }
  console.log(allCatlist)

  if (localStorage.getItem('catlist')) {
    const catlistTmp = localStorage.getItem('catlist')
    showCatlist.value = catlistTmp!.split(',')
  }
  else {
    showCatlist.value = ['全部', '流行', '古典', 'ACG', '欧美', '电子', '摇滚', '说唱']
  }
}

function handleActive(val: string) {
  if (active.value === val)
    return
  active.value = val
  loadData()
}

async function loadData() {
  playlists.value = []
  console.log(`load${active.value}`)
  const data = await getHighQualityTracks(active.value, 20)
  console.log(data)
  data.data.playlists.forEach((playlist: any) => {
    const countTmp = Math.floor(playlist.playCount / 100)
    const count = countTmp / 10
    playlists.value.push({
      id: playlist.id,
      name: playlist.name,
      picUrl: playlist.coverImgUrl,
      playCount: count,
    })
  })
  console.log(playlists.value)
}
loadData()
initCatData()

function toggleCatShowlist(catName: string) {
  if (showCatlist.value.find((cat) => {
    return cat === catName
  })) {
    showCatlist.value = showCatlist.value.filter((cat) => {
      return cat !== catName
    })
    return
  }
  console.log(catName)
  showCatlist.value.push(catName)
}

function toggleShow() {
  showAllcat.value = !showAllcat.value
}
const getStyle = computed(() => {
  if (showAllcat.value) {
    return {
      backgroundColor: 'rgba(59,130,246)',
    }
  }
  return {
    backgroundColor: 'rgba(55,65,81)',
  }
})

// onActivated(() => {
//   console.log('active')
// })
// onDeactivated(() => {
//   console.log('deactive')
//   localStorage.removeItem('catlist')
//   localStorage.setItem('catlist', showCatlist.value.join(','))
// })
onUpdated(() => {
  console.log('update')
  localStorage.removeItem('catlist')
  localStorage.setItem('catlist', showCatlist.value.join(','))
})
</script>

<template>
  <div class="explore" pt-12>
    <h2 font-bold text-4xl>
      发现
    </h2>

    <div mt-4 flex flex-wrap gap-4>
      <TextButton
        v-for="(cat, index) in showCatlist" :key="index"
        :text="cat"
        :active="active"
        @change-active="handleActive"
      />
      <div
        flex justify-center items-center
        rounded-2
        cursor-pointer
        text-2xl
        w-15
        px-4 py-2
        duration-200
        :style="getStyle"
        hover:bg-blue-3 hover:text-blue-5
        @click="toggleShow()"
      >
        ···
      </div>
    </div>

    <div v-if="showAllcat" bg-gray-800 p-4 mt-4 rounded-2>
      <div v-for="(bigCat, i) in bigCatlist" :key="i" flex mb-4>
        <div class="name" text-2xl>
          {{ bigCat }}
        </div>
        <div flex flex-wrap>
          <div
            v-for="(cat, j) in allCatlist[i]" :key="j"
            class="cat"
            :class="{
              active: showCatlist.find((val) => { return val === cat.name }),
            }"
            @click="toggleCatShowlist(cat.name)"
          >
            {{ cat.name }}
          </div>
        </div>
      </div>
    </div>

    <MusicSectionRow
      section-name="Recommend"
      :items="playlists"
    />
  </div>
</template>

<style scoped>
  .name{
    min-width: 5rem;
    min-height: 5rem;
    padding-top: 10px;
  }
  .cat{
    color: aliceblue;
    min-width: 5rem;
    /* min-height: 3rem; */
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .cat.active{
    color: #335eea;
  }
</style>
