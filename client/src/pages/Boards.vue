<script setup>
const duzenlemeKurulu = [
  'Prof. Dr. Ahmet Yılmaz',
  'Doç. Dr. Ayşe Demir',
  'Dr. Öğr. Üyesi Mehmet Kaya',
  'Dr. Öğr. Üyesi Elif Şahin',
]

const bilimKurulu = [
  'Prof. Dr. Zeynep Arslan',
  'Prof. Dr. Can Öztürk',
  'Doç. Dr. Selin Aydın',
  'Doç. Dr. Burak Çelik',
  'Dr. Öğr. Üyesi Deniz Yıldız',
  'Dr. Öğr. Üyesi Ece Korkmaz',
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">Kurullar</h1>
    <p class="text-gray-500 mb-12">
      Onursal başkan, düzenleme kurulu ve bilim kurulu bilgileri (örnek isimlerdir).
    </p>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-2">Onursal Başkan</h2>
      <p class="text-gray-600">Prof. Dr. Örnek Rektör</p>
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Düzenleme Kurulu</h2>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="isim in duzenlemeKurulu"
          :key="isim"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5 text-gray-700 font-medium"
        >
          {{ isim }}
        </div>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Bilim Kurulu</h2>
      <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div
          v-for="isim in bilimKurulu"
          :key="isim"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5 text-gray-700 font-medium"
        >
          {{ isim }}
        </div>
      </div>
    </section>
  </div>
</template>