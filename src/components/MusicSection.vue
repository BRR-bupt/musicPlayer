<script setup lang='ts'>
import type { MusicCardInfo, SectionName } from '~/utils/model/interface'

const props = defineProps<{
  sectionName: SectionName
  items: MusicCardInfo[]
}>()
</script>

<template>
  <div :class="sectionName" pt-12>
    <h1 font-bold text-2xl>
      {{ sectionName }}
    </h1>
    <MusicSectionRow :section-name="sectionName" :items="items" />
  </div>
</template>

<style scoped>
</style>
