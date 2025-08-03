import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { Toaster } from './components/ui/sonner';
import store from './redux/store';
import ThemeProvider from './components/ThemeProvider'
<<<<<<< HEAD
=======

>>>>>>> 8547ed6a7e652260c0629c770677fe3763d43942
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster/>
    </Provider>
  </BrowserRouter>,
)
