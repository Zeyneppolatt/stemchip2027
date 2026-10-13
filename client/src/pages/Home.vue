<script setup>
</script>

<template>
  <div>
    <!-- Hero Bölümü -->
    <section class="relative bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 text-white overflow-hidden">
      <div class="max-w-6xl mx-auto px-6 py-24 text-center">
        <p class="text-sm font-semibold tracking-widest uppercase text-purple-200 mb-4">
          Örnek Üniversite &middot; Örnek Fakülte
        </p>
        <h1 class="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          STEMCHIP 2027 Sempozyumu
        </h1>
        <p class="text-lg md:text-xl text-purple-100 mb-10">
          15–18 Haziran 2027 &bull; İstanbul, Türkiye (örnek tarih/yer)
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/kayit"
            class="bg-white text-purple-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-purple-50 transition"
          >
            Kayıt Ol
          </router-link>
          <router-link
            to="/program"
            class="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition"
          >
            Programı Gör
          </router-link>
        </div>
      </div>
    </section>

    <!-- Bilgi Kartları -->
    <section class="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
      <router-link
        to="/kurullar"
        class="block bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-8"
      >
        <h2 class="text-xl font-bold text-purple-600 mb-2">Kurullar</h2>
        <p class="text-gray-600 text-sm">
          Düzenleme ve bilim kurulu üyelerini inceleyin.
        </p>
      </router-link>

      <router-link
        to="/bildiri-kurallari"
        class="block bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-8"
      >
        <h2 class="text-xl font-bold text-purple-600 mb-2">Bildiri Gönderimi</h2>
        <p class="text-gray-600 text-sm">
          Bildiri kurallarını ve son gönderim tarihlerini görün.
        </p>
      </router-link>

      <router-link
        to="/kayit"
        class="block bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition p-8"
      >
        <h2 class="text-xl font-bold text-purple-600 mb-2">Kayıt</h2>
        <p class="text-gray-600 text-sm">
          Sempozyuma katılmak için kayıt bilgilerine göz atın.
        </p>
      </router-link>
    </section>
  </div>
</template>