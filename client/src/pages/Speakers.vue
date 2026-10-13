<script setup>
const konusmacilar = [
  {
    isim: 'Prof. Dr. Ahmet Yılmaz',
    kurum: 'Örnek Üniversite',
    konu: 'Örnek Konuşma Başlığı I',
  },
  {
    isim: 'Prof. Dr. Zeynep Arslan',
    kurum: 'Örnek Üniversite',
    konu: 'Örnek Konuşma Başlığı II',
  },
  {
    isim: 'Prof. Dr. John Smith',
    kurum: 'Örnek Yabancı Üniversite',
    konu: 'Örnek Konuşma Başlığı III',
  },
  {
    isim: 'Doç. Dr. Can Öztürk',
    kurum: 'Örnek Üniversite',
    konu: 'Örnek Konuşma Başlığı IV',
  },
]

function basHarfler(isim) {
  return isim
    .split(' ')
    .filter((kelime) => kelime.length > 2)
    .slice(-2)
    .map((kelime) => kelime[0])
    .join('')
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">Davetli Konuşmacılar</h1>
    <p class="text-gray-500 mb-12">
      Sempozyumumuza katılacak davetli konuşmacılar (örnek bilgilerdir).
    </p>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="kisi in konusmacilar"
        :key="kisi.isim"
        class="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-6 text-center"
      >
        <div
          class="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-xl font-bold"
        >
          {{ basHarfler(kisi.isim) }}
        </div>
        <h2 class="text-gray-800 font-semibold">{{ kisi.isim }}</h2>
        <p class="text-gray-500 text-sm mb-2">{{ kisi.kurum }}</p>
        <p class="text-purple-600 text-sm font-medium">{{ kisi.konu }}</p>
      </div>
    </div>
  </div>
</template>