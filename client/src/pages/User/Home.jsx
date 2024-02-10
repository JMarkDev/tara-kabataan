import Carousel from "../../components/Carousel"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from '../../api/api'
import EventCard from "../../components/EventCard"

const Home = () => {
  const [category, setCategory] = useState([])
  const [event, setEvent] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get('/category/all')
        setCategory(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategory()
  }, [])

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await api.get('/event/upcoming')
        console.log(response.data)
        setEvent(response.data.splice(0, 6))
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvent()
  }, [])



  return (
    <>
      <Carousel />
<div className="px-5">
    <div>
      <h1 className="text-center text-[#243e63] lg:text-4xl text-2xl font-bold mt-10">Discover Our Exciting <span className="text-[#6415ff]">Categories</span></h1>
      <p className="text-center text-[#6b7280] lg:text-lg text-md mt-4">Explore a diverse range of event categories curated just for you. We have something amazing for everyone.</p>
    
      <div className="lg:px-10 grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">
        {category.map(({ id, category_name, image }) => (
          <div key={id} className="relative hover:scale-110 transition-all bg-white cursor-pointer rounded-md shadow-md">
            <img src={`${api.defaults.baseURL}${image}`} alt={category_name} className="w-full h-[250px] object-cover rounded-md" />
            <div className=" absolute inset-0 flex items-end p-5">
              <div className="absolute inset-0 bg-black opacity-40 rounded-md"></div>
              <h1 className="text-[#fff] text-xl font-bold z-10">{category_name}</h1>
            </div>
          </div>
        ))}
      </div>


      </div>
      <div>
    </div>
    <div>
    <div>
  <h1 className="text-center text-[#243e63] lg:text-4xl text-2xl font-bold mt-10">Upcoming <span className="text-[#6415ff]">Events</span></h1>
  <p className="text-center text-[#6b7280] lg:text-lg text-md mt-4">Stay ahead of the curve with our upcoming events. Don't miss out - mark your calendar and join the fun!</p>
  </div>
      <div className="flex flex-col justify-center items-center">
        <EventCard event={event} />
        <Link to="/events" className=" mt-10">
          <button className="px-7 py-3 rounded-full bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-600 text-md font-semibold leading-6 text-white shadow-sm transition-all duration-300 ease-in-out hover:from-pink-600 hover:to-purple-600 hover:via-indigo-400 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            View All Events
          </button>
        </Link>


      </div>  
  </div>

</div>    
    </>

  )
}

export default Home