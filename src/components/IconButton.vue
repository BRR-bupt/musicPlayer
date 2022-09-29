<script setup lang='ts'>
interface Props {
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

const getStyle = computed(() => {
  if (props.size === 'medium')
    return 'icon-button h-8 w-8 dark:hover:bg-gray-6'
  else if (props.size === 'large')
    return 'icon-button h-10 w-10 dark:hover:bg-gray-6'
})
</script>

<template>
  <div
    :class="getStyle"
    flex justify-center items-center
    rounded-2
    cursor-pointer
    duration-200
    hover:bg-gray-2
  >
    <slot />
  </div>
</template>

<style scoped>
</style>
