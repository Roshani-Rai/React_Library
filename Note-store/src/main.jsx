import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Toaster} from 'react-hot-toast'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Paste from './Paste.jsx'
import Nabvar from './Nabvar.jsx'
import ViewPaste from './ViewPaste.jsx'
import { Provider } from 'react-redux'
import {store } from './store/store.js'

  const router=createBrowserRouter([
    {
      path:'/',
      element:
        <Nabvar/>,
      children:[
        {
      path:"",
      element:<Home/>
     },
     {
      path:'paste/:id',
      element:<ViewPaste/>
     },
     {
      path:'paste',
      element:<Paste/>
     }
     
      ]
    }
   
  ])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App/>
    </RouterProvider>
    <Toaster/>
    </Provider>
  </StrictMode>,
)
