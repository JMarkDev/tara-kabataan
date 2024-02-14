import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import EventCard from '../../components/EventCard'
import { MdSearch } from 'react-icons/md'

const Events = () => {
  const [category , setCategory] = useState([])
  const [event, setEvent] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get('/category/all')
        console.log(response.data)
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
        setEvent(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvent()
  }, [])

  return (
    <div>
       <div className="flex justify-between p-5 items-center"> 
          <h1>All Events</h1>
          <div className='flex justify-end items-center'>
            <input type="text" placeholder="search events..." 
              className="lg:w-[350px] p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
              // onChange={(e) => setSearch(e.target.value)}
            />
            <button className="text-2xl absolute items-center mr-3">
              <MdSearch  />
            </button>
          </div>
        </div>
      {/* <div className='flex justify-end p-5'>
        <input className='p-3 w-[350px] rounded-full' type="text" placeholder='Search events...'/>
      </div> */}
      <div className='flex'>
        <div className='w-[250px] p-5 text-[#243e63]'>
          <h1 className='text-lg font-bold py-3 text-[#243e63]'>Filters By:</h1>
            <div>
              <h1 className='mt-5 font-bold'>Status</h1> 
                <div className='p-3 flex flex-col gap-3 py-2'>
                  <div className='flex gap-3'>
                    <input type="radio" value="upcoming" />
                    <label>Upcoming</label>
                  </div>
                  <div className='flex gap-3'>
                    <input type="radio" value="completed" />
                    <label>Completed</label>
                  </div>
                </div>
              </div>
              <div>
                <h2 className='mt-5 font-bold'>Category:</h2>
                <div className='p-3 flex flex-col gap-3 py-2'>
                  {category.map((cat) => (
                    <div key={cat.id} className='flex gap-3'>
                      <input type="radio" value={cat.category_name} />
                      <label >{cat.category_name}</label>
                    </div>
                  ))}
                </div>
              </div>
            {/* {category.map((cat) => (
              <divv className='p-3 flex gap-3 py-2'>
                <input type="radio" key={cat.id} value={cat.category_name} />
                <li key={cat.id}>{cat.category_name}</li> 
              </divv>
            ))} */}
            <div>
              <h2 className='mt-5 font-bold'>Price</h2>
              <div className='p-3 flex flex-col gap-3 py-2'>
                <div className='flex gap-3'> 
                  <input type="radio" value="free" />
                  <label>Free</label>
                </div>
                <div className='flex gap-3'>
                  <input type="radio" value="paid"/>
                  <label>Paid</label>
                </div>
              </div>
            </div>
        </div>
        <div>
          <EventCard event={event}/>
        </div>
      </div>
    </div>
  )
}

export default Events