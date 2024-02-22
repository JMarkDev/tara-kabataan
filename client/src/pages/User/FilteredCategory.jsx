import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import api from '../../api/api';
import EventCard from '../../components/EventCard';

const FilteredCategory = () => {
    const [event, setEvent] = useState([]);
    const { category } = useParams();
    const [categoryName] = useState(category)

    useEffect(() => {
        const fetchFilterEvents = async () => {
            try {
                const response = await api.get(`/event/filter/${category}`)
                setEvent(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchFilterEvents()
    }, [])
  return (
    <div className="px-5 xl:px-20">
    <div>
        <h1 className="text-[#243e63] lg:text-4xl text-2xl font-bold mt-10">{categoryName} <span className="text-[#6415ff]">Events</span></h1>

    </div>
      <div className="flex flex-col mt-7 justify-center items-center">
        <EventCard event={event} />
      </div>  
  </div>
  )
}

export default FilteredCategory