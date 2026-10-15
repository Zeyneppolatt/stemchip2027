<script setup>
import { useI18n } from 'vue-i18n'
import Icon from './Icon.vue'

const { t } = useI18n()

const linkler = [
  { to: '/kurullar', key: 'boards' },
  { to: '/program', key: 'program' },
  { to: '/program/konusmacilar', key: 'speakers' },
  { to: '/kayit', key: 'registration' },
  { to: '/bildiri-kurallari', key: 'paperRules' },
  { to: '/iletisim', key: 'contact' },
]
</script>

<template>
  <footer class="relative overflow-hidden bg-indigo-950 text-white/70">
    <div class="h-1 w-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400"></div>
    <div class="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl"></div>

    <div class="container-site relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <div class="flex items-center gap-3">
          <span class="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-fuchsia-400 via-rose-400 to-cyan-300">
            <span class="h-5 w-5 rounded-full bg-white"></span>
          </span>
          <span class="text-xl font-extrabold text-white">STEMCHIP<span class="ml-1 font-light text-white/70">2027</span></span>
        </div>
        <p class="mt-5 max-w-md">{{ t('home.date') }}</p>
        <p class="mt-2 max-w-md text-sm text-white/50">{{ t('footer.tagline') }}</p>
      </div>

      <div>
        <h4 class="mb-5 text-sm font-bold uppercase tracking-widest text-white">{{ t('footer.quickLinks') }}</h4>
        <ul class="grid grid-cols-2 gap-3 md:grid-cols-1">
          <li v-for="link in linkler" :key="link.to">
            <router-link :to="link.to" class="transition hover:text-white">{{ t('menu.' + link.key) }}</router-link>
          </li>
        </ul>
      </div>

      <div>
        <h4 class="mb-5 text-sm font-bold uppercase tracking-widest text-white">{{ t('footer.contactTitle') }}</h4>
        <a href="mailto:bilgi@stemchip2027.com.tr" class="flex items-center gap-3 transition hover:text-white">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><Icon name="contact" class="h-5 w-5" /></span>
          bilgi@stemchip2027.com.tr
        </a>
        <p class="mt-4 flex items-center gap-3">
          <span class="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><Icon name="location" class="h-5 w-5" /></span>
          {{ t('home.location') }}
        </p>
      </div>
    </div>

    <div class="border-t border-white/10">
      <div class="container-site py-6 text-center text-sm text-white/40">
        &copy; 2027 {{ t('footer.copyright') }}
      </div>
    </div>
  </footer>
</template>
