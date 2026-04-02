import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import SmoothScroll from './components/layout/SmoothScroll'
import PageLoader from './components/layout/PageLoader'
import CustomCursor from './components/layout/CustomCursor'
import ScrollProgressBar from './components/layout/ScrollProgressBar'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <SmoothScroll>
        <PageLoader />
        <CustomCursor />
        <ScrollProgressBar />
        <App />
      </SmoothScroll>
    </BrowserRouter>
  </React.StrictMode>,
)
