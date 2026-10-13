<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm } = useI18n()

const form = reactive({
  adSoyad: '',
  eposta: '',
  kurum: '',
  kategori: 'student',
})

function formGonder() {
  alert(t('registration.submitAlert'))
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">{{ t('registration.title') }}</h1>
    <p class="text-gray-500 mb-12">
      {{ t('registration.subtitle') }}
    </p>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('registration.feesTitle') }}</h2>

      <!-- Masaüstü: tablo -->
      <table class="hidden md:table w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-purple-600 text-white text-left">
            <th class="px-6 py-3">{{ t('registration.category') }}</th>
            <th class="px-6 py-3">{{ t('registration.earlyBird') }}</th>
            <th class="px-6 py-3">{{ t('registration.lateBird') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="satir in tm('registration.fees')"
            :key="satir.kategori"
            class="border-b border-gray-100 last:border-0"
          >
            <td class="px-6 py-4 font-medium text-gray-700">{{ satir.kategori }}</td>
            <td class="px-6 py-4 text-gray-600">{{ satir.erken }}</td>
            <td class="px-6 py-4 text-gray-600">{{ satir.gec }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Mobil: kartlar -->
      <div class="md:hidden space-y-4">
        <div
          v-for="satir in tm('registration.fees')"
          :key="satir.kategori"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5"
        >
          <p class="font-semibold text-gray-800 mb-3">{{ satir.kategori }}</p>
          <div class="flex justify-between text-sm mb-1">
            <span class="text-gray-500">{{ t('registration.earlyBird') }}</span>
            <span class="text-gray-700 font-medium">{{ satir.erken }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-500">{{ t('registration.lateBird') }}</span>
            <span class="text-gray-700 font-medium">{{ satir.gec }}</span>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">{{ t('registration.formTitle') }}</h2>
      <form @submit.prevent="formGonder" class="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 grid gap-5 max-w-xl">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('registration.fullName') }}</label>
          <input
            v-model="form.adSoyad"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('registration.email') }}</label>
          <input
            v-model="form.eposta"
            type="email"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('registration.institution') }}</label>
          <input
            v-model="form.kurum"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">{{ t('registration.category') }}</label>
          <select
            v-model="form.kategori"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="student">{{ t('registration.categoryStudent') }}</option>
            <option value="academic">{{ t('registration.categoryAcademic') }}</option>
            <option value="listener">{{ t('registration.categoryListener') }}</option>
          </select>
        </div>
        <button
          type="submit"
          class="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition"
        >
          {{ t('registration.submit') }}
        </button>
      </form>
    </section>
  </div>
</template>