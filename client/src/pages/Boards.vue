<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import Icon from '../components/Icon.vue'

const { t, tm } = useI18n()

// "Prof. Dr. Ahmet Yılmaz" -> "AY"
function basHarfler(isim) {
  return isim
    .split(' ')
    .filter((k) => k.length > 2 && !k.endsWith('.'))
    .slice(-2)
    .map((k) => k[0])
    .join('')
}

// "Prof. Dr. Ahmet Yılmaz" -> unvan: "Prof. Dr.", ad: "Ahmet Yılmaz"
function ayir(isim) {
  const parcalar = isim.split(' ')
  const unvan = parcalar.filter((k) => k.endsWith('.') || ['Öğr.', 'Üyesi'].includes(k)).join(' ')
  const ad = parcalar.filter((k) => !(k.endsWith('.') || ['Öğr.', 'Üyesi'].includes(k))).join(' ')
  return { unvan, ad }
}

const renkler = [
  'from-violet-500 to-purple-600',
  'from-fuchsia-500 to-pink-500',
  'from-cyan-500 to-blue-600',
  'from-rose-500 to-orange-400',
  'from-emerald-500 to-teal-600',
  'from-indigo-500 to-violet-600',
]
</script>

<template>
  <div>
    <PageHero :title="t('boards.title')" :subtitle="t('boards.subtitle')" icon="boards" />

    <div class="container-site py-16 md:py-24">
      <!-- Onursal Başkan -->
      <section :data-section="t('boards.honoraryChair')" class="mb-20">
        <div class="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-purple-700 to-fuchsia-600 p-8 text-white shadow-xl shadow-purple-500/20 md:p-12">
          <div class="bg-grid pointer-events-none absolute inset-0 opacity-50"></div>
          <div class="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <span class="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-white/15 text-3xl font-extrabold ring-4 ring-white/25">
              {{ basHarfler(t('boards.honoraryChairName')) }}
            </span>
            <div>
              <span class="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-widest">
                <Icon name="star" class="h-4 w-4" /> {{ t('boards.honoraryChair') }}
              </span>
              <p class="mt-3 text-3xl font-extrabold md:text-4xl">{{ t('boards.honoraryChairName') }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Kurullar -->
      <section
        v-for="kurul in [
          { baslik: t('boards.organizingCommittee'), liste: tm('boards.organizingMembers') },
          { baslik: t('boards.scientificCommittee'), liste: tm('boards.scientificMembers') },
        ]"
        :key="kurul.baslik"
        :data-section="kurul.baslik"
        class="mb-20 last:mb-0"
      >
        <div class="mb-8 flex items-center gap-4">
          <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{{ kurul.baslik }}</h2>
          <span class="rounded-full bg-purple-100 px-3 py-1 text-sm font-bold text-purple-700">{{ kurul.liste.length }}</span>
          <span class="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent"></span>
        </div>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          <div
            v-for="(isim, i) in kurul.liste"
            :key="isim"
            class="card group flex items-center gap-5 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <span :class="['grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-xl font-extrabold text-white shadow-lg', renkler[i % renkler.length]]">
              {{ basHarfler(isim) }}
            </span>
            <div>
              <p class="text-sm font-semibold text-purple-600">{{ ayir(isim).unvan }}</p>
              <p class="text-lg font-bold text-slate-900">{{ ayir(isim).ad }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
