<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { sesAcik, tiniCal } from '../sound.js'

// =========================================================
// TAM EKRAN BÖLÜM GEÇİŞİ (TUSAŞ sitesindeki gibi)
// - Sayfadaki her data-section="..." bir "sayfa"dır (en az ekran boyu).
// - Fare tekerleği / klavye ile her harekette bir sonraki bölüme
//   yumuşakça kayar. Ekrandan uzun bölümlerde önce bölümün içinde ilerler.
// - Sağdaki noktalar hangi bölümde olduğunu gösterir.
// - Telefonda ve "hareketi azalt" ayarında normal kaydırma kullanılır.
// =========================================================

const route = useRoute()
const { t, locale } = useI18n()

const bolumler = ref([]) // { el, ad }
const aktif = ref(0)
let gozlemci = null

const GECIS_SURESI = 900 // ms
let animasyonda = false
let kilitBitis = 0

const tamEkranAcik = () =>
  window.matchMedia('(min-width: 768px)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ---------- Bölümleri bul ----------
function bul() {
  gozlemci?.disconnect()
  const elemanlar = [...document.querySelectorAll('main [data-section]')]
  bolumler.value = elemanlar.map((el) => ({ el, ad: el.dataset.section }))
  aktifYap(enYakinBolum())

  gozlemci = new IntersectionObserver(
    (girdiler) => {
      for (const g of girdiler) {
        if (!g.isIntersecting) continue
        const i = elemanlar.indexOf(g.target)
        if (i !== -1 && i !== aktif.value) {
          aktifYap(i)
          if (!animasyonda) tiniCal() // kaydırma çubuğuyla gezinirken de tını
        }
      }
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  elemanlar.forEach((el) => gozlemci.observe(el))
}

// Aktif bölümü işaretle (içerik giriş animasyonu bu işarete bağlı)
function aktifYap(i) {
  aktif.value = i
  bolumler.value.forEach((b, j) => {
    if (j === i) b.el.setAttribute('data-aktif', '')
    else b.el.removeAttribute('data-aktif')
  })
}

function enYakinBolum() {
  const orta = window.scrollY + window.innerHeight / 2
  let sonuc = 0
  bolumler.value.forEach((b, i) => {
    if (ust(b.el) <= orta) sonuc = i
  })
  return sonuc
}

const ust = (el) => el.getBoundingClientRect().top + window.scrollY
const alt = (el) => el.getBoundingClientRect().bottom + window.scrollY

// ---------- Yumuşak kaydırma animasyonu ----------
function yumusak(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function kaydir(hedef, sure = GECIS_SURESI) {
  const baslangic = window.scrollY
  const enFazla = document.documentElement.scrollHeight - window.innerHeight
  hedef = Math.max(0, Math.min(hedef, enFazla))
  const fark = hedef - baslangic
  if (Math.abs(fark) < 2) return false

  animasyonda = true
  const t0 = performance.now()
  const adim = (simdi) => {
    const oran = Math.min(1, (simdi - t0) / sure)
    window.scrollTo(0, baslangic + fark * yumusak(oran))
    if (oran < 1) requestAnimationFrame(adim)
    else {
      animasyonda = false
      kilitBitis = performance.now() + 350 // dokunmatik yüzeyin kalan kaymasını yut
    }
  }
  requestAnimationFrame(adim)
  return true
}

// ---------- Bir sonraki / önceki "sayfa" ----------
function hedefBul(yon) {
  const y = window.scrollY
  const vh = window.innerHeight
  const liste = bolumler.value
  if (!liste.length) return null

  // Şu an hangi bölümün içindeyiz?
  let simdiki = -1
  liste.forEach((b, i) => {
    if (ust(b.el) <= y + 4) simdiki = i
  })

  const sonBolum = liste[liste.length - 1].el
  const altbilgideyiz = y > alt(sonBolum) - vh + 4

  if (yon > 0) {
    if (simdiki === -1) return ust(liste[0].el)
    const b = liste[simdiki].el
    // Bölüm ekrandan uzunsa önce içinde ilerle
    if (alt(b) > y + vh + 4) return Math.min(y + vh * 0.85, alt(b) - vh)
    if (simdiki + 1 < liste.length) return ust(liste[simdiki + 1].el)
    return document.documentElement.scrollHeight // son bölümden sonra: alt bilgi
  } else {
    if (altbilgideyiz) return Math.max(ust(sonBolum), alt(sonBolum) - vh)
    if (simdiki === -1) return 0
    const b = liste[simdiki].el
    if (y > ust(b) + 4) return Math.max(ust(b), y - vh * 0.85)
    if (simdiki > 0) {
      const onceki = liste[simdiki - 1].el
      return Math.max(ust(onceki), alt(onceki) - vh)
    }
    return 0
  }
}

function git(yon) {
  const hedef = hedefBul(yon)
  if (hedef === null) return
  const eskiBolum = aktif.value
  if (kaydir(hedef)) {
    // Bölüm değişecekse tını çal (bölüm içinde ilerlerken çalma)
    const yeni = bolumIndexi(hedef)
    if (yeni !== eskiBolum) {
      aktifYap(yeni)
      tiniCal()
    }
  }
}

function bolumIndexi(y) {
  const orta = y + window.innerHeight / 2
  let sonuc = 0
  bolumler.value.forEach((b, i) => {
    if (ust(b.el) <= orta) sonuc = i
  })
  return sonuc
}

// Noktaya tıklayınca
function noktayaGit(i) {
  const b = bolumler.value[i]
  if (!b) return
  if (i !== aktif.value) tiniCal()
  aktifYap(i)
  if (tamEkranAcik()) kaydir(ust(b.el))
  else b.el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// ---------- Fare tekerleği ----------
// Kendi içinde kaydırılabilen bir alanın (tablo, arama sonuçları vb.)
// üzerindeysek ve o alan o yönde kayabiliyorsa, ona dokunma.
function icKaydirmaVarMi(hedef, yon) {
  let el = hedef
  while (el && el !== document.body && el !== document.documentElement) {
    const stil = getComputedStyle(el)
    const kayar = /(auto|scroll)/.test(stil.overflowY) && el.scrollHeight > el.clientHeight + 1
    if (kayar) {
      if (yon > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 1) return true
      if (yon < 0 && el.scrollTop > 0) return true
    }
    el = el.parentElement
  }
  return false
}

function tekerlek(e) {
  if (!tamEkranAcik() || !bolumler.value.length || e.ctrlKey) return
  if (Math.abs(e.deltaY) < Math.abs(e.deltaX)) return // yatay kaydırma (kart şeridi)
  const yon = Math.sign(e.deltaY)
  if (!yon || icKaydirmaVarMi(e.target, yon)) return

  e.preventDefault()
  if (animasyonda || performance.now() < kilitBitis) return
  if (Math.abs(e.deltaY) < 4) return
  git(yon)
}

// ---------- Klavye ----------
function klavye(e) {
  if (!tamEkranAcik() || !bolumler.value.length) return
  const etiket = document.activeElement?.tagName
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(etiket) || document.activeElement?.isContentEditable) return

  let yon = 0
  if (['ArrowDown', 'PageDown'].includes(e.key) || (e.key === ' ' && !e.shiftKey)) yon = 1
  if (['ArrowUp', 'PageUp'].includes(e.key) || (e.key === ' ' && e.shiftKey)) yon = -1
  if (e.key === 'Home') { e.preventDefault(); return noktayaGit(0) }
  if (e.key === 'End') { e.preventDefault(); return kaydir(document.documentElement.scrollHeight) }
  if (!yon) return

  e.preventDefault()
  if (animasyonda) return
  git(yon)
}

// ---------- Yaşam döngüsü ----------
function tamEkranSinifi() {
  document.documentElement.classList.toggle('fp', tamEkranAcik())
}

watch(() => route.path, () => setTimeout(bul, 450))
watch(locale, () => nextTick(() => setTimeout(bul, 50)))

onMounted(() => {
  tamEkranSinifi()
  window.addEventListener('resize', tamEkranSinifi)
  window.addEventListener('wheel', tekerlek, { passive: false })
  window.addEventListener('keydown', klavye)
  setTimeout(bul, 300)
})
onBeforeUnmount(() => {
  gozlemci?.disconnect()
  window.removeEventListener('resize', tamEkranSinifi)
  window.removeEventListener('wheel', tekerlek)
  window.removeEventListener('keydown', klavye)
})
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
      @click="noktayaGit(i)"
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
