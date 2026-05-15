'use client';

import { useEffect } from 'react';

export default function ServiceWorkerCleanup() {
  useEffect(() => {
    // Memaksa unregister semua Service Worker lama yang nyangkut
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (let registration of registrations) {
          registration.unregister();
          console.log('Service Worker lama berhasil dihapus dari browser pengunjung.');
        }
      });
    }
  }, []);

  return null; // Komponen ini tidak menampilkan UI apa pun
}
