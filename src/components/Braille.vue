<template>
  <p v-if="isFileClose" class="is-size-2 is-size-4-mobile">{{ t('placeholder') }}</p>
  <div v-else class="besbody is-size-3 is-size-5-mobile" role="document" id="docTop">
    <h1 v-if="bes.docTitle">{{ bes.docTitle }}</h1>
    <nav v-if="bes.title" :aria-label="t('toc')" class="toc content" id="toc">
      <ol>
        <li v-for="(title,pno) in bes.title" :key="pno">
          <a :href="'#page'+(pno+1)">{{title}}</a>
        </li>
      </ol>
    </nav>
    <article>
      <section v-for="(page,pno) in bes.body" :key="pno" class="columns page" :id="'page'+(pno+1)">
        <div class="column">
        <template v-for="(line,lno) in page" :key="lno">
          <hr v-if="line === '@HR@'">
          <h1 v-else-if="line.slice(0,4) ==='@H1@'">{{line.slice(4)}}</h1>
          <h2 v-else-if="line.slice(0,4) ==='@H2@'">{{line.slice(4)}}</h2>
          <p v-else-if="line.length === 0"><br /></p>
          <p v-else>{{line}}</p>
        </template>
        <p class="is-size-6 has-text-right">
          <a href="#docTop" aria-labelledby="toc"><span class="icon">↑</span>{{ t('backToTocBraille') }}</a>
        </p>
        </div>
      </section>
    </article>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { splitbraille, type ParsedBraille } from '@/modules/brailleParser'
import { useI18n } from '../modules/i18n'

const { t, locale } = useI18n()

const props = withDefaults(defineProps<{
  braille?: string;
  isBrf?: boolean;
}>(), {
  braille: '',
  isBrf: false
})

const isFileClose = computed(() => props.braille.length === 0)
const bes = computed((): ParsedBraille => splitbraille(props.braille))

</script>

<style>
.besbody {
  font-family: "Apple Braille", "Segoe UI Symbol", Braille6, monospace;
}
.toc {
  padding-bottom: 2rem;
  border-bottom: 2px solid #CCC;
}
.page {
  position: relative;
  padding: 2rem 0 2rem 0;
  border-bottom: 2px solid #999;
}
</style>
