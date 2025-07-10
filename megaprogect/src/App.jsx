import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./assets/store/authSlice"
import { Footer, Header } from './components/index'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  },[])
  
  return !loading ? (
  
    <div className='min-h-screen flex flex-wrap content-between bg-orange-500'>
      <div className='w-full block'>
        <Header />
        <main >
       <h1 className='text-3xl text-black py-2 font-bold'>Welcome:</h1>  <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  
  ) : null
}

export default App
