<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 mt-auto">
    <div class="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
      <div>
        <h3 class="text-white font-semibold text-lg mb-2">STEMCHIP 2027</h3>
        <p class="text-sm">
          {{ t('footer.tagline') }}
        </p>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-2">{{ t('footer.quickLinks') }}</h4>
        <ul class="space-y-1 text-sm">
          <li><router-link to="/kurullar" class="hover:text-white">{{ t('menu.boards') }}</router-link></li>
          <li><router-link to="/program" class="hover:text-white">{{ t('menu.program') }}</router-link></li>
          <li><router-link to="/kayit" class="hover:text-white">{{ t('menu.registration') }}</router-link></li>
          <li><router-link to="/iletisim" class="hover:text-white">{{ t('menu.contact') }}</router-link></li>
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-2">{{ t('footer.contactTitle') }}</h4>
        <p class="text-sm">{{ t('footer.emailLabel') }}: bilgi@stemchip2027.com.tr</p>
      </div>
    </div>

    <div class="border-t border-gray-700 py-4 text-center text-xs text-gray-500">
      &copy; 2026 {{ t('footer.copyright') }}
    </div>
  </footer>
</template>
