import { useState, useEffect } from "react"
import EventsTable from "../../../components/EventsTable"
import Pagination from "../../../components/Pagination"
import api from "../../../api/api"
import { MdSearch } from 'react-icons/md'

const Archives = () => {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response;
          if(search) {
            response = await api.get(`/event/search-by/${search}/Completed`)
            setData(response.data)
          } else {
            response = await api.get(`/event/pagination?page=${currentPage}&size=10&status=Completed`)
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
    <div>
        <div className="flex justify-center items-center relative mt-5"> 
          <input type="text" placeholder="search events..." 
            className="lg:w-[350px] absolute right-0 p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-2xl absolute right-0  pr-2">
            <MdSearch  />
          </button>
        </div>
      <div className="mt-10">
        <EventsTable data={data}/>
      </div>
      <div className="flex justify-end mt-10">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default Archives