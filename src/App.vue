<script setup lang="ts">
import type Player from './components/Player.vue'
import FMCardVue from './components/FMCard.vue'
import { getUserDetail } from '~/api/user'
import { useStore } from '~/store/project'
const store = useStore()

async function loadData() {
  if (localStorage.getItem('uid')) {
    store.isLogin = true
    store.user.id = Number(localStorage.getItem('uid'))
    const data = await getUserDetail(store.user.id)
    const profile = data.data.profile
    store.user.avatarUrl = profile.avatarUrl
    store.user.level = data.data.level
    store.user.name = profile.nickname
    store.user.followeds = profile.followeds
    store.user.follows = profile.follows
    store.user.signature = profile.signature
  }
}

loadData()

const player = ref<typeof Player>()
function playPre() {
  player.value?.playPre()
}
function playNext() {
  player.value?.playNext()
}
function pause() {
  player.value?.player._pause()
}
function play() {
  player.value?.player._play()
}
</script>

<template>
  <main font-sans select-none px-40 py-12>
    <Navbar />
    <div id="main" class="main">
      <router-view v-slot="{ Component }">
        <keep-alive exclude="Trackslist,Search,Artist,Album">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <Player ref="player" />
    <Transition name="slide-up">
      <Lyrics
        v-show="store.showLyrics"
        @play-pre="playPre"
        @play-next="playNext"
        @play="play"
        @pause="pause"
      />
    </Transition>
  </main>
</template>

<style scoped>
@media(max-width: 1280px) {
main {
  padding: 3rem 4rem;
}
}
@media(max-width: 970px) {
main {
  padding: 3rem 1rem;
}
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
