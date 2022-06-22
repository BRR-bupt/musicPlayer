<script setup lang='ts'>
const coverImg = 'https://p2.music.126.net/QxJA2mr4hhb9DZyucIOIQw==/109951165422200291.jpg?param=1024y1024'
</script>

<template>
  <div
    class="recommend-card"
    cursor-pointer
    h-50 rounded-4
    overflow-hidden
    flex
    relative
  >
    <img
      :src="coverImg"
    >
    <div
      class="title h-3/4 aspect-1"
      my-a ml-10
      font-bold text-6xl
      grid grid-cols-2
      color-gray-100
      items-center
    >
      <span>每</span>
      <span>日</span>
      <span>推</span>
      <span>荐</span>
    </div>
    <div
      class="play-button h-1/4 aspect-1 rounded-1/2"
      absolute right-6 bottom-6
      color-white
      flex justify-center items-center
      cursor-default
      @click.stop=""
    >
      <div class="w-1/2 h-1/2" i-carbon-timer />
    </div>
  </div>
</template>

<style scoped>
img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  /* animation: move 38s infinite;
  animation-direction: alternate; */
  z-index: -1;
}
/* .title {
  background: linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.28))
} */
.play-button {
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.14);
  transition: 0.2s;
}
.play-button:hover{
  background: rgba(255, 255, 255, 0.28);
}
</style>
