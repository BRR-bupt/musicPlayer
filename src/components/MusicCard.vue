<script setup lang='ts'>
import type { StyleValue } from 'vue'
import type { SectionName } from '~/utils/model/interface'

interface Props {
  id: number
  sectionName?: SectionName
  imgUrl: string
  showShade?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  sectionName: 'New Album',
  showShade: false,
})

const getImgUrl = computed(() => {
  return `${props.imgUrl}?param=512y512`
})

const router = useRouter()

const focus = ref(false)

const getShadowStyle = computed((): StyleValue => {
  const styles: StyleValue = {}
  styles.backgroundImage = `url(${getImgUrl.value})`
  if (props.sectionName === 'Top Artists')
    styles.borderRadius = '50%'
  return styles
})

function goToPlaylist() {
  console.log(`gotoplaylist ${props.id}`)
  router.push(`/playlistdetail/${props.id}`)
}
function play() {
  console.log(`play ${props.id}`)
}
</script>

<template>
  <div
    class="music-card w-1/1 aspect-1" relative
    cursor-pointer
    @mouseover="focus = true"
    @mouseleave="focus = false"
    @click="goToPlaylist()"
  >
    <img :src="getImgUrl" alt="" :class="sectionName === 'Top Artists' ? 'rounded-1/2' : 'rounded-2'">

    <div
      v-show="focus"
      class="shade w-1/1 aspect-1"
      absolute top-0 left-0
      flex justify-center items-center
    >
      <div
        class="play-button w-1/5 h-1/5 rounded-1/2"
        color-white
        flex justify-center items-center
        cursor-default
        @click.stop="play()"
      >
        <div class="w-1/2 h-1/2" i-carbon-play-filled-alt />
      </div>
    </div>

    <transition name="fade">
      <div
        v-show="focus || showShade"
        class="card-shadow w-1/1 aspect-1"
        :style="getShadowStyle"
        absolute top-4 left-0
        flex justify-center items-center
      />
    </transition>
  </div>
</template>

<style scoped>
.play-button {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.14);
  transition: 0.2s;
}
.play-button:hover{
  background: rgba(255, 255, 255, 0.28);
}
.card-shadow {
  background-size: cover;
  border-radius: 0.5rem;
  filter: blur(16px) opacity(0.6);
  transform: scale(0.92, 0.96);
  z-index: -1;
}

.fade-enter-active,.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
