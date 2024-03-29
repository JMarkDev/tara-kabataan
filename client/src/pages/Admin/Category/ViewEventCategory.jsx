import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import EventsTable from '../../../components/EventsTable'
import api from '../../../api/api'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import PropTypes from 'prop-types'
import Pagination from '../../../components/Pagination'
import BackBtn from '../../../components/BackBtn'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ViewEventCategory = () => {
    const [data, setData] = useState([])
    const { category_name } = useParams()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const response = await api.get(`/event/category/pagination?page=${currentPage}&size=10&event_category=${category_name}`)
                setData(response.data.events)
                setTotalPages(response.data.totalItems)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentPage, category_name])

    const handleFilter = async (value) => {
        try {
            let response;
            if(value === 'Default') {
                response = await api.get(`/event/category/pagination?page=${currentPage}&size=10&event_category=${category_name}`)
                setData(response.data.events)
                setTotalPages(response.data.totalItems)
            } else {
                response = await api.get(`/event/filter/event_type?event_type=${value}&event_category=${category_name}`)
                setData(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }
    

  return (
    <div>
        <div className='flex justify-between mb-5'>
        <BackBtn />
        <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-5 py-2 text-sm  text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Filter Event Type
          <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-[200px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
          <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? ' bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                  )}
                    onClick={(e) => handleFilter(e.target.textContent)}
                >
                  Default
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? ' bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                  )}
                    onClick={(e) => handleFilter(e.target.textContent)}
                >
                  Free
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm w-full text-left'
                  )}
                    onClick={(e) => handleFilter(e.target.textContent)}
                >
                  Paid
                </button>
              )}
            </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>

        </div>
        <EventsTable data={data} />
        {data.length !== 0 && (
          <div className='flex justify-end pt-10'>
          <Pagination 
              currentPage={currentPage} 
              onPageChange={handlePageChange}
              totalPages={totalPages}
          />
        </div>
        )}
    </div>
  )
}

export default ViewEventCategory