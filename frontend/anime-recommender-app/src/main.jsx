import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AnimeRecommenderApp from './AnimeRecommenderApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AnimeRecommenderApp />
  </StrictMode>,
)
