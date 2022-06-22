<script setup lang="ts">

</script>

<template>
  <main font-sans select-none p="x-40 y-4" text="">
    <Navbar />
    <div class="main">
      <router-view v-slot="{ Component }">
        <keep-alive>
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
  padding: 1rem 4rem;
}
}
@media(max-width: 970px) {
main {
  padding: 1rem;
}
}
</style>
