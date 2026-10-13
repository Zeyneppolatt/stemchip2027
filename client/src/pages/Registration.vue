<script setup>
import { reactive } from 'vue'

const ucretler = [
  { kategori: 'Öğrenci', erken: '750 TL', gec: '1000 TL' },
  { kategori: 'Akademisyen / Araştırmacı', erken: '1250 TL', gec: '1500 TL' },
  { kategori: 'Dinleyici', erken: '500 TL', gec: '750 TL' },
]

const form = reactive({
  adSoyad: '',
  eposta: '',
  kurum: '',
  kategori: 'Öğrenci',
})

function formGonder() {
  alert('Kayıt formu altyapısı yakında eklenecek. Şimdilik bu buton örnektir.')
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">Kayıt</h1>
    <p class="text-gray-500 mb-12">
      Kayıt ücretleri ve kayıt formu (örnek fiyatlar, kesin tutarlar yakında açıklanacaktır).
    </p>

    <section class="mb-16 overflow-x-auto">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Kayıt Ücretleri</h2>
      <table class="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
        <thead>
          <tr class="bg-purple-600 text-white text-left">
            <th class="px-6 py-3">Kategori</th>
            <th class="px-6 py-3">Erken Kayıt</th>
            <th class="px-6 py-3">Geç Kayıt</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="satir in ucretler"
            :key="satir.kategori"
            class="border-b border-gray-100 last:border-0"
          >
            <td class="px-6 py-4 font-medium text-gray-700">{{ satir.kategori }}</td>
            <td class="px-6 py-4 text-gray-600">{{ satir.erken }}</td>
            <td class="px-6 py-4 text-gray-600">{{ satir.gec }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Kayıt Formu</h2>
      <form @submit.prevent="formGonder" class="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 grid gap-5 max-w-xl">
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Ad Soyad</label>
          <input
            v-model="form.adSoyad"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">E-posta</label>
          <input
            v-model="form.eposta"
            type="email"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Kurum</label>
          <input
            v-model="form.kurum"
            type="text"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600 mb-1">Kategori</label>
          <select
            v-model="form.kategori"
            class="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option>Öğrenci</option>
            <option>Akademisyen / Araştırmacı</option>
            <option>Dinleyici</option>
          </select>
        </div>
        <button
          type="submit"
          class="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition"
        >
          Kayıt Ol
        </button>
      </form>
    </section>
  </div>
</template>