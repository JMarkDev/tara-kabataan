import { useEffect, useState } from "react"
import UserTable from "../../../components/UserTable"
import api from '../../../api/api'
import { MdSearch } from 'react-icons/md'
// import Dropdown from "../../../components/Dropdown"

const Admin = () => {
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
        <div className="flex justify-between items-center pb-5">
          <div className="flex justify-center items-center">
            <button className=" w-[150px] rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58] px-5 py-2 text-md font-normal text-white hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] ">
              Add Admin
            </button>
          </div>
        <div className="flex justify-center items-center relative"> 
          <input type="text" placeholder="search events" 
            className="lg:w-[350px] p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-2xl absolute right-0  pr-2">
            <MdSearch  />
          </button>
        </div>
      </div>

      <UserTable data={data}/>
    </div>
  )
}

export default Admin