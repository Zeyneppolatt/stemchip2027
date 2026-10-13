<script setup>
import { ref } from 'vue'

const gunler = [
  {
    isim: '1. Gün — 15 Haziran',
    oturumlar: [
      { saat: '09:00 - 10:00', baslik: 'Kayıt ve Karşılama' },
      { saat: '10:00 - 11:00', baslik: 'Açılış Konuşması', konusmaci: 'Prof. Dr. Örnek Rektör' },
      { saat: '11:15 - 12:15', baslik: 'Davetli Konuşma: Örnek Başlık', konusmaci: 'Prof. Dr. Ahmet Yılmaz' },
      { saat: '13:30 - 15:00', baslik: 'Sözlü Bildiri Oturumu I' },
    ],
  },
  {
    isim: '2. Gün — 16 Haziran',
    oturumlar: [
      { saat: '09:00 - 10:00', baslik: 'Davetli Konuşma: Örnek Başlık', konusmaci: 'Prof. Dr. Zeynep Arslan' },
      { saat: '10:15 - 12:00', baslik: 'Sözlü Bildiri Oturumu II' },
      { saat: '13:30 - 15:30', baslik: 'Poster Oturumu' },
    ],
  },
  {
    isim: '3. Gün — 17 Haziran',
    oturumlar: [
      { saat: '09:00 - 10:30', baslik: 'Sözlü Bildiri Oturumu III' },
      { saat: '11:00 - 12:00', baslik: 'Panel: Örnek Konu' },
      { saat: '14:00 - 15:00', baslik: 'Kapanış ve Ödül Töreni' },
    ],
  },
]

const seciliGun = ref(0)
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">Program</h1>
    <p class="text-gray-500 mb-10">
      Aşağıdaki program taslaktır, kesin program yaklaşan tarihlerde güncellenecektir.
    </p>

    <div class="flex flex-wrap gap-2 mb-8">
      <button
        v-for="(gun, index) in gunler"
        :key="gun.isim"
        @click="seciliGun = index"
        :class="[
          'px-5 py-2 rounded-full text-sm font-semibold transition',
          seciliGun === index
            ? 'bg-purple-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
        ]"
      >
        {{ gun.isim }}
      </button>
    </div>

    <div class="space-y-4">
      <div
        v-for="oturum in gunler[seciliGun].oturumlar"
        :key="oturum.saat + oturum.baslik"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 bg-white border border-gray-100 rounded-xl shadow-sm p-5"
      >
        <div class="text-purple-600 font-semibold w-40 shrink-0">{{ oturum.saat }}</div>
        <div>
          <p class="text-gray-800 font-medium">{{ oturum.baslik }}</p>
          <p v-if="oturum.konusmaci" class="text-gray-500 text-sm">{{ oturum.konusmaci }}</p>
        </div>
      </div>
    </div>
  </div>
</template>