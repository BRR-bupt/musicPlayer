<script setup lang='ts'>
import type { StyleValue } from 'vue'
import { isDark, toggleDark } from '~/composables/index'
const router = useRouter()

const focus = ref(false)

const placeholder = computed(() => {
  if (focus.value)
    return ''
  return '搜索'
})
const getSearchStyle = computed(() => {
  if (focus.value)
    return 'bg-blue-200 color-blue-400 dark:bg-gray-700'
  return 'bg-gray-100 color-gray-400 dark:bg-gray-800'
})

const getHStyle = computed(() => {
  return function (route: string) {
    let str1 = ''
    let str2 = ''
    if (!isDark.value)
      str1 = 'hover:bg-gray-100'
    if (router.currentRoute.value.name === route)
      str2 = 'text-blue-600'
    return `${str1} ${str2}`
  }
})

// const getInputStyle = computed(() => {
//   if (focus.value)
//     return 'bg-blue-200 color-blue-400'
//   return 'bg-gray-200 color-blue-400'
// })
function inputFocus() {
  focus.value = true
  console.log(router.currentRoute.value.name)
}
function inputUnfocus() {
  focus.value = false
}
</script>

<template>
  <header
    fixed right-0 left-0 top-0
    z-100
    px-40
    dark:bg-hex-121212 dark:bg-opacity-80
  >
    <nav flex justify-center items-center h-15>
      <div flex flex-1 class="navigation-buttons">
        <router-link to="/">
          <h1 text-3xl font-bold>
            Music
          </h1>
        </router-link>
        <div>
          <button icon-btn @click="toggleDark()">
            <div dark:i-carbon-moon i-carbon-sun />
          </button>
        </div>
      </div>
      <div flex flex-1 gap-10 justify-center items-center class="navigation-link">
        <router-link to="/">
          <h1
            text-xl font-bold p-2 rounded
            :class="getHStyle('home')"
          >
            首页
          </h1>
        </router-link>
        <router-link to="/explore">
          <h1
            text-xl font-bold p-2 rounded
            :class="getHStyle('explore')"
          >
            发现
          </h1>
        </router-link>
        <router-link to="/library">
          <h1
            text-xl font-bold p-2 rounded
            :class="getHStyle('library')"
          >
            音乐库
          </h1>
        </router-link>
      </div>
      <div flex flex-1 gap-4 justify-end items-center>
        <div
          h-8 w-50
          rounded
          flex gap-1 justify-center items-center
          :class="getSearchStyle"
        >
          <div i-carbon-search />
          <input
            type="search"
            h-6 w-40
            font-bold
            :class="getSearchStyle"
            :placeholder="placeholder"
            @focus="inputFocus()"
            @blur="inputUnfocus()"
          >
        </div>
        <button h-8 w-8 border-2 rounded-4>
          u
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  backdrop-filter: saturate(180%) blur(20px);
  background-color: rgba(255, 255, 255, 0.86);
}
@media(max-width: 1280px) {
  header {
    padding: 0rem 4rem;
  }
}
@media (max-width: 970px) {
  .navigation-buttons {
    flex: unset;
  }
  .navigation-link {
    gap: 1rem;
  }
  header {
    padding: 0rem 1rem;
  }
}
</style>
