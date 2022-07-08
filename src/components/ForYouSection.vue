<script setup lang='ts'>
import type { MusicCardInfo, SectionName } from '~/utils/model/interface'

const props = defineProps<{
  sectionName: SectionName
  items: MusicCardInfo[]
}>()

const router = useRouter()
</script>

<template>
  <div :class="sectionName" pt-12>
    <h1 font-bold text-2xl>
      {{ sectionName }}
    </h1>
    <div
      class="ForYouSectionRow" my-6 gap-x-6 gap-y-8
      grid grid-cols-2
    >
      <RecommendCard
        @click="router.push('/everydaysongs')"
      />
      <FMCard />
    </div>
  </div>
</template>

<style scoped>
</style>
