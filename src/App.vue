<script setup lang="ts">
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
    <Player />
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
</style>
