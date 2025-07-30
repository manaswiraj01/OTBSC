import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import appStore from './utils/appStore.js'
import { BrowserRouter } from 'react-router-dom'
import ContextProvider from './context/Context.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <BrowserRouter basename='/'>
      <ContextProvider>
        <App />
      </ContextProvider>
    </BrowserRouter>
  </Provider>
)
