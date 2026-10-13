<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const programOpen = ref(false)
const { locale, t } = useI18n()

function switchLocale(lang) {
  locale.value = lang
}
</script>

<template>
  <header class="bg-white shadow-sm sticky top-0 z-50">
    <nav class="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
      <router-link to="/" class="text-xl font-bold text-purple-600">
        STEMCHIP 2027
      </router-link>

      <ul class="flex items-center gap-6 text-sm font-medium text-gray-700">
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
    </nav>
  </header>
</template>