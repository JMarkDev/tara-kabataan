import React, { useState, useEffect } from "react";
import api from "../api/api";  
export default function FeaturedImageGallery({ id }) {
  const [data, setData] = useState([])
  const [active, setActive] = useState('')

  useEffect(() => {
      const fetchData = async () => {
          try {
            if(id) {
              const response = await api.get(`/archive/id/${id}`)
              const imageData = response.data?.images.split(',')
              setData(imageData)
              if(typeof imageData !== 'undefined') {
                imageData !== 'undefined' && setActive(`${api.defaults.baseURL}/uploads/${imageData[0]}`)
              }
            }
          } catch (error) {
              console.log(error)
          }
      }
      fetchData()
  }, [id])

  const handleImageLink = (image) => {
      setActive(`${api.defaults.baseURL}/uploads/${image}`)
  }
 

  return (
<>
    { data && (
        <div className="grid gap-4 bg-[#f6f6f6] p-5">
      <div>
        <img
          className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
          src={active}
          alt=""
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        {data?.map(( image , index) => (
          <div key={index}>
            <img
              onClick={() => handleImageLink(image)}
              src={`${api.defaults.baseURL}/uploads/${image}`}
              className="h-30 w-full cursor-pointer rounded-lg object-cover object-center"
              alt="gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
     )} 
        
</>
    
  );
}