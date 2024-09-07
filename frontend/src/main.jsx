import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './app.css';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { store } from './Redux/Store.jsx';
// npm run dev -- --host

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
          <App/>
      </Provider>
  </BrowserRouter>
)
