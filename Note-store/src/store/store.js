import {configureStore} from '@reduxjs/toolkit'
 import pastereducer from './slice'

 export  const store= configureStore({
    reducer: {
     paste: pastereducer
    }
 })