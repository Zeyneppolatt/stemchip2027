<script setup>
const iletisimBilgileri = [
  { baslik: 'E-posta', deger: 'bilgi@stemchip2027.com.tr' },
  { baslik: 'Telefon', deger: '0 (212) 000 00 00 (örnek)' },
  { baslik: 'Adres', deger: 'Örnek Üniversite, Örnek Fakülte, İstanbul (örnek adres)' },
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">Bilgiler / İletişim</h1>
    <p class="text-gray-500 mb-12">
      Sempozyum hakkında genel bilgiler ve iletişim kanalları.
    </p>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Sempozyum Hakkında</h2>
      <p class="text-gray-600 leading-relaxed max-w-3xl">
        STEMCHIP 2027, ilgili bilim alanlarındaki araştırmacıları, akademisyenleri ve
        öğrencileri bir araya getiren bir sempozyumdur. Etkinliğin tam kapsamı, konu
        başlıkları ve düzenleyen kurum bilgileri yakında bu alanda yayınlanacaktır. (örnek metindir)
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-6">İletişim Bilgileri</h2>
      <div class="grid gap-6 sm:grid-cols-3">
        <div
          v-for="bilgi in iletisimBilgileri"
          :key="bilgi.baslik"
          class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
        >
          <h3 class="text-purple-600 font-semibold mb-2">{{ bilgi.baslik }}</h3>
          <p class="text-gray-600 text-sm">{{ bilgi.deger }}</p>
        </div>
      </div>
    </section>
  </div>
</template>