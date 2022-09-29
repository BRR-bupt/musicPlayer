<script setup lang='ts'>
const props = defineProps<{
  text: string
  active: string
}>()
const emit = defineEmits<{
  (e: 'change-active', value: string): void
}>()
const getStyle = computed(() => {
  if (props.text === props.active)
    return 'text-button bg-blue-3 text-blue-5'
  else
    return 'text-button bg-gray-1 dark:bg-gray-7'
})
</script>

<template>
  <div
    :class="getStyle"
    flex justify-center items-center
    rounded-2
    cursor-pointer
    px-4 py-2
    duration-200
    hover:bg-blue-3 hover:text-blue-5
    @click="emit('change-active', props.text)"
  >
    <p font-bold text-xl>
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
</style>
