import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Page from './Page.jsx'
import Score from './Score.jsx'
import SnakeGame from './Game.jsx'
import ClassicalGame from './ClassicalGame.jsx'
import Navbar from './Navbar.jsx'
import {store} from '../store/store.js'
import { Provider } from 'react-redux'
import {createBrowserRouter, RouterProvider } from 'react-router'

const route=createBrowserRouter([
  {
    path:'/',
    element:<div>
      <Navbar/>
      <App/>
    </div>
  },
    {
       path:'/score',
       element:<div>
      <Navbar/>
      <Score/>
    </div>
    },
    {
      path:'/page/:id',
      element:<div>
      <Navbar/>
      <Page/>
    </div>
    },
    {
      path:'/classicSnake/:id',
      element:<ClassicalGame/>
    },
    {
      path:'/advanceSnake/:id',
      element:<SnakeGame/>
    },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <Provider store={store}>
   <RouterProvider router={route}></RouterProvider>
    </Provider>
    
  </StrictMode>,
)
