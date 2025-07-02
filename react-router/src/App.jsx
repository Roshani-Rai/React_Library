import React from 'react'
import { RouterProvider, createBrowserRouter } from  'react-router-dom'
import Layout from 'Layout.jsx'
import About from 'About.jsx'
import Home from 'Home.jsx'
import Github  from 'Github.jsx'
import Params from 'Params.jsx'
import Contact from 'Contact.jsx'

/*const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='param/:id' element={<Params />} />
     <Route 
      //loader={githubInfoLoader}
      path='git' 
    element={<Github />}
       />
    </Route>
  )
)*/
const router=createBrowserRouter([
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"",
                element:<Home/>
            },
            {
                path:"about",
                element:<About/>
            },
            {
                path:"git",
                element:<Github/>
            },
             {
                path:"contact",
                element:<Contact/>
            },
            {
                path:"param:id",
                element:<Params/>
            },
        ]
    }
])

function App (){
 <div>
    <RouterProvider router={router}/>
 </div>
}

export default App