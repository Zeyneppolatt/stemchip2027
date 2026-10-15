<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import Icon from '../components/Icon.vue'

const { t, tm } = useI18n()

const bilgiler = computed(() => [
  { etiket: t('contact.emailLabel'), deger: t('contact.emailValue'), icon: 'contact', renk: 'from-violet-500 to-purple-600' },
  { etiket: t('contact.phoneLabel'), deger: t('contact.phoneValue'), icon: 'phone', renk: 'from-cyan-500 to-blue-600' },
  { etiket: t('contact.addressLabel'), deger: t('contact.addressValue'), icon: 'location', renk: 'from-rose-500 to-orange-400' },
])
</script>

<template>
  <div>
    <PageHero :title="t('contact.title')" :subtitle="t('contact.subtitle')" icon="contact" />

    <div class="container-site py-16 md:py-24">
      <!-- Hakkında + iletişim kartları -->
      <section :data-section="t('contact.aboutTitle')" class="mb-24 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div class="card p-8 md:p-12">
          <span class="eyebrow"><Icon name="info" class="h-4 w-4" /> STEMCHIP 2027</span>
          <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{{ t('contact.aboutTitle') }}</h2>
          <p class="mt-5 text-lg leading-relaxed text-slate-600">{{ t('contact.aboutText') }}</p>
        </div>

        <div class="grid gap-5">
          <div
            v-for="bilgi in bilgiler"
            :key="bilgi.etiket"
            class="card flex items-center gap-5 p-6 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <span :class="['grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg', bilgi.renk]">
              <Icon :name="bilgi.icon" class="h-7 w-7" />
            </span>
            <div class="min-w-0">
              <p class="text-sm font-bold uppercase tracking-wider text-slate-400">{{ bilgi.etiket }}</p>
              <p class="mt-1 break-words text-lg font-semibold text-slate-800">{{ bilgi.deger }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Geçmiş etkinlikler -->
      <section :data-section="t('contact.pastEventsTitle')">
        <div class="mb-8">
          <h2 class="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{{ t('contact.pastEventsTitle') }}</h2>
          <p class="mt-2 text-slate-500">{{ t('contact.pastEventsNote') }}</p>
        </div>

        <!-- Masaüstü: tablo -->
        <div class="card hidden max-h-[40rem] [html.fp_&]:max-h-[calc(100svh-17rem)] overflow-auto md:block">
          <table class="w-full border-collapse text-left">
            <thead class="sticky top-0 z-10">
              <tr class="bg-gradient-to-r from-indigo-950 via-purple-800 to-fuchsia-700 text-sm text-white">
                <th class="px-5 py-4 font-bold">{{ t('contact.pastEventsNo') }}</th>
                <th class="px-5 py-4 font-bold">{{ t('contact.pastEventsEvent') }}</th>
                <th class="px-5 py-4 font-bold">{{ t('contact.pastEventsType') }}</th>
                <th class="px-5 py-4 font-bold">{{ t('contact.pastEventsDate') }}</th>
                <th class="px-5 py-4 font-bold">{{ t('contact.pastEventsCity') }}</th>
                <th class="px-5 py-4 font-bold">{{ t('contact.pastEventsInstitution') }}</th>
                <th class="px-5 py-4 font-bold">{{ t('contact.pastEventsChair') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="satir in tm('contact.pastEvents')"
                :key="satir.no"
                class="border-b border-slate-100 text-slate-600 transition odd:bg-white even:bg-slate-50/70 hover:bg-purple-50"
              >
                <td class="px-5 py-3.5">
                  <span class="grid h-9 w-9 place-items-center rounded-full bg-purple-100 text-sm font-extrabold text-purple-700">{{ satir.no }}</span>
                </td>
                <td class="whitespace-nowrap px-5 py-3.5 font-bold text-slate-900">{{ satir.etkinlik }}</td>
                <td class="px-5 py-3.5">
                  <span
                    :class="[
                      'rounded-full px-3 py-1 text-xs font-bold',
                      satir.tur === 'Ulusal' || satir.tur === 'National' ? 'bg-cyan-100 text-cyan-700' : 'bg-fuchsia-100 text-fuchsia-700',
                    ]"
                  >{{ satir.tur }}</span>
                </td>
                <td class="whitespace-nowrap px-5 py-3.5">{{ satir.tarih }}</td>
                <td class="px-5 py-3.5">{{ satir.sehir }}</td>
                <td class="px-5 py-3.5">{{ satir.kurum }}</td>
                <td class="px-5 py-3.5">{{ satir.baskan }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobil: kartlar -->
        <div class="space-y-4 md:hidden">
          <div v-for="satir in tm('contact.pastEvents')" :key="satir.no" class="card p-5">
            <div class="mb-3 flex items-center gap-3">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-purple-100 text-sm font-extrabold text-purple-700">{{ satir.no }}</span>
              <p class="font-bold text-slate-900">{{ satir.etkinlik }}</p>
              <span class="ml-auto rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-bold text-fuchsia-700">{{ satir.tur }}</span>
            </div>
            <dl class="space-y-1 text-sm">
              <div class="flex justify-between gap-4"><dt class="text-slate-400">{{ t('contact.pastEventsDate') }}</dt><dd class="text-right font-medium text-slate-700">{{ satir.tarih }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-slate-400">{{ t('contact.pastEventsCity') }}</dt><dd class="text-right font-medium text-slate-700">{{ satir.sehir }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-slate-400">{{ t('contact.pastEventsInstitution') }}</dt><dd class="text-right font-medium text-slate-700">{{ satir.kurum }}</dd></div>
              <div class="flex justify-between gap-4"><dt class="text-slate-400">{{ t('contact.pastEventsChair') }}</dt><dd class="text-right font-medium text-slate-700">{{ satir.baskan }}</dd></div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
