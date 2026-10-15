<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import SectionDots from './components/SectionDots.vue'
import { tiniCal } from './sound.js'

// Her sayfa geçişinde yumuşak tını
const route = useRoute()
watch(() => route.path, (yeni, eski) => {
  if (eski !== undefined) tiniCal()
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Header />
    <SectionDots />
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          leave-active-class="transition duration-150 ease-in"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    <Footer />
  </div>
</template>
