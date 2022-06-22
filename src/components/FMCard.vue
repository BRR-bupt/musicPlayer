<script setup lang='ts'>
const text = ref('示例标题')
const subtext = ref('示例标题')

const coverImg = ref('https://p3.music.126.net/T8KLtFV8FFLoRsf4X1QknA==/109951167527514863.jpg?param=512y512')
</script>

<template>
  <div
    class="fm-card"
    bg-gray-800
    h-50 rounded-4
    overflow-hidden
    flex
    relative
    color-gray-100
  >
    <div
      class="music-card h-4/5 aspect-1"
      rounded-2
      my-a ml-5
      cursor-pointer
    >
      <img rounded-2 :src="coverImg" alt="">
    </div>
    <div
      class="fm-control h-4/5"
      rounded-2
      my-a ml-5 mr-5
      relative
    >
      <h2
        font-bold text-2xl
      >
        {{ text }}
      </h2>
      <h4 mt-2 text-gray-400>
        {{ subtext }}
      </h4>
      <div
        class="fm-control-button"
        absolute bottom-0 left-0
        flex gap-2
      >
        <IconButton>
          <div i-carbon-timer />
        </IconButton>
        <IconButton>
          <div i-carbon-timer />
        </IconButton>
        <IconButton>
          <div i-carbon-timer />
        </IconButton>
      </div>
    </div>
    <div absolute right-6 bottom-6 flex items-center gap-1 text-gray-600 font-bold>
      <div inline-block i-carbon-timer />
      私人FM
    </div>
  </div>
</template>

<style scoped>
</style>
