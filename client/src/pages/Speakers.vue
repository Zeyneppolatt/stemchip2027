<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import Icon from '../components/Icon.vue'

const { t, tm } = useI18n()

function basHarfler(isim) {
  return isim
    .split(' ')
    .filter((k) => k.length > 2 && !k.endsWith('.'))
    .slice(-2)
    .map((k) => k[0])
    .join('')
}

const renkler = [
  'from-violet-500 via-purple-600 to-fuchsia-600',
  'from-cyan-500 via-blue-600 to-indigo-600',
  'from-rose-500 via-pink-500 to-orange-400',
  'from-emerald-500 via-teal-600 to-cyan-600',
]
</script>

<template>
  <div>
    <PageHero :title="t('speakers.title')" :subtitle="t('speakers.subtitle')" icon="speakers" />

    <div :data-section="t('menu.speakers')" class="container-site py-16 md:py-24">
      <div class="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(kisi, i) in tm('speakers.list')"
          :key="kisi.isim"
          class="card group overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
        >
          <!-- Renkli üst alan -->
          <div :class="['relative h-36 bg-gradient-to-br', renkler[i % renkler.length]]">
            <div class="bg-grid absolute inset-0 opacity-60"></div>
          </div>
          <div class="-mt-14 px-6 pb-8 text-center">
            <span class="mx-auto grid h-28 w-28 place-items-center rounded-full bg-white text-3xl font-extrabold text-purple-700 shadow-xl ring-4 ring-white">
              {{ basHarfler(kisi.isim) }}
            </span>
            <h2 class="mt-5 text-xl font-extrabold text-slate-900">{{ kisi.isim }}</h2>
            <p class="mt-1 text-slate-500">{{ kisi.kurum }}</p>
            <p class="mt-5 inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700">
              <Icon name="speakers" class="h-4 w-4" /> {{ kisi.konu }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
