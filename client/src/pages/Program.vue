<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import Icon from '../components/Icon.vue'

const { t, tm } = useI18n()
const seciliGun = ref(0)

const gunler = computed(() => tm('program.days'))

// Oturum türüne göre renk ve ikon
function tur(baslik) {
  const b = baslik.toLowerCase()
  if (b.includes('davetli') || b.includes('invited') || b.includes('açılış') || b.includes('opening'))
    return { icon: 'speakers', renk: 'from-fuchsia-500 to-pink-500' }
  if (b.includes('poster')) return { icon: 'photo', renk: 'from-cyan-500 to-blue-600' }
  if (b.includes('panel')) return { icon: 'boards', renk: 'from-emerald-500 to-teal-600' }
  if (b.includes('bildiri') || b.includes('oral')) return { icon: 'presentation', renk: 'from-violet-500 to-purple-600' }
  return { icon: 'clock', renk: 'from-rose-500 to-orange-400' }
}
</script>

<template>
  <div>
    <PageHero :title="t('program.title')" :subtitle="t('program.subtitle')" icon="program" />

    <div :data-section="t('program.schedule')" class="container-site py-16 md:py-24">
      <!-- Gün seçimi -->
      <div class="mb-12 grid gap-4 sm:grid-cols-3">
        <button
          v-for="(gun, index) in gunler"
          :key="gun.isim"
          @click="seciliGun = index"
          :class="[
            'cursor-pointer rounded-3xl p-6 text-left transition duration-300',
            seciliGun === index
              ? 'bg-gradient-to-br from-purple-700 to-fuchsia-600 text-white shadow-xl shadow-purple-500/30'
              : 'card text-slate-700 hover:-translate-y-0.5 hover:shadow-lg',
          ]"
        >
          <span :class="['text-sm font-bold uppercase tracking-widest', seciliGun === index ? 'text-white/70' : 'text-purple-600']">
            {{ gun.oturumlar.length }} {{ t('program.sessions') }}
          </span>
          <p class="mt-2 text-xl font-extrabold md:text-2xl">{{ gun.isim }}</p>
        </button>
      </div>

      <!-- Zaman çizelgesi -->
      <Transition
        mode="out-in"
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-3"
        leave-active-class="transition duration-150"
        leave-to-class="opacity-0"
      >
        <ol :key="seciliGun" class="relative space-y-5 before:absolute before:bottom-4 before:left-7 before:top-4 before:w-0.5 before:bg-gradient-to-b before:from-purple-300 before:to-fuchsia-200 md:before:left-[13.5rem]">
          <li
            v-for="oturum in gunler[seciliGun].oturumlar"
            :key="oturum.saat + oturum.baslik"
            class="relative flex flex-col gap-3 pl-20 md:flex-row md:items-center md:gap-10 md:pl-0"
          >
            <div class="flex items-center gap-2 font-bold text-purple-700 md:w-44 md:shrink-0 md:justify-end md:text-right">
              <Icon name="clock" class="h-5 w-5" />
              {{ oturum.saat }}
            </div>
            <span :class="['absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ring-4 ring-slate-50 md:static md:shrink-0', tur(oturum.baslik).renk]">
              <Icon :name="tur(oturum.baslik).icon" class="h-6 w-6" />
            </span>
            <div class="card flex-1 p-6 transition hover:shadow-xl">
              <p class="text-lg font-bold text-slate-900 md:text-xl">{{ oturum.baslik }}</p>
              <p v-if="oturum.konusmaci" class="mt-1 flex items-center gap-2 text-slate-500">
                <Icon name="speakers" class="h-4 w-4" /> {{ oturum.konusmaci }}
              </p>
            </div>
          </li>
        </ol>
      </Transition>
    </div>
  </div>
</template>
