<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">{{ t('contact.title') }}</h1>
    <p class="text-gray-500 mb-12">
      {{ t('contact.subtitle') }}
    </p>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ t('contact.aboutTitle') }}</h2>
      <p class="text-gray-600 leading-relaxed max-w-3xl">
        {{ t('contact.aboutText') }}
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('contact.contactInfoTitle') }}</h2>
      <div class="grid gap-6 sm:grid-cols-3">
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h3 class="text-purple-600 font-semibold mb-2">{{ t('contact.emailLabel') }}</h3>
          <p class="text-gray-600 text-sm">{{ t('contact.emailValue') }}</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h3 class="text-purple-600 font-semibold mb-2">{{ t('contact.phoneLabel') }}</h3>
          <p class="text-gray-600 text-sm">{{ t('contact.phoneValue') }}</p>
        </div>
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <h3 class="text-purple-600 font-semibold mb-2">{{ t('contact.addressLabel') }}</h3>
          <p class="text-gray-600 text-sm">{{ t('contact.addressValue') }}</p>
        </div>
      </div>
    </section>
  </div>
</template>