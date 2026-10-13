<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
const seciliGun = ref(0)
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">{{ t('program.title') }}</h1>
    <p class="text-gray-500 mb-10">
      {{ t('program.subtitle') }}
    </p>

    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="(gun, index) in tm('program.days')"
        :key="gun.isim"
        @click="seciliGun = index"
        :class="[
          'px-5 py-2 rounded-full text-sm font-semibold transition',
          seciliGun === index
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ gun.isim }}
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="oturum in tm('program.days')[seciliGun].oturumlar"
        :key="oturum.saat + oturum.baslik"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-white border border-gray-100 rounded-xl shadow-sm p-5"
      >
        <div class="text-purple-600 font-semibold w-40 shrink-0">{{ oturum.saat }}</div>
        <div>
          <p class="text-gray-800 font-medium">{{ oturum.baslik }}</p>
          <p v-if="oturum.konusmaci" class="text-gray-500 text-sm">{{ oturum.konusmaci }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
