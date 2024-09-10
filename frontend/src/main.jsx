import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './app.css';
import {Provider} from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { store } from './Redux/Store.jsx';
import { Toaster } from 'react-hot-toast';
// npm run dev -- --host

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
          <App/>
          <Toaster/>
      </Provider>
  </BrowserRouter>
)
