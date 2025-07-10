import React from 'react'
import { RouterProvider, createBrowserRouter } from  'react-router-dom'
import Layout from './Layout'
import About from './About'
import Home from './Home'
import Github  from './Github'
import Params from './Params'
import Contact from './Contact'


const router = createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"",
                element:<Home/>,
            },
            {
                path:"about",
                element:<About/>,
            },
            {
                path:"git",
                element:<Github/>,
            },
             {
                path:"contact",
                element:<Contact/>,
            },
            {
                path:"param:id",
                element:<Params/>,
            }
        ]
    },
])

function App (){
<div>
  <RouterProvider router={router}/>
</div>
}

export default App