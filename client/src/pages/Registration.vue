<script setup>
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import PageHero from '../components/PageHero.vue'
import Icon from '../components/Icon.vue'

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

const renkler = ['from-cyan-500 to-blue-600', 'from-purple-600 to-fuchsia-600', 'from-rose-500 to-orange-400']
const ikonlar = ['paperRules', 'presentation', 'speakers']

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 transition focus:border-purple-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-500/15'
</script>

<template>
  <div>
    <PageHero :title="t('registration.title')" :subtitle="t('registration.subtitle')" icon="registration" />

    <div class="container-site py-16 md:py-24">
      <!-- Ücret kartları -->
      <section :data-section="t('registration.feesTitle')" class="mb-24">
        <h2 class="mb-10 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{{ t('registration.feesTitle') }}</h2>

        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(satir, i) in tm('registration.fees')"
            :key="satir.kategori"
            :class="[
              'relative flex flex-col rounded-[2rem] p-8 transition duration-300 hover:-translate-y-1 md:p-10',
              i === 1
                ? 'bg-gradient-to-br from-indigo-950 via-purple-800 to-fuchsia-700 text-white shadow-2xl shadow-purple-500/30 md:-my-4 md:py-14'
                : 'card hover:shadow-xl',
            ]"
          >
            <span
              v-if="i === 1"
              class="absolute right-6 top-6 rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white"
            >
              {{ t('registration.popular') }}
            </span>
            <span :class="['grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg', renkler[i % 3]]">
              <Icon :name="ikonlar[i % 3]" class="h-7 w-7" />
            </span>
            <h3 :class="['mt-6 text-2xl font-extrabold', i === 1 ? 'text-white' : 'text-slate-900']">{{ satir.kategori }}</h3>

            <div class="mt-8 space-y-4">
              <div :class="['flex items-end justify-between rounded-2xl p-4', i === 1 ? 'bg-white/10' : 'bg-purple-50']">
                <span :class="['text-sm font-semibold', i === 1 ? 'text-white/70' : 'text-slate-500']">{{ t('registration.earlyBird') }}</span>
                <span :class="['text-3xl font-extrabold', i === 1 ? 'text-white' : 'text-purple-700']">{{ satir.erken }}</span>
              </div>
              <div :class="['flex items-end justify-between rounded-2xl p-4', i === 1 ? 'bg-white/5' : 'bg-slate-50']">
                <span :class="['text-sm font-semibold', i === 1 ? 'text-white/70' : 'text-slate-500']">{{ t('registration.lateBird') }}</span>
                <span :class="['text-xl font-bold', i === 1 ? 'text-white/90' : 'text-slate-700']">{{ satir.gec }}</span>
              </div>
            </div>
          </div>
        </div>
        <p class="mt-8 text-sm text-slate-400">{{ t('registration.feesNote') }}</p>
      </section>

      <!-- Kayıt formu -->
      <section :data-section="t('registration.formTitle')" class="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
        <div class="lg:sticky lg:top-32">
          <span class="eyebrow"><Icon name="registration" class="h-4 w-4" /> {{ t('registration.formTitle') }}</span>
          <h2 class="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">{{ t('registration.formTitle') }}</h2>
          <p class="mt-4 text-lg text-slate-500">{{ t('registration.formSubtitle') }}</p>
          <ul class="mt-8 space-y-3">
            <li v-for="satir in tm('registration.fees')" :key="satir.kategori" class="flex items-center gap-3 text-slate-600">
              <span class="grid h-6 w-6 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                <Icon name="check" class="h-4 w-4" stroke="2.5" />
              </span>
              {{ satir.kategori }}
            </li>
          </ul>
        </div>

        <form @submit.prevent="formGonder" class="card grid gap-6 p-8 md:grid-cols-2 md:p-10">
          <div class="md:col-span-2">
            <label class="mb-2 block text-sm font-bold text-slate-700">{{ t('registration.fullName') }}</label>
            <input v-model="form.adSoyad" type="text" :class="inputClass" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold text-slate-700">{{ t('registration.email') }}</label>
            <input v-model="form.eposta" type="email" :class="inputClass" />
          </div>
          <div>
            <label class="mb-2 block text-sm font-bold text-slate-700">{{ t('registration.institution') }}</label>
            <input v-model="form.kurum" type="text" :class="inputClass" />
          </div>
          <div class="md:col-span-2">
            <label class="mb-2 block text-sm font-bold text-slate-700">{{ t('registration.category') }}</label>
            <div class="grid gap-3 sm:grid-cols-3">
              <label
                v-for="secenek in [
                  { deger: 'student', etiket: t('registration.categoryStudent') },
                  { deger: 'academic', etiket: t('registration.categoryAcademic') },
                  { deger: 'listener', etiket: t('registration.categoryListener') },
                ]"
                :key="secenek.deger"
                :class="[
                  'flex cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-sm font-semibold transition',
                  form.kategori === secenek.deger
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-slate-200 text-slate-600 hover:border-purple-200',
                ]"
              >
                <input v-model="form.kategori" type="radio" :value="secenek.deger" class="accent-purple-600" />
                {{ secenek.etiket }}
              </label>
            </div>
          </div>
          <button
            type="submit"
            class="cursor-pointer rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-purple-500/30 transition hover:-translate-y-0.5 md:col-span-2"
          >
            {{ t('registration.submit') }}
          </button>
        </form>
      </section>
    </div>
  </div>
</template>
