
import React from 'react'
import { useParams } from 'react-router-dom'

function Params() {
    const {id} = useParams()
  return (
    <div className='bg-gray-600 text-white text-3xl p-4'>User: {id}</div>
  )
}

export default Params