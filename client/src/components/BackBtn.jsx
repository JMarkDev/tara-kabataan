import React from 'react'
import { IoArrowBack } from "react-icons/io5";

const BackBtn = () => {
    const handleBack = () => {
        window.history.back()
    }
  return (
    <div className=''>
        <button
        onClick={handleBack}
        className='flex gap-2 items-center mr-5 bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg'
       ><IoArrowBack />Back</button>
    </div>
  )
}

export default BackBtn