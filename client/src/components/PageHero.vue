<script setup>
import Icon from './Icon.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Her sayfanın üstündeki renkli başlık alanı
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  icon: { type: String, default: '' },
})
</script>

<template>
  <section :data-section="title" class="fp-hero relative overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-800 to-fuchsia-700 text-white">
    <div class="bg-grid pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
    <div class="pointer-events-none absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/40 blur-3xl"></div>
    <div class="pointer-events-none absolute -right-20 top-0 h-96 w-96 rounded-full bg-cyan-400/25 blur-3xl"></div>

    <div class="container-site relative pb-16 pt-36 md:pb-20 md:pt-44">
      <div class="flex flex-col gap-6 md:flex-row md:items-center">
        <span
          v-if="icon"
          class="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur md:h-20 md:w-20"
        >
          <Icon :name="icon" class="h-8 w-8 md:h-10 md:w-10" />
        </span>
        <div>
          <h1 class="text-4xl font-extrabold tracking-tight md:text-6xl xl:text-7xl">{{ title }}</h1>
          <p v-if="subtitle" class="mt-3 max-w-3xl text-base text-white/75 md:text-lg">{{ subtitle }}</p>
        </div>
      </div>
    </div>

    <!-- Aşağı kaydır işareti (tam ekran görünümde) -->
    <div class="absolute bottom-20 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 [html.fp_&]:flex">
      {{ t('home.scroll') }}
      <Icon name="arrowDown" class="h-5 w-5 animate-bounce" />
    </div>

    <!-- Alt kenardaki yumuşak dalga -->
    <svg class="absolute bottom-0 left-0 block h-10 w-full text-slate-50 md:h-14" viewBox="0 0 1440 60" preserveAspectRatio="none">
      <path fill="currentColor" d="M0 60V30C240 0 480 0 720 20s480 40 720 10v30z" />
    </svg>
  </section>
</template>
