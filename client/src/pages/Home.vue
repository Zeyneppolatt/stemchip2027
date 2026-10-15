<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '../components/Icon.vue'
import { tiniCal } from '../sound.js'

const { t, tm } = useI18n()

// Geri sayım (15 Haziran 2027, 09:00 Türkiye saati)
const hedef = new Date('2027-06-15T09:00:00+03:00').getTime()
const simdi = ref(Date.now())
let zamanlayici
onMounted(() => (zamanlayici = setInterval(() => (simdi.value = Date.now()), 1000)))
onBeforeUnmount(() => clearInterval(zamanlayici))

const kalan = computed(() => {
  const fark = Math.max(0, hedef - simdi.value)
  return [
    { deger: Math.floor(fark / 86400000), etiket: t('home.days') },
    { deger: Math.floor((fark / 3600000) % 24), etiket: t('home.hours') },
    { deger: Math.floor((fark / 60000) % 60), etiket: t('home.minutes') },
    { deger: Math.floor((fark / 1000) % 60), etiket: t('home.seconds') },
  ]
})

const kartlar = computed(() => [
  { to: '/kurullar', baslik: t('home.cardBoardsTitle'), aciklama: t('home.cardBoardsDesc') },
  { to: '/bildiri-kurallari', baslik: t('home.cardPapersTitle'), aciklama: t('home.cardPapersDesc') },
  { to: '/kayit', baslik: t('home.cardRegistrationTitle'), aciklama: t('home.cardRegistrationDesc') },
  { to: '/program', baslik: t('home.cardProgramTitle'), aciklama: t('home.cardProgramDesc') },
  { to: '/program/konusmacilar', baslik: t('home.cardSpeakersTitle'), aciklama: t('home.cardSpeakersDesc') },
  { to: '/iletisim', baslik: t('home.cardContactTitle'), aciklama: t('home.cardContactDesc') },
])

// Hızlı erişim şeridi: seçili (yukarı kalkan) kart ve oklar
const aktifKart = ref(0)
const serit = ref(null)

function kartaGit(i) {
  const yeni = Math.min(Math.max(i, 0), kartlar.value.length - 1)
  if (yeni === aktifKart.value) return
  aktifKart.value = yeni
  tiniCal()
  const el = serit.value?.children[yeni]
  if (el && serit.value) {
    // Sadece şeridi yatay kaydır (sayfayı kaydırma)
    const solKenar = el.offsetLeft - serit.value.offsetLeft
    const gorunurMu = solKenar >= serit.value.scrollLeft && solKenar + el.offsetWidth <= serit.value.scrollLeft + serit.value.clientWidth
    if (!gorunurMu) serit.value.scrollTo({ left: solKenar, behavior: 'smooth' })
  }
}

// Kartlar arasındaki ince çizgi (seçili kartın yanlarında gösterme)
const cizgiGoster = (i) => i > 0 && i !== aktifKart.value && i - 1 !== aktifKart.value

// Önemli tarihler (Bildiri Kuralları sayfasındaki verilerden)
const tarihler = computed(() => [
  ...tm('paperRules.abstractDates'),
  ...tm('paperRules.registrationDates'),
])
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section :data-section="t('home.sectionHero')" class="relative flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-800 to-fuchsia-700 text-white">
      <!-- Arka plan görseli (şimdilik ESOGÜ logosu).
           Kendi logonuzu/fotoğrafınızı koymak için public klasöründeki dosyayı değiştirin. -->
      <img
        src="/esogu-logo.png"
        alt=""
        aria-hidden="true"
        class="hero-bg pointer-events-none absolute left-1/2 top-1/2 h-[118vh] max-h-none w-auto max-w-none select-none opacity-60"
      />
      <!-- Görselin üstündeki renkli katman (yazılar okunsun diye) -->
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-950/75 via-purple-900/35 to-fuchsia-800/65"></div>
      <div class="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"></div>
      <div class="pointer-events-none absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-fuchsia-500/40 blur-3xl"></div>
      <div class="pointer-events-none absolute -right-32 top-1/4 h-[30rem] w-[30rem] rounded-full bg-cyan-400/25 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-40 left-1/3 h-[30rem] w-[30rem] rounded-full bg-indigo-500/40 blur-3xl"></div>

      <div class="container-site relative grid items-center gap-14 pb-24 pt-36 lg:grid-cols-[1.15fr_1fr] lg:pt-32">
        <!-- Sol: başlık -->
        <div>
          <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] ring-1 ring-white/20 backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-cyan-300"></span>
            {{ t('home.eyebrow') }}
          </span>

          <h1 class="mt-6 text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl 2xl:text-8xl">
            <span class="bg-gradient-to-r from-white via-fuchsia-100 to-cyan-200 bg-clip-text text-transparent">
              {{ t('home.title') }}
            </span>
          </h1>

          <div class="mt-8 flex flex-wrap gap-3">
            <span class="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-base font-semibold ring-1 ring-white/15 backdrop-blur">
              <Icon name="program" class="h-5 w-5 text-cyan-200" /> {{ t('home.dateShort') }}
            </span>
            <span class="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2.5 text-base font-semibold ring-1 ring-white/15 backdrop-blur">
              <Icon name="location" class="h-5 w-5 text-rose-200" /> {{ t('home.location') }}
            </span>
          </div>

          <div class="mt-10 flex flex-wrap gap-4">
            <router-link
              to="/kayit"
              class="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-purple-700 shadow-xl shadow-purple-950/30 transition hover:-translate-y-0.5"
            >
              {{ t('home.registerBtn') }}
              <Icon name="arrowRight" class="h-5 w-5 transition group-hover:translate-x-1" stroke="2.2" />
            </router-link>
            <router-link
              to="/program"
              class="inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white ring-2 ring-white/60 transition hover:bg-white/10"
            >
              {{ t('home.programBtn') }}
            </router-link>
          </div>
        </div>

        <!-- Sağ: çip grafiği + geri sayım -->
        <div class="relative">
          <div class="rounded-[2rem] border border-white/20 bg-white/10 p-6 shadow-2xl shadow-purple-950/40 backdrop-blur-xl sm:p-8">
            <!-- Dekoratif çip / devre grafiği -->
            <svg viewBox="0 0 400 220" class="mx-auto mb-6 w-full max-w-md" aria-hidden="true">
              <defs>
                <linearGradient id="chipG" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stop-color="#f0abfc" />
                  <stop offset="1" stop-color="#67e8f9" />
                </linearGradient>
              </defs>
              <g stroke="url(#chipG)" stroke-width="2" fill="none" stroke-linecap="round" opacity=".9">
                <path d="M150 70 H90 V30 H20" /><path d="M150 95 H60 V80 H10" /><path d="M150 125 H70 V160 H20" /><path d="M150 150 H110 V200 H40" />
                <path d="M250 70 H310 V30 H380" /><path d="M250 95 H340 V80 H390" /><path d="M250 125 H330 V160 H380" /><path d="M250 150 H290 V200 H360" />
                <path d="M180 50 V10" /><path d="M220 50 V20 H260" /><path d="M180 170 V210" /><path d="M220 170 V205 H150" />
              </g>
              <g fill="url(#chipG)">
                <circle cx="20" cy="30" r="5" /><circle cx="10" cy="80" r="5" /><circle cx="20" cy="160" r="5" /><circle cx="40" cy="200" r="5" />
                <circle cx="380" cy="30" r="5" /><circle cx="390" cy="80" r="5" /><circle cx="380" cy="160" r="5" /><circle cx="360" cy="200" r="5" />
                <circle cx="180" cy="10" r="5" /><circle cx="260" cy="20" r="5" /><circle cx="180" cy="210" r="5" /><circle cx="150" cy="205" r="5" />
              </g>
              <rect x="150" y="50" width="100" height="120" rx="18" fill="rgba(255,255,255,0.12)" stroke="url(#chipG)" stroke-width="2.5" />
              <rect x="170" y="72" width="60" height="76" rx="10" fill="url(#chipG)" opacity=".85" />
              <text x="200" y="117" text-anchor="middle" font-size="18" font-weight="800" fill="#3b0764" font-family="Plus Jakarta Sans, sans-serif">2027</text>
            </svg>

            <p class="mb-4 text-center text-sm font-bold uppercase tracking-[0.2em] text-white/70">
              {{ t('home.countdownTitle') }}
            </p>
            <div class="grid grid-cols-4 gap-3">
              <div
                v-for="parca in kalan"
                :key="parca.etiket"
                class="rounded-2xl bg-white/10 py-4 text-center ring-1 ring-white/15"
              >
                <div class="text-3xl font-extrabold tabular-nums sm:text-4xl">{{ String(parca.deger).padStart(2, '0') }}</div>
                <div class="mt-1 text-xs font-semibold uppercase tracking-wider text-white/60">{{ parca.etiket }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Aşağı kaydır işareti -->
      <a href="#hizli-erisim" class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white md:flex">
        {{ t('home.scroll') }}
        <Icon name="arrowDown" class="h-5 w-5 animate-bounce" />
      </a>
    </section>

    <!-- ============ HIZLI ERİŞİM ============ -->
    <section id="hizli-erisim" :data-section="t('home.quickTitle')" class="bg-slate-100 py-20 md:py-28">
      <div class="container-site">
        <div class="mb-6 flex flex-wrap items-end justify-between gap-6">
          <div class="max-w-2xl">
            <span class="eyebrow">STEMCHIP 2027</span>
            <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{{ t('home.quickTitle') }}</h2>
            <p class="mt-3 text-lg text-slate-500">{{ t('home.quickSubtitle') }}</p>
          </div>
          <!-- Oklar -->
          <div class="flex bg-white shadow-sm">
            <button
              type="button"
              class="grid h-14 w-14 cursor-pointer place-items-center text-slate-700 transition hover:bg-slate-50 hover:text-purple-700 disabled:cursor-default disabled:text-slate-300 disabled:hover:bg-white"
              :disabled="aktifKart === 0"
              :aria-label="t('home.prev')"
              @click="kartaGit(aktifKart - 1)"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
            </button>
            <button
              type="button"
              class="grid h-14 w-14 cursor-pointer place-items-center text-slate-700 transition hover:bg-slate-50 hover:text-purple-700 disabled:cursor-default disabled:text-slate-300 disabled:hover:bg-white"
              :disabled="aktifKart === kartlar.length - 1"
              :aria-label="t('home.next')"
              @click="kartaGit(aktifKart + 1)"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
            </button>
          </div>
        </div>

        <div class="relative">
          <!-- Beyaz şerit (seçili kart bunun üstüne taşar) -->
          <div class="absolute inset-x-0 bottom-8 top-12 bg-white"></div>

          <div
            ref="serit"
            class="relative flex snap-x snap-mandatory overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <router-link
              v-for="(kart, i) in kartlar"
              :key="kart.to"
              :to="kart.to"
              :class="[
                'relative flex w-[85%] shrink-0 snap-start flex-col transition-all duration-500 sm:w-1/2 lg:w-1/3',
                i === aktifKart ? 'z-10 bg-white shadow-[0_24px_50px_-20px_rgba(30,10,80,0.35)]' : '',
              ]"
              @mouseenter="aktifKart = i"
              @focus="aktifKart = i"
            >
              <span v-if="cizgiGoster(i)" class="absolute bottom-28 left-0 top-[5.5rem] w-px bg-slate-200"></span>

              <div :class="['flex-1 px-8 pb-10 transition-all duration-500 md:px-10', i === aktifKart ? 'pt-10' : 'pt-[5.5rem]']">
                <p class="text-base font-medium text-slate-400 tabular-nums">{{ String(i + 1).padStart(2, '0') }} / {{ String(kartlar.length).padStart(2, '0') }}</p>
                <h3 class="mt-8 text-xl font-extrabold uppercase leading-snug tracking-tight text-slate-900 md:text-2xl">{{ kart.baslik }}</h3>
                <p class="mt-3 text-slate-500">{{ kart.aciklama }}</p>
              </div>

              <!-- Seçili kartın altındaki "Daha Fazla" bandı -->
              <div
                :class="[
                  'flex h-24 items-center gap-3 px-8 text-lg text-white transition-all duration-500 md:px-10',
                  i === aktifKart ? 'bg-gradient-to-r from-purple-700 to-fuchsia-600 opacity-100' : 'opacity-0',
                ]"
              >
                {{ t('home.more') }}
                <span class="grid h-6 w-6 place-items-center rounded-full ring-[1.5px] ring-white">
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
                </span>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ ÖNEMLİ TARİHLER ============ -->
    <section :data-section="t('home.datesTitle')" class="bg-white py-20 md:py-28">
      <div class="container-site">
        <div class="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span class="eyebrow"><Icon name="clock" class="h-4 w-4" /> {{ t('home.datesTitle') }}</span>
            <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{{ t('home.datesTitle') }}</h2>
          </div>
          <router-link to="/bildiri-kurallari" class="inline-flex items-center gap-2 font-bold text-purple-700 hover:gap-3 transition-all">
            {{ t('home.datesLink') }} <Icon name="arrowRight" class="h-5 w-5" stroke="2.2" />
          </router-link>
        </div>

        <ol class="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <li
            v-for="(tarih, i) in tarihler"
            :key="tarih.etiket"
            class="relative rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:border-purple-300 hover:bg-purple-50"
          >
            <span class="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-purple-600 to-fuchsia-500 text-sm font-extrabold text-white shadow-md shadow-purple-500/30">
              {{ i + 1 }}
            </span>
            <p class="mt-5 text-lg font-extrabold leading-snug text-slate-900">{{ tarih.tarih }}</p>
            <p class="mt-2 text-sm font-medium text-slate-500">{{ tarih.etiket }}</p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============ ÇAĞRI BANDI ============ -->
    <section :data-section="t('home.sectionCta')" class="container-site py-20 md:py-28">
      <div class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-purple-700 via-fuchsia-600 to-rose-500 px-8 py-14 text-white shadow-2xl shadow-purple-500/30 md:px-16 md:py-20">
        <div class="bg-grid pointer-events-none absolute inset-0 opacity-60"></div>
        <div class="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl"></div>
        <div class="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div class="max-w-3xl">
            <h2 class="text-3xl font-extrabold tracking-tight md:text-5xl">{{ t('home.ctaTitle') }}</h2>
            <p class="mt-4 text-lg text-white/80">{{ t('home.ctaText') }}</p>
          </div>
          <router-link
            to="/bildiri-kurallari"
            class="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-bold text-purple-700 shadow-xl transition hover:-translate-y-0.5"
          >
            {{ t('home.ctaBtn') }}
            <Icon name="arrowRight" class="h-5 w-5 transition group-hover:translate-x-1" stroke="2.2" />
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
