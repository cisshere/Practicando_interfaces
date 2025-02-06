import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrimeReactProvider } from 'primereact/api';


createRoot(document.getElementById('root')!).render(
  <PrimeReactProvider>
    <App />
  </PrimeReactProvider>,
)
