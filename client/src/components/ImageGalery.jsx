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
                const imageData = response.data.images.split(',')
                setData(imageData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

  return (

<div className="grid grid-cols-2 md:grid-cols-3 gap-5">
    { data.map((image, index) => (
        <div key={index} className='transition-transform transform scale-100 group-hover:scale-150 hover:z-50 hover:scale-150'>
            <img className=" h-auto max-w-full rounded-lg " 
            src={`${api.defaults.baseURL}/uploads/${image}`} alt="" 
            />
        </div>
    )) }
</div>

  )
}

export default ImageGalery