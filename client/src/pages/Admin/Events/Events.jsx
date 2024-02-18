import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import EventsTable from "../../../components/EventsTable"
import Pagination from "../../../components/Pagination"
import api from "../../../api/api"
import { MdSearch } from 'react-icons/md'


const Events = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response;
          if(search) {
            response = await api.get(`/event/search/${search}/Upcoming`)
            setData(response.data)
          } else {
            response = await api.get(`/event/pagination?page=${currentPage}&size=10&status=Upcoming`)
            setData(response.data.events)
            setTotalPages(response.data.totalItems) 
          }
      } catch (error) {
        console.log(error)
    }
    }

    fetchEvents()
  }, [search, currentPage])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  }  

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center pb-5">
        <Link
          to='/add-event'
          className=" w-[150px] text-center rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58] px-5 py-2 text-md font-normal text-white hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] "
        >
          Add Event
        </Link>
        <div className="flex justify-center items-center relative"> 
          <input type="text" placeholder="search events..." 
            className="lg:w-[350px] p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-2xl absolute right-0  pr-2">
            <MdSearch  />
          </button>
        </div>
      </div>
      <div className="flex-1 mb-20">
        <EventsTable data={data}/>
      </div>
      <div className="mt-auto m-10 absolute right-0 bottom-0">
        <Pagination 
            currentPage={currentPage} 
            onPageChange={handlePageChange}
            totalPages={totalPages}
            />
      </div>
    </div>
  );
};

export default Events;
