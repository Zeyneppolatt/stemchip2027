<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { sesAcik, tiniCal } from '../sound.js'

// Sağ kenardaki dikey bölüm noktaları.
// Sayfadaki data-section="..." etiketli bölümleri bulur.
const route = useRoute()
const { t, locale } = useI18n()

const bolumler = ref([]) // { el, ad }
const aktif = ref(0)
let gozlemci = null
let tiklamaIleKaydiriliyor = false

function bul() {
  gozlemci?.disconnect()
  const elemanlar = [...document.querySelectorAll('main [data-section]')]
  bolumler.value = elemanlar.map((el) => ({ el, ad: el.dataset.section }))
  aktif.value = 0

  gozlemci = new IntersectionObserver(
    (girdiler) => {
      for (const g of girdiler) {
        if (!g.isIntersecting) continue
        const i = elemanlar.indexOf(g.target)
        if (i !== -1 && i !== aktif.value) {
          aktif.value = i
          if (!tiklamaIleKaydiriliyor) tiniCal()
        }
      }
    },
    // Ekranın ortasındaki bölüm "aktif" sayılır
    { rootMargin: '-45% 0px -50% 0px' },
  )
  elemanlar.forEach((el) => gozlemci.observe(el))
}

function git(i) {
  const b = bolumler.value[i]
  if (!b) return
  aktif.value = i
  tiniCal()
  tiklamaIleKaydiriliyor = true
  b.el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  setTimeout(() => (tiklamaIleKaydiriliyor = false), 900)
}

// Sayfa değişince (geçiş animasyonu bitince) bölümleri yeniden bul
watch(
  () => route.path,
  () => setTimeout(bul, 450),
)
// Dil değişince bölüm adlarını yenile
watch(locale, () => nextTick(() => setTimeout(bul, 50)))

onMounted(() => setTimeout(bul, 300))
onBeforeUnmount(() => gozlemci?.disconnect())
</script>

<template>
  <nav
    v-if="bolumler.length > 1"
    class="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex"
    aria-label="Bölümler"
  >
    <button
      v-for="(b, i) in bolumler"
      :key="i + b.ad"
      type="button"
      class="group relative grid h-8 w-8 cursor-pointer place-items-center"
      :aria-label="b.ad"
      :aria-current="i === aktif ? 'true' : undefined"
      @click="git(i)"
    >
      <!-- Aktif bölümün halkası -->
      <span
        :class="[
          'absolute inset-0 rounded-full border transition-all duration-500',
          i === aktif ? 'scale-100 border-slate-400/80 bg-white/40 opacity-100 backdrop-blur' : 'scale-50 border-transparent opacity-0',
        ]"
      ></span>
      <!-- Nokta -->
      <span
        :class="[
          'relative h-2.5 w-2.5 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.6)] transition-all duration-300',
          i === aktif ? 'bg-slate-500' : 'bg-slate-400/70 group-hover:bg-slate-500',
        ]"
      ></span>
      <!-- Üzerine gelince bölüm adı -->
      <span
        class="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-indigo-950/90 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100"
      >
        {{ b.ad }}
      </span>
    </button>

    <!-- Ses aç / kapat -->
    <button
      type="button"
      class="mt-3 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/70 text-slate-500 shadow ring-1 ring-slate-900/5 backdrop-blur transition hover:text-purple-600"
      :aria-label="sesAcik ? t('sound.off') : t('sound.on')"
      :title="sesAcik ? t('sound.off') : t('sound.on')"
      @click="sesAcik = !sesAcik; sesAcik && tiniCal()"
    >
      <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" v-if="sesAcik" />
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" v-else />
      </svg>
    </button>
  </nav>
</template>
