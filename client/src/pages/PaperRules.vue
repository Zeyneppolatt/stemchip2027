<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">{{ t('paperRules.title') }}</h1>
    <p class="text-gray-500 mb-12">
      {{ t('paperRules.subtitle') }}
    </p>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('paperRules.datesTitle') }}</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="tarihItem in tm('paperRules.dates')"
          :key="tarihItem.etiket"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5"
        >
          <p class="text-purple-600 font-bold text-lg">{{ tarihItem.tarih }}</p>
          <p class="text-gray-600 text-sm mt-1">{{ tarihItem.etiket }}</p>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('paperRules.rulesTitle') }}</h2>
      <ul class="space-y-3">
        <li
          v-for="(kural, index) in tm('paperRules.rules')"
          :key="index"
          class="flex items-start gap-3 text-gray-600"
        >
          <span class="mt-1 w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
          <span>{{ kural }}</span>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ t('paperRules.templateTitle') }}</h2>
      <p class="text-gray-600 mb-4">
        {{ t('paperRules.templateDesc') }}
      </p>
      <a
        href="#"
        class="inline-block bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition"
      >
        {{ t('paperRules.templateBtn') }}
      </a>
    </section>
  </div>
</template>