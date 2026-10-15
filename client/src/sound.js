// Sayfa / bölüm geçişlerinde çalan yumuşak "tını".
// Ses dosyası kullanmaz; tarayıcının Web Audio özelliğiyle üretilir.
import { ref, watch } from 'vue'

function oku() {
  try {
    return localStorage.getItem('stemchip-ses') !== 'kapali'
  } catch {
    return true
  }
}

export const sesAcik = ref(oku())

watch(sesAcik, (acik) => {
  try {
    localStorage.setItem('stemchip-ses', acik ? 'acik' : 'kapali')
  } catch {
    /* tarayıcı izin vermezse önemli değil */
  }
})

let ctx = null
let kullaniciEtkilesti = false
let sonCalma = 0

// Tarayıcılar, kullanıcı sayfaya tıklamadan ses çalınmasına izin vermez.
// İlk tıklama / tuşa basmada ses sistemini hazırla.
function hazirla() {
  kullaniciEtkilesti = true
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (AC) ctx = new AC()
  }
  if (ctx && ctx.state === 'suspended') ctx.resume()
}
if (typeof window !== 'undefined') {
  for (const olay of ['pointerdown', 'keydown', 'touchstart']) {
    window.addEventListener(olay, hazirla, { passive: true })
  }
}

// Tek bir yumuşak nota
function nota(frekans, baslangic, sure, ses) {
  const osc = ctx.createOscillator()
  const kazanc = ctx.createGain()
  const filtre = ctx.createBiquadFilter()

  osc.type = 'sine'
  osc.frequency.value = frekans
  filtre.type = 'lowpass'
  filtre.frequency.value = 2400

  kazanc.gain.setValueAtTime(0.0001, baslangic)
  kazanc.gain.exponentialRampToValueAtTime(ses, baslangic + 0.02)
  kazanc.gain.exponentialRampToValueAtTime(0.0001, baslangic + sure)

  osc.connect(filtre).connect(kazanc).connect(ctx.destination)
  osc.start(baslangic)
  osc.stop(baslangic + sure + 0.05)
}

export function tiniCal() {
  if (!sesAcik.value || !kullaniciEtkilesti || !ctx) return
  const simdi = performance.now()
  if (simdi - sonCalma < 350) return // art arda çok sık çalmasın
  sonCalma = simdi

  const t = ctx.currentTime
  // İki notalı, kristal gibi yumuşak bir tını (Mi - Si)
  nota(1318.5, t, 0.9, 0.05)
  nota(1975.5, t + 0.07, 1.1, 0.035)
  nota(659.25, t, 0.6, 0.025) // alttan hafif dolgu
}
