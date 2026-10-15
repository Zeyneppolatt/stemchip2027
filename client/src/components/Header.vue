<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import Icon from './Icon.vue'
import SearchBox from './SearchBox.vue'

const { locale, t } = useI18n()
const route = useRoute()

const programOpen = ref(false)
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const searchOpen = ref(false)
const searchPanel = ref(null)

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) searchPanel.value?.focus()
}

// Menü öğeleri ("Kayıt" sağdaki renkli butonda)
const menu = [
  { to: '/', key: 'home', icon: 'home' },
  { to: '/kurullar', key: 'boards', icon: 'boards' },
  {
    to: '/program', key: 'program', icon: 'program',
    children: [{ to: '/program/konusmacilar', key: 'speakers', icon: 'speakers' }],
  },
  { to: '/bildiri-kurallari', key: 'paperRules', icon: 'paperRules' },
  { to: '/iletisim', key: 'contact', icon: 'contact' },
]

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function switchLocale(lang) {
  locale.value = lang
  document.documentElement.lang = lang
}

// Sayfanın en üstünde şeffaf cam, aşağı kayınca koyu cam
function onScroll() {
  scrolled.value = window.scrollY > 24
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

// Sayfa değişince açık menüleri kapat
watch(() => route.path, () => {
  mobileMenuOpen.value = false
  programOpen.value = false
  searchOpen.value = false
})

const linkBase =
  'flex items-center gap-2 rounded-full px-3.5 py-2.5 text-[0.95rem] font-semibold transition-all duration-300'
const linkIdle = 'text-white/80 hover:bg-white/10 hover:text-white'
const linkActive = 'bg-white text-purple-700 shadow-lg shadow-purple-950/30'
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-5">
    <div class="container-site">
      <nav
        :class="[
          'flex items-center justify-between gap-4 rounded-full border py-2 pl-3 pr-2 backdrop-blur-xl transition-all duration-500',
          scrolled
            ? 'border-white/15 bg-gradient-to-r from-indigo-950/90 via-purple-900/85 to-indigo-950/90 shadow-[0_12px_40px_-12px_rgba(30,10,80,0.55)]'
            : 'border-white/25 bg-white/10 shadow-[0_8px_32px_-8px_rgba(30,10,80,0.35)]',
        ]"
      >
        <!-- Logo -->
        <router-link to="/" class="flex shrink-0 items-center gap-3">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-fuchsia-400 via-rose-400 to-cyan-300 shadow-lg shadow-fuchsia-500/30">
            <span class="h-5 w-5 rounded-full bg-white shadow-inner"></span>
          </span>
          <span class="text-xl font-extrabold tracking-tight text-white">
            STEMCHIP<span class="ml-1 font-light text-white/70">2027</span>
          </span>
        </router-link>

        <!-- Masaüstü menü -->
        <ul class="hidden items-center gap-0.5 xl:flex">
          <li
            v-for="item in menu"
            :key="item.to"
            class="relative"
            @mouseenter="item.children && (programOpen = true)"
            @mouseleave="item.children && (programOpen = false)"
          >
            <router-link
              :to="item.to"
              :class="[linkBase, isActive(item.to) ? linkActive : linkIdle]"
              :aria-current="isActive(item.to) ? 'page' : undefined"
            >
              <Icon :name="item.icon" class="hidden h-5 w-5 2xl:block" />
              <span class="whitespace-nowrap">{{ t('menu.' + item.key) }}</span>
              <svg
                v-if="item.children"
                :class="['h-4 w-4 transition-transform duration-300', programOpen ? 'rotate-180' : '']"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </router-link>

            <!-- Program alt menüsü -->
            <Transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="item.children && programOpen" class="absolute left-0 top-full pt-3">
                <ul class="w-64 rounded-2xl border border-white/15 bg-indigo-950/85 p-2 shadow-2xl backdrop-blur-xl">
                  <li v-for="child in item.children" :key="child.to">
                    <router-link
                      :to="child.to"
                      :class="[
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium transition',
                        isActive(child.to) ? 'bg-white text-purple-700' : 'text-white/80 hover:bg-white/10 hover:text-white',
                      ]"
                    >
                      <span class="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500/40 to-cyan-400/40">
                        <Icon :name="child.icon" class="h-5 w-5" />
                      </span>
                      {{ t('menu.' + child.key) }}
                    </router-link>
                  </li>
                </ul>
              </div>
            </Transition>
          </li>
        </ul>

        <!-- Sağ taraf: arama + dil + Kayıt -->
        <div class="hidden items-center gap-3 xl:flex">
          <!-- Geniş ekranda arama kutusu -->
          <div class="hidden w-52 min-[1800px]:block">
            <SearchBox />
          </div>
          <!-- Daha dar ekranda arama butonu -->
          <button
            class="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white text-slate-500 shadow-sm transition hover:text-purple-600 min-[1800px]:hidden"
            :class="searchOpen ? 'ring-4 ring-purple-400/40 text-purple-600' : ''"
            @click="toggleSearch"
            :aria-label="t('search.placeholder')"
          >
            <Icon name="search" class="h-5 w-5" stroke="2" />
          </button>

          <div class="flex rounded-full bg-white/10 p-1 ring-1 ring-white/15">
            <button
              v-for="lang in ['tr', 'en']"
              :key="lang"
              @click="switchLocale(lang)"
              :class="[
                'cursor-pointer rounded-full px-3 py-1.5 text-sm font-bold uppercase transition',
                locale === lang ? 'bg-white text-purple-700 shadow' : 'text-white/70 hover:text-white',
              ]"
            >
              {{ lang }}
            </button>
          </div>

          <router-link
            to="/kayit"
            :class="[
              'whitespace-nowrap rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-6 py-3 text-[0.95rem] font-bold text-white shadow-lg shadow-rose-500/40 transition hover:-translate-y-0.5 hover:shadow-rose-500/60',
              isActive('/kayit') ? 'ring-2 ring-white' : '',
            ]"
            :aria-current="isActive('/kayit') ? 'page' : undefined"
          >
            {{ t('home.registerBtn') }}
          </router-link>
        </div>

        <!-- Mobil hamburger -->
        <button
          class="grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 xl:hidden"
          @click="mobileMenuOpen = !mobileMenuOpen"
          aria-label="Menü"
        >
          <svg v-if="!mobileMenuOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </nav>

      <!-- Orta genişlikte açılan arama paneli -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-show="searchOpen" class="mt-3 hidden justify-end xl:flex min-[1800px]:hidden">
          <div class="w-full max-w-md rounded-full bg-white/10 p-2 shadow-2xl ring-1 ring-white/20 backdrop-blur-xl">
            <SearchBox ref="searchPanel" @done="searchOpen = false" />
          </div>
        </div>
      </Transition>

      <!-- Mobil menü paneli -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-3"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0 -translate-y-3"
      >
        <div
          v-if="mobileMenuOpen"
          class="mt-3 rounded-3xl border border-white/15 bg-indigo-950/90 p-3 shadow-2xl backdrop-blur-xl xl:hidden"
        >
          <div class="mb-3">
            <SearchBox @done="mobileMenuOpen = false" />
          </div>
          <template v-for="item in menu" :key="item.to">
            <router-link
              :to="item.to"
              :class="[
                'flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition',
                isActive(item.to) && !(item.children && isActive(item.children[0].to))
                  ? 'bg-white text-purple-700'
                  : 'text-white/80 hover:bg-white/10 hover:text-white',
              ]"
            >
              <Icon :name="item.icon" class="h-5 w-5" />
              {{ t('menu.' + item.key) }}
            </router-link>
            <router-link
              v-for="child in item.children || []"
              :key="child.to"
              :to="child.to"
              :class="[
                'ml-8 flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition',
                isActive(child.to) ? 'bg-white text-purple-700' : 'text-white/65 hover:bg-white/10 hover:text-white',
              ]"
            >
              <Icon :name="child.icon" class="h-4 w-4" />
              {{ t('menu.' + child.key) }}
            </router-link>
          </template>

          <div class="mt-3 flex items-center justify-between gap-3 border-t border-white/10 px-1 pt-3">
            <div class="flex rounded-full bg-white/10 p-1 ring-1 ring-white/15">
              <button
                v-for="lang in ['tr', 'en']"
                :key="lang"
                @click="switchLocale(lang)"
                :class="[
                  'cursor-pointer rounded-full px-3 py-1 text-xs font-bold uppercase transition',
                  locale === lang ? 'bg-white text-purple-700' : 'text-white/70',
                ]"
              >
                {{ lang }}
              </button>
            </div>
            <router-link
              to="/kayit"
              :class="[
                'rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-rose-500/40',
                isActive('/kayit') ? 'ring-2 ring-white' : '',
              ]"
            >
              {{ t('home.registerBtn') }}
            </router-link>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>
