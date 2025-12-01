import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RootProvider } from '@/components/Provider/RootProvider'
import App from './App'
import './styles/global.scss'
import './styles/variables.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootProvider>
      <App />
    </RootProvider>
  </StrictMode>
)
