<script setup lang="ts">

</script>

<template>
  <main font-sans select-none px-40 py-12>
    <Navbar />
    <div class="main">
      <router-view v-slot="{ Component }">
        <keep-alive exclude="Playlist,Search">
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
