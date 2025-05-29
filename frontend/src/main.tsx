import '@assets/styles/global.scss'
import './i18n'

import ReactDOM from 'react-dom/client'
import React from 'react'

import App from './App'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
