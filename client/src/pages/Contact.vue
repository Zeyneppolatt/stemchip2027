<script setup>
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()
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

    <section class="mb-16">
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

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-2">{{ t('contact.pastEventsTitle') }}</h2>
      <p class="text-gray-500 text-sm mb-6">{{ t('contact.pastEventsNote') }}</p>

      <!-- Masaüstü: tablo -->
      <table class="hidden md:table w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-purple-600 text-white text-left">
            <th class="px-4 py-3">{{ t('contact.pastEventsNo') }}</th>
            <th class="px-4 py-3">{{ t('contact.pastEventsEvent') }}</th>
            <th class="px-4 py-3">{{ t('contact.pastEventsType') }}</th>
            <th class="px-4 py-3">{{ t('contact.pastEventsDate') }}</th>
            <th class="px-4 py-3">{{ t('contact.pastEventsCity') }}</th>
            <th class="px-4 py-3">{{ t('contact.pastEventsInstitution') }}</th>
            <th class="px-4 py-3">{{ t('contact.pastEventsChair') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="satir in tm('contact.pastEvents')"
            :key="satir.no"
            class="border-b border-gray-100 last:border-0"
          >
            <td class="px-4 py-3 font-medium text-gray-700">{{ satir.no }}</td>
            <td class="px-4 py-3 text-gray-600">{{ satir.etkinlik }}</td>
            <td class="px-4 py-3 text-gray-600">{{ satir.tur }}</td>
            <td class="px-4 py-3 text-gray-600">{{ satir.tarih }}</td>
            <td class="px-4 py-3 text-gray-600">{{ satir.sehir }}</td>
            <td class="px-4 py-3 text-gray-600">{{ satir.kurum }}</td>
            <td class="px-4 py-3 text-gray-600">{{ satir.baskan }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobil: kartlar -->
      <div class="md:hidden space-y-4">
        <div
          v-for="satir in tm('contact.pastEvents')"
          :key="satir.no"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5"
        >
          <p class="font-semibold text-gray-800 mb-3">{{ satir.no }} — {{ satir.etkinlik }} ({{ satir.tur }})</p>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">{{ t('contact.pastEventsDate') }}</span>
            <span class="text-gray-700 font-medium">{{ satir.tarih }}</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">{{ t('contact.pastEventsCity') }}</span>
            <span class="text-gray-700 font-medium">{{ satir.sehir }}</span>
          </div>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">{{ t('contact.pastEventsInstitution') }}</span>
            <span class="text-gray-700 font-medium">{{ satir.kurum }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">{{ t('contact.pastEventsChair') }}</span>
            <span class="text-gray-700 font-medium">{{ satir.baskan }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
