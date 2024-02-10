import React, { useEffect, useState } from 'react'
import api from '../api/api'
import { useParams } from 'react-router-dom'

const ImageGalery = () => {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get(`/archive/id/${id}`)
                const imageData = response.data?.images.split(',')
                setData(imageData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

  return (
    <div>
        { data && (
            <h1 className="text-center text-[#243e63] lg:text-4xl text-2xl font-bold m-10">Event <span className="text-[#6415ff]">Gallery</span></h1>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {data?.map((image, index) => (
            <div key={index} className='hover:scale-110 transition-all hover:z-50 '>
                <img className=" h-[250px] max-w-full rounded-lg " 
                src={`${api.defaults.baseURL}/uploads/${image}`} alt="" 
                />
            </div>
        )) }
    </div>
    </div>
  )
}

export default ImageGalery