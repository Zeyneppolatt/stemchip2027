<script setup>
const tarihler = [
  { etiket: 'Bildiri Özeti Son Gönderim Tarihi', tarih: '1 Mart 2027' },
  { etiket: 'Kabul Bildirimi', tarih: '1 Nisan 2027' },
  { etiket: 'Tam Metin Son Gönderim Tarihi', tarih: '1 Mayıs 2027' },
  { etiket: 'Erken Kayıt Son Tarihi', tarih: '15 Mayıs 2027' },
]

const kurallar = [
  'Bildiriler Türkçe veya İngilizce olarak gönderilebilir.',
  'Özetler en fazla 300 kelime olmalıdır.',
  'Tam metinler şablon üzerinden hazırlanmalı ve 8 sayfayı geçmemelidir.',
  'Yazar(lar) ve kurum bilgileri başlık sayfasında açıkça belirtilmelidir.',
  'Bildiriler, sistem üzerinden PDF formatında yüklenmelidir.',
  'Her yazar en fazla 2 bildiride yer alabilir.',
]
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-16">
    <h1 class="text-4xl font-extrabold text-purple-700 mb-4">Bildiri Kuralları</h1>
    <p class="text-gray-500 mb-12">
      Bildiri gönderimi ile ilgili tarihler ve kurallar (örnek bilgilerdir).
    </p>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Önemli Tarihler</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="t in tarihler"
          :key="t.etiket"
          class="bg-white border border-gray-100 rounded-xl shadow-sm p-5"
        >
          <p class="text-purple-600 font-bold text-lg">{{ t.tarih }}</p>
          <p class="text-gray-600 text-sm mt-1">{{ t.etiket }}</p>
        </div>
      </div>
    </section>

    <section class="mb-16">
      <h2 class="text-2xl font-bold text-gray-800 mb-6">Yazım Kuralları</h2>
      <ul class="space-y-3">
        <li
          v-for="(kural, index) in kurallar"
          :key="index"
          class="flex items-start gap-3 text-gray-600"
        >
          <span class="mt-1 w-2 h-2 rounded-full bg-purple-600 shrink-0"></span>
          <span>{{ kural }}</span>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Bildiri Şablonu</h2>
      <p class="text-gray-600 mb-4">
        Bildirinizi hazırlarken aşağıdaki şablonu kullanınız.
      </p>
      <a
        href="#"
        class="inline-block bg-purple-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-purple-700 transition"
      >
        Şablonu İndir (.docx)
      </a>
    </section>
  </div>
</template>