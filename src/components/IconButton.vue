<script setup lang='ts'>
interface Props {
  size?: 'small' | 'medium' | 'large'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
})

const getStyle = computed(() => {
  if (props.size === 'medium')
    return 'icon-button h-8 w-8'
  else if (props.size === 'large')
    return 'icon-button h-10 w-10'
})
</script>

<template>
  <div
    :class="getStyle"
    flex justify-center items-center
    rounded-2
    cursor-pointer
    hover:bg-gray-600
  >
    <slot />
  </div>
</template>

<style scoped>
</style>
