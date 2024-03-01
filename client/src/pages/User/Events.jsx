import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import EventCard from '../../components/EventCard'
import { MdSearch } from 'react-icons/md'
import DropdownCategory from '../../components/DropdownCategory'

const Events = () => {
  const [filterSelected, setFilterSelected] = useState('');
  const [filterCategoryMobile, setFilterCategoryMobile] = useState('')
  const [filterType, setFilterType] = useState('')
  const [defaultEvent, setDefault] = useState(false)
  const [category , setCategory] = useState([])
  const [event, setEvent] = useState([])
  const [search, setSearch] = useState('')
  const [categoryName, setCategoryName] = useState([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterEventType, setFilterEventType] = useState('')

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get('/category/all')
        setCategory(response.data)

        const getCategoryName = response.data.map((name) => (
          name.category_name
        ))
        setCategoryName(getCategoryName)
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategory()
  }, [])

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        let response; 
        if (search) {
          response = await api.get(`/event/search-all/${search}`)
          setEvent(response.data)
        } else {
          response = await api.get('/event/all/upcoming')
          setEvent(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvent()
  }, [search])

  useEffect(() => {
    const fetchByStatus = async () => {
      try {
        let response;
        if (selectedStatus && filterEventType && filterCategory) {
          response = await api.get(`/event/filter/${selectedStatus}/${filterEventType}/${filterCategory}`)
          setEvent(response.data)
        }else if (filterEventType && filterCategory) {
          response = await api.get(`/event/filter/event_type?event_type=${filterEventType}&event_category=${filterCategory}`)
          setEvent(response.data)
        } else if (selectedStatus && filterCategory) {
          response = await api.get(`/event/filter/${selectedStatus}/${filterCategory}`)
          setEvent(response.data)
        } else if (selectedStatus && filterEventType) {
          response = await api.get(`/event/filter/status/${selectedStatus}/event-type/${filterEventType}`)
          setEvent(response.data)
        }
          else if(selectedStatus) {
          response = await api.get(`/event/filter-status/${selectedStatus}`)
          setEvent(response.data)
        } else if (filterCategory) {
          response = await api.get(`/event/filter/${filterCategory}`)
          setEvent(response.data)
        } else if (filterEventType) {
          response = await api.get(`/event/filter/event-type/${filterEventType}`)
          setEvent(response.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchByStatus()
  }, [selectedStatus, filterCategory, filterEventType])


  const handleFilter = async (filterSelected) => {
    try {
        const response = await api.get(`/event/filter-status/${filterSelected}`)
        setEvent(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleFilterCategory = async (selectedCategory) => {
    try {
      const response = await api.get(`/event/filter/${selectedCategory}`)
      setEvent(response.data)
    } catch (error) {
      console.log(error)
    }
  } 

  const handleFilterType = async(selectedType) => {
    try {
      const response = await api.get(`/event/filter/event-type/${selectedType}`)
      setEvent(response.data)
    } catch (error) {
      console.log(error)
    }
  }


  const handleDefault = async () => {
    try { 
      const response = await api.get('/event/all');
      setEvent(response.data);
      setDefault(true);
      setSelectedStatus('');
      setFilterCategory('');
      setFilterEventType('');
    } catch (error) {
      console.log(error);
    }
  };
  


  return (
    <div className=''>
  <div className="flex justify-between p-5 items-center"> 
    <h1 className='font-bold  lg:text-4xl text-xl text-[#243e63] cursor-pointer'
    onClick={() => handleDefault()}
    >All Events</h1>
    <div className='flex justify-end items-center'>
      <input type="text" placeholder="search events..." 
        className="lg:w-[350px] p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="text-2xl absolute items-center mr-3">
        <MdSearch  />
      </button>
    </div>
  </div>
  <div className='flex lg:flex-row flex-col'>
    <div className='lg:hidden flex justify-evenly py-5 items-center'>
    <h1 className='text-md font-bold text-[#243e63]'>Filters By:</h1>
      <DropdownCategory 
        options={[
          { label: 'Status', 
            links: ['Upcoming','Completed']
          }
        ]}
        handleFilter={handleFilter} // Pass the callback function directly
        setFilterSelected={setFilterSelected} // Pass the setter function to update the state
        setFilterCategoryMobile={setFilterCategoryMobile} // Pass the setter function for category
      />
      <DropdownCategory 
        options={[
          { label: 'Category', 
            links: categoryName
          }
        ]}
        handleFilter={handleFilterCategory} // Pass the callback function directly
        setFilterSelected={setFilterSelected} // Pass the setter function to update the state
        setFilterCategoryMobile={setFilterCategoryMobile} // P
      />
     <DropdownCategory 
        options={[
          { label: 'Price', 
            links: ['Free','Registration Fee']
          }
        ]}
        handleFilter={handleFilterType} 
        setFilterSelected={setFilterSelected} 
        setFilterCategoryMobile={setFilterCategoryMobile} 
      />
    </div>
    <div className='w-[250px] hidden lg:block  p-5 text-[#243e63]'>
      <h1 className='text-lg font-bold text-[#243e63]'>Filters By:</h1>
      <div className='flex gap-3 p-3'>
          <input 
          onChange={() => handleDefault()}
          type="radio" name="default" value="default"
          checked={selectedStatus || filterCategory ||filterEventType ? false : true}
          />
          <label>Default</label>
      </div>
      <div>
        <h1 className='mt-5 font-bold'>Status</h1> 
        <div className='p-3 flex flex-col gap-3 py-2'>
          <div className='flex gap-3'>
            <input 
            onChange={(e) => setSelectedStatus('Upcoming')}
            type="radio" name="status" value="upcoming"
            checked={selectedStatus === 'Upcoming'} />
            <label>Upcoming</label>
          </div>
          <div className='flex gap-3'>
            <input 
            onChange={(e) => setSelectedStatus('Completed')}
            type="radio" name="status" value="completed"
            checked={selectedStatus === 'Completed'} />
          <label>Completed</label>
          </div>
        </div>
      </div>
      <div>
        <h2 className='mt-5 font-bold'>Category:</h2>
        <div className='p-3 flex flex-col gap-3 py-2'>
          {category.map((cat) => (
            <div key={cat.id} className='flex gap-3'>
              <input 
              onChange={(e) => setFilterCategory(cat.category_name)}
              type="radio" name="category" value={cat.category_name} 
              checked={filterCategory === cat.category_name}
              />
              <label>{cat.category_name}</label>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className='mt-5 font-bold'>Price</h2>
        <div className='p-3 flex flex-col gap-3 py-2'>
          <div className='flex gap-3'> 
            <input 
            onChange={(e) => setFilterEventType('Free')}
            type="radio" name="price" value="free" 
            checked={filterEventType === 'Free'}
            />
            <label>Free</label>
          </div>
          <div className='flex gap-3'>
            <input 
            onChange={(e) => setFilterEventType('Registration Fee')}
            type="radio" name="price" value="Registration Fee"
            checked={filterEventType === 'Registration Fee'}
            />
            <label>Registration Fee</label>
          </div>
        </div>
      </div>
    </div>
    <div className='px-5 sm:px-10 lg:px-0 flex justify-center w-full'>
      <EventCard event={event}/>
    </div>
  </div>
</div>
  )
}

export default Events