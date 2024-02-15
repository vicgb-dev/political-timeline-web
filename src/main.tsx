import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@radix-ui/themes/styles.css'
import { Theme, ThemePanel } from '@radix-ui/themes'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

// Crear una instancia de caché de Emotion
const cache = createCache({ key: 'css', prepend: true })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={cache}>
      <Theme appearance='dark'>
        <App />
        <ThemePanel />
      </Theme>
    </CacheProvider>
  </React.StrictMode>
)
