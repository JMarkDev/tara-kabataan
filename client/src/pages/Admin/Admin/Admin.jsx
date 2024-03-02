import { useEffect, useState } from "react"
import UserTable from "../../../components/UserTable"
import api from '../../../api/api'
import { MdSearch } from 'react-icons/md'
import { Link } from "react-router-dom"
import { useToast } from "../../../hooks/useToast"

const Admin = () => {
  const toast = useToast();
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getUsers = async () => {
        try {
          let response;
          if(search) {
            response = await api.get(`/user/search/${search}/admin`);
            setData(response.data)
          } else {
            response = await api.get('/user/role/admin')
            setData(response.data)
          }
        } catch (error) {
          console.log(error)
        }
    }

    getUsers()
  }, [search])

  const handleDelete = async (id) => {
    
    try {
      const response = await api.delete(`/user/delete/${id}`)
      if(response.data.status === 'success') {
        toast.success(response.data.message)
        const updatedData = data.filter((user) => user.id !== id)
        setData(updatedData)
      }

    } catch (error) {
      console.log(error)
    }
  }

  // const handleFilter = async (value) => {
  //   try {
  //     let response;
  //     if(value === 'Default') {
  //         response = await api.get('/user/role/admin')
  //         setData(response.data)
  //     } else {
  //         response = await api.get(`/user/filter/${value}/admin`)
  //         setData(response.data)
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  return (
    <div>
        <div className="flex flex-col md:flex-row gap-3 justify-between pb-5">
          <div className="flex justify-start items-center">
            <Link to='/add-admin' className=" w-[150px] text-center rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58] px-5 py-2 text-md font-normal text-white hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] ">
              Add Admin
            </Link>
          </div>
        <div className="flex justify-end items-center relative"> 
          <input type="text" placeholder="search admin..." 
            className="lg:w-[350px] p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-2xl absolute right-0  pr-2">
            <MdSearch  />
          </button>
        </div>
      </div>

      <UserTable data={data} handleDelete={handleDelete}/>
    </div>
  )
}

export default Admin