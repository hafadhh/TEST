import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NextUIProvider } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'

// import reducer from './store/index.js'
// import { Provider } from "react-redux";
// import { AuthProvider } from './utils/AuthProvider.js'
// const store = createStore(reducer)

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <NextUIProvider>
        {/* <Provider store={store}> */}
          {/* <AuthProvider> */}
           <BrowserRouter>
             <App />
            </BrowserRouter>  
          {/* </AuthProvider> */}
        {/* </Provider> */}
     </NextUIProvider>
    </StrictMode>
)
