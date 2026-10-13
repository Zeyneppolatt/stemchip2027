<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const programOpen = ref(false)
const mobileMenuOpen = ref(false)
const { locale, t } = useI18n()

function switchLocale(lang) {
  locale.value = lang
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <router-link to="/" class="text-xl font-bold text-purple-600" @click="mobileMenuOpen = false">
        STEMCHIP 2027
      </router-link>

      <!-- Masaüstü menü -->
      <ul class="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
        <li>
          <router-link to="/" class="hover:text-purple-600">{{ t('menu.home') }}</router-link>
        </li>
        <li>
          <router-link to="/kurullar" class="hover:text-purple-600">{{ t('menu.boards') }}</router-link>
        </li>
        <li
          class="relative"
          @mouseenter="programOpen = true"
          @mouseleave="programOpen = false"
        >
          <router-link to="/program" class="hover:text-purple-600">{{ t('menu.program') }}</router-link>
          <ul
            v-if="programOpen"
            class="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-md py-2 border border-gray-100"
          >
            <li>
              <router-link
                to="/program/konusmacilar"
                class="block px-4 py-2 hover:bg-gray-50 hover:text-purple-600"
              >
                {{ t('menu.speakers') }}
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/kayit" class="hover:text-purple-600">{{ t('menu.registration') }}</router-link>
        </li>
        <li>
          <router-link to="/bildiri-kurallari" class="hover:text-purple-600">{{ t('menu.paperRules') }}</router-link>
        </li>
        <li>
          <router-link to="/iletisim" class="hover:text-purple-600">{{ t('menu.contact') }}</router-link>
        </li>

        <li class="flex items-center gap-1 ml-4 border-l border-gray-200 pl-4">
          <button
            @click="switchLocale('tr')"
            :class="locale === 'tr' ? 'font-bold text-purple-600' : 'text-gray-400'"
          >
            TR
          </button>
          <span class="text-gray-300">/</span>
          <button
            @click="switchLocale('en')"
            :class="locale === 'en' ? 'font-bold text-purple-600' : 'text-gray-400'"
          >
            EN
          </button>
        </li>
      </ul>

      <!-- Mobil hamburger buton -->
      <button
        class="md:hidden text-gray-700"
        @click="mobileMenuOpen = !mobileMenuOpen"
        aria-label="Menü"
      >
        <svg v-if="!mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobil menü paneli -->
    <div v-if="mobileMenuOpen" class="md:hidden border-t border-gray-100 px-6 py-4 space-y-3 text-gray-700 font-medium">
      <router-link to="/" class="block hover:text-purple-600" @click="mobileMenuOpen = false">{{ t('menu.home') }}</router-link>
      <router-link to="/kurullar" class="block hover:text-purple-600" @click="mobileMenuOpen = false">{{ t('menu.boards') }}</router-link>
      <router-link to="/program" class="block hover:text-purple-600" @click="mobileMenuOpen = false">{{ t('menu.program') }}</router-link>
      <router-link to="/program/konusmacilar" class="block pl-4 text-sm text-gray-500 hover:text-purple-600" @click="mobileMenuOpen = false">
        {{ t('menu.speakers') }}
      </router-link>
      <router-link to="/kayit" class="block hover:text-purple-600" @click="mobileMenuOpen = false">{{ t('menu.registration') }}</router-link>
      <router-link to="/bildiri-kurallari" class="block hover:text-purple-600" @click="mobileMenuOpen = false">{{ t('menu.paperRules') }}</router-link>
      <router-link to="/iletisim" class="block hover:text-purple-600" @click="mobileMenuOpen = false">{{ t('menu.contact') }}</router-link>

      <div class="flex items-center gap-1 pt-3 border-t border-gray-100">
        <button
          @click="switchLocale('tr')"
          :class="locale === 'tr' ? 'font-bold text-purple-600' : 'text-gray-400'"
        >
          TR
        </button>
        <span class="text-gray-300">/</span>
        <button
          @click="switchLocale('en')"
          :class="locale === 'en' ? 'font-bold text-purple-600' : 'text-gray-400'"
        >
          EN
        </button>
      </div>
    </div>
  </header>
</template>