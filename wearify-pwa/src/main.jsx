import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// ✅ Import registerSW dari virtual module
import { registerSW } from 'virtual:pwa-register'

// ✅ Register Service Worker dengan kontrol manual
const updateSW = registerSW({
  immediate: true,

  onNeedRefresh() {
    console.log('🔄 New content available, please refresh.')

    // Cek apakah user sudah dismiss dalam 1 jam terakhir
    const dismissed = sessionStorage.getItem('updateDismissed')
    const now = Date.now()

    if (!dismissed || (now - parseInt(dismissed)) > 60 * 60 * 1000) {
      // Tampilkan update toast
      const toast = document.getElementById('updateToast')
      if (toast) {
        toast.classList.add('show')
      }

      // Auto-hide setelah 30 detik jika tidak ada aksi
      setTimeout(() => {
        const toast = document.getElementById('updateToast')
        if (toast && toast.classList.contains('show')) {
          toast.classList.remove('show')
        }
      }, 30000)
    }
  },

  onOfflineReady() {
    console.log('✅ App ready to work offline')

    // Opsional: Tampilkan notifikasi
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Wearify', {
        body: 'App siap digunakan offline!',
        icon: '/pwa-192x192.png',
        badge: '/pwa-64x64.png',
      })
    }
  },

  onRegistered(swRegistration) {
    console.log('✅ Service Worker registered')

    // Check for updates setiap 1 jam
    if (swRegistration) {
      setInterval(() => {
        swRegistration.update()
      }, 60 * 60 * 1000) // 1 jam
    }
  },

  onRegisterError(error) {
    console.error('❌ Service Worker registration failed:', error)
  },
})

// Expose updateSW globally untuk debugging
window.updateServiceWorker = updateSW

// Install Prompt Handler
let deferredPrompt = null

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  deferredPrompt = e
  console.log('💾 PWA install prompt available')

  // Dispatch custom event untuk komponen React
  window.dispatchEvent(new Event('pwa-installable'))
})

// Make install function globally accessible
window.installPWA = async () => {
  if (!deferredPrompt) {
    console.log('Install prompt not available')
    return false
  }

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  console.log(`User response to install prompt: ${outcome}`)

  if (outcome === 'accepted') {
    deferredPrompt = null
    return true
  }

  return false
}

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA was installed')
  deferredPrompt = null

  // Opsional: Track dengan analytics
  // gtag('event', 'pwa_install')
})

// Request notification permission (optional)
if ('Notification' in window && Notification.permission === 'default') {
  // Jangan request langsung, tunggu user action
  // Notification.requestPermission()
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)