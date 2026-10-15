<script setup>
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import Icon from '../components/Icon.vue'

const { t, tm } = useI18n()
</script>

<template>
  <div>
    <PageHero :title="t('paperRules.title')" :subtitle="t('paperRules.subtitle')" icon="paperRules" />

    <div class="container-site py-16 md:py-24">
      <!-- Sözlü ve poster kuralları yan yana -->
      <section :data-section="t('paperRules.title')" class="mb-24 grid gap-8 lg:grid-cols-2">
        <div
          v-for="blok in [
            { baslik: t('paperRules.oralTitle'), giris: t('paperRules.oralIntro'), kurallar: tm('paperRules.oralRules'), icon: 'presentation', renk: 'from-violet-500 to-purple-600' },
            { baslik: t('paperRules.posterTitle'), giris: t('paperRules.posterIntro'), kurallar: tm('paperRules.posterRules'), icon: 'photo', renk: 'from-cyan-500 to-blue-600' },
          ]"
          :key="blok.baslik"
          class="card p-8 md:p-10"
        >
          <div class="flex items-center gap-4">
            <span :class="['grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg', blok.renk]">
              <Icon :name="blok.icon" class="h-7 w-7" />
            </span>
            <h2 class="text-2xl font-extrabold text-slate-900 md:text-3xl">{{ blok.baslik }}</h2>
          </div>
          <p class="mt-5 text-slate-500">{{ blok.giris }}</p>
          <ol class="mt-6 space-y-4">
            <li v-for="(kural, i) in blok.kurallar" :key="i" class="flex gap-4">
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-purple-100 text-sm font-extrabold text-purple-700">{{ i + 1 }}</span>
              <span class="pt-1 text-slate-600">{{ kural }}</span>
            </li>
          </ol>
        </div>
      </section>

      <!-- Önemli tarihler -->
      <section :data-section="t('paperRules.datesTitle')" class="mb-24">
        <h2 class="mb-10 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{{ t('paperRules.datesTitle') }}</h2>

        <div class="grid gap-8 lg:grid-cols-[1fr_2fr]">
          <div>
            <h3 class="mb-5 flex items-center gap-2 text-lg font-bold text-slate-700">
              <Icon name="paperRules" class="h-5 w-5 text-purple-600" /> {{ t('paperRules.abstractDatesTitle') }}
            </h3>
            <div class="space-y-4">
              <div
                v-for="tarih in tm('paperRules.abstractDates')"
                :key="tarih.etiket"
                class="rounded-3xl bg-gradient-to-br from-purple-700 to-fuchsia-600 p-6 text-white shadow-lg shadow-purple-500/25"
              >
                <p class="text-xl font-extrabold">{{ tarih.tarih }}</p>
                <p class="mt-1 text-sm text-white/75">{{ tarih.etiket }}</p>
              </div>
            </div>
            <p class="mt-4 flex items-start gap-2 text-sm italic text-slate-500">
              <Icon name="info" class="mt-0.5 h-4 w-4 shrink-0" /> {{ t('paperRules.abstractNote') }}
            </p>
          </div>

          <div>
            <h3 class="mb-5 flex items-center gap-2 text-lg font-bold text-slate-700">
              <Icon name="registration" class="h-5 w-5 text-purple-600" /> {{ t('paperRules.registrationDatesTitle') }}
            </h3>
            <ol class="grid gap-4 sm:grid-cols-2">
              <li
                v-for="(tarih, i) in tm('paperRules.registrationDates')"
                :key="tarih.etiket"
                class="card flex items-start gap-4 p-6"
              >
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-500 to-orange-400 text-sm font-extrabold text-white">{{ i + 1 }}</span>
                <div>
                  <p class="text-lg font-extrabold text-slate-900">{{ tarih.tarih }}</p>
                  <p class="mt-1 text-sm text-slate-500">{{ tarih.etiket }}</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- Şablon -->
      <section :data-section="t('paperRules.templateTitle')" class="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-indigo-950 via-purple-800 to-fuchsia-700 px-8 py-12 text-white md:px-14 md:py-16">
        <div class="bg-grid pointer-events-none absolute inset-0 opacity-60"></div>
        <div class="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 class="text-3xl font-extrabold md:text-4xl">{{ t('paperRules.templateTitle') }}</h2>
            <p class="mt-3 text-lg text-white/75">{{ t('paperRules.templateDesc') }}</p>
          </div>
          <a
            href="#"
            class="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-purple-700 shadow-xl transition hover:-translate-y-0.5"
          >
            <Icon name="download" class="h-5 w-5" stroke="2.2" />
            {{ t('paperRules.templateBtn') }}
          </a>
        </div>
      </section>
    </div>
  </div>
</template>
