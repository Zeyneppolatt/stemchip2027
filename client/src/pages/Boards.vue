<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">{{ t('boards.title') }}</h1>
    <p class="text-gray-500 mb-12">
      {{ t('boards.subtitle') }}
    </p>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ t('boards.honoraryChair') }}</h2>
      <p class="text-gray-600">{{ t('boards.honoraryChairName') }}</p>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('boards.organizingCommittee') }}</h2>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="isim in tm('boards.organizingMembers')"
          :key="isim"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5 text-gray-700 font-medium"
        >
          {{ isim }}
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('boards.scientificCommittee') }}</h2>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="isim in tm('boards.scientificMembers')"
          :key="isim"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5 text-gray-700 font-medium"
        >
          {{ isim }}
        </div>
      </div>
    </section>
  </div>
</template>
