<script setup>
import { ref, computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Icon from './Icon.vue'

const props = defineProps({
  autofocus: { type: Boolean, default: false },
})
const emit = defineEmits(['done'])

const { t, tm, locale } = useI18n()
const router = useRouter()

const sorgu = ref('')
const acik = ref(false)
const secili = ref(0)
const input = ref(null)

defineExpose({ focus: () => nextTick(() => input.value?.focus()) })

// Sitedeki aranabilir içerikler (seçili dile göre)
const kayitlar = computed(() => {
  locale.value // dil değişince listeyi yenile
  const liste = []
  const ekle = (baslik, alt, to, icon) => liste.push({ baslik, alt, to, icon })

  const sayfalar = [
    ['/', 'home', 'home'],
    ['/kurullar', 'boards', 'boards'],
    ['/program', 'program', 'program'],
    ['/program/konusmacilar', 'speakers', 'speakers'],
    ['/kayit', 'registration', 'registration'],
    ['/bildiri-kurallari', 'paperRules', 'paperRules'],
    ['/iletisim', 'contact', 'contact'],
  ]
  for (const [to, key, icon] of sayfalar) {
    const altBaslik = key === 'home' ? t('home.date') : t(key + '.subtitle')
    ekle(t('menu.' + key), altBaslik, to, icon)
  }

  ekle(t('boards.honoraryChairName'), t('boards.honoraryChair'), '/kurullar', 'boards')
  for (const isim of tm('boards.organizingMembers')) ekle(isim, t('boards.organizingCommittee'), '/kurullar', 'boards')
  for (const isim of tm('boards.scientificMembers')) ekle(isim, t('boards.scientificCommittee'), '/kurullar', 'boards')

  for (const kisi of tm('speakers.list')) ekle(kisi.isim, `${kisi.konu} · ${kisi.kurum}`, '/program/konusmacilar', 'speakers')

  for (const gun of tm('program.days'))
    for (const o of gun.oturumlar)
      ekle(o.baslik, `${gun.isim} · ${o.saat}${o.konusmaci ? ' · ' + o.konusmaci : ''}`, '/program', 'program')

  for (const f of tm('registration.fees')) ekle(f.kategori, `${t('registration.feesTitle')} · ${f.erken}`, '/kayit', 'registration')

  ekle(t('paperRules.oralTitle'), t('paperRules.oralIntro'), '/bildiri-kurallari', 'paperRules')
  ekle(t('paperRules.posterTitle'), t('paperRules.posterIntro'), '/bildiri-kurallari', 'paperRules')
  ekle(t('paperRules.datesTitle'), t('paperRules.abstractNote'), '/bildiri-kurallari', 'paperRules')
  ekle(t('paperRules.templateTitle'), t('paperRules.templateDesc'), '/bildiri-kurallari', 'paperRules')
  for (const k of [...tm('paperRules.oralRules'), ...tm('paperRules.posterRules')])
    ekle(k.length > 70 ? k.slice(0, 70) + '…' : k, t('paperRules.title'), '/bildiri-kurallari', 'paperRules')

  for (const e of tm('contact.pastEvents')) ekle(e.etkinlik, `${e.tarih} · ${e.sehir}`, '/iletisim', 'contact')

  return liste
})

// Türkçe karakterleri de doğru küçült (İ -> i, I -> ı)
const kucult = (s) => String(s).toLocaleLowerCase(locale.value === 'tr' ? 'tr' : 'en')

const sonuclar = computed(() => {
  const q = kucult(sorgu.value.trim())
  if (!q) return []
  return kayitlar.value
    .filter((k) => kucult(k.baslik).includes(q) || kucult(k.alt).includes(q))
    .sort((a, b) => Number(kucult(b.baslik).startsWith(q)) - Number(kucult(a.baslik).startsWith(q)))
    .slice(0, 8)
})

function git(kayit) {
  if (!kayit) return
  router.push(kayit.to)
  sorgu.value = ''
  acik.value = false
  input.value?.blur()
  emit('done')
}

function tus(e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    secili.value = Math.min(secili.value + 1, sonuclar.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    secili.value = Math.max(secili.value - 1, 0)
  } else if (e.key === 'Enter') {
    git(sonuclar.value[secili.value])
  } else if (e.key === 'Escape') {
    acik.value = false
    input.value?.blur()
    emit('done')
  }
}

function yaz() {
  acik.value = true
  secili.value = 0
}

// Kutudan çıkınca, sonuca tıklama işlenebilsin diye biraz bekle
function kapat() {
  setTimeout(() => (acik.value = false), 150)
}
</script>

<template>
  <div class="relative w-full">
    <label class="group relative block">
      <span class="sr-only">{{ t('search.placeholder') }}</span>
      <input
        ref="input"
        v-model="sorgu"
        type="search"
        :placeholder="t('search.placeholder')"
        :autofocus="props.autofocus"
        autocomplete="off"
        class="w-full rounded-full border border-slate-300/80 bg-white py-2.5 pl-5 pr-12 text-[0.95rem] text-slate-700 shadow-[inset_0_1px_2px_rgba(15,23,42,0.06)] outline-none transition placeholder:text-slate-400 focus:border-purple-300 focus:ring-4 focus:ring-purple-400/25 [&::-webkit-search-cancel-button]:hidden"
        @input="yaz"
        @focus="acik = true"
        @blur="kapat"
        @keydown="tus"
      />
      <Icon
        name="search"
        stroke="2"
        class="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 transition group-focus-within:text-purple-600"
      />
    </label>

    <!-- Sonuçlar -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      leave-active-class="transition duration-100 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="acik && sorgu.trim()"
        class="absolute right-0 top-full z-50 mt-3 w-full min-w-[20rem] overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-2xl shadow-purple-950/20"
      >
        <ul v-if="sonuclar.length" class="max-h-[26rem] overflow-y-auto p-2">
          <li v-for="(k, i) in sonuclar" :key="k.to + k.baslik + i">
            <button
              type="button"
              :class="[
                'flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition',
                i === secili ? 'bg-purple-50' : 'hover:bg-slate-50',
              ]"
              @mouseenter="secili = i"
              @mousedown.prevent="git(k)"
            >
              <span class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-purple-600 to-fuchsia-500 text-white">
                <Icon :name="k.icon" class="h-4 w-4" />
              </span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-semibold text-slate-800">{{ k.baslik }}</span>
                <span class="block truncate text-xs text-slate-500">{{ k.alt }}</span>
              </span>
            </button>
          </li>
        </ul>
        <div v-else class="flex items-center gap-3 px-5 py-6 text-sm text-slate-500">
          <Icon name="search" class="h-5 w-5 text-slate-300" />
          <span>
            <span class="block font-semibold text-slate-700">{{ t('search.noResults') }}</span>
            {{ t('search.hint') }}
          </span>
        </div>
      </div>
    </Transition>
  </div>
</template>
