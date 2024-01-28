import { useEffect, useState } from "react"
import UserTable from "../../../components/UserTable"
import api from "../../../api/api"

const Admin = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getUsers = async () => {
        try {
          const response = await api.get('/user/role/admin')
          console.log(response.data)
          setData(response.data)
        } catch (error) {
          console.log(error)
        }
    }

    getUsers()
  }, [])

  return (
    <div>
      <UserTable data={data}/>
    </div>
  )
}

export default Admin