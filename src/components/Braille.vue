<template>
  <p v-if="isFileClose" class="is-size-2 is-size-4-mobile">{{ t('placeholder') }}</p>
  <div v-else class="besbody is-size-3 is-size-5-mobile" role="document">
    <article>
      <section v-for="(page,pno) in bes.body" :key="pno" class="page">
        <div class="column">
        <template v-for="(line,lno) in page" :key="lno">
          <hr v-if="line === '@HR@'">
          <p v-else-if="line.length === 0"><br /></p>
          <p v-else>{{stripHeadingMarker(line)}}</p>
        </template>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { splitbraille, type ParsedBraille } from '@/modules/brailleParser'
import { useI18n } from '../modules/i18n'

const { t } = useI18n()

const props = withDefaults(defineProps<{
  braille?: string;
}>(), {
  braille: ''
})

const isFileClose = computed(() => props.braille.length === 0)
const bes = computed((): ParsedBraille => splitbraille(props.braille))

function stripHeadingMarker(line: string): string {
  return line.startsWith('@H1@') || line.startsWith('@H2@')
    ? line.slice(4)
    : line
}

</script>

<style>
.besbody {
  font-family: "Apple Braille", "Segoe UI Symbol", Braille6, monospace;
}
.page {
  position: relative;
  padding: 2rem 0 2rem 0;
  border-bottom: 2px solid #999;
}
</style>
