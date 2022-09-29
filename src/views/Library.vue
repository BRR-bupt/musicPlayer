<script setup lang='ts'>
const router = useRouter()
function toUser() {
  router.push(`/user/${localStorage.getItem('uid')}`)
}
</script>

<template>
  <div pt-12 text-center>
    <div text-3xl>
      登录获取更多
    </div>
    <button
      class="to-button"
      p-4 rounded
      hover:p-6
      bg-gray-1 dark:bg-gray-6
      hover:bg-blue-3 hover:text-blue-5
      duration-200
      mt-10 text-3xl
      @click="toUser"
    >
      Login
    </button>
  </div>
</template>

<style scoped>
  /* .to-button {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  } */
</style>
