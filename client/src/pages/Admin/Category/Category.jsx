import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import Pagination from "../../../components/Pagination"
import api from "../../../api/api"
import { MdSearch } from 'react-icons/md'
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import EditCategory from "./EditCategory";


const Category = () => {
  const [data, setData] = useState([])
  const [categoryID, setCategoryID] = useState('')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [formData, setFormData] = useState({
    category_name: '',
    image: null
  })

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: name === 'image' ? files : value
    }))
}

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let response;
          if(search) {
            response = await api.get(`/category/search/${search}`)
            setData(response.data)
          } else {
            response = await api.get(`/category/pagination?page=${currentPage}&size=10`)
            setData(response.data.category)
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

  const handleAddCategory = async (e) => {
    e.preventDefault()

    const { category_name, image } = formData
    const data = new FormData()

    data.append('category_name', category_name)
    for(let i = 0; i < image.length; i++) {
      data.append('image', image[i]);
    } 

    try {
      const response = await api.post('/category/add', data)
      if(response.data.status === 'success') {
        alert(response.data.message)
        const updatedData = await api.get(`/category/pagination?page=${currentPage}&size=10`)
        setData(updatedData.data.category)
        setModal(false)
      }
    }  catch (error) {
    setErrorMessage(error.response.data.message)
      console.log(error)
    }  

  }

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/category/delete/${id}`)
      if (response.data.status === 'success') {
        const updatedData = data.filter((category) => category.id !== id)
        setData(updatedData)
        alert('Category deleted successfully')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCategoryUpdate = async () => {
    try {
      const updatedData = await api.get(`/category/pagination?page=${currentPage}&size=10`)
      setData(updatedData.data.category)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
    setModal(false)
    setEdit(false)
  }

  const handleEdit = (id) => {
    setEdit(!edit)
    setCategoryID(id)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-3 justify-between pb-5">
      <div>
    <button
        onClick={( ) => { 
          setModal(true)
          setErrorMessage('')
        }}
        className="text-center rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58] px-5 py-2 text-md font-normal text-white hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58]"
    >
        Add Category
    </button>

    {/* Modal Container */}
    {modal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto  bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-lg">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 border-b rounded-t ">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Add Category
                        </h3>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                      <form onSubmit={handleAddCategory} action="" method="POST" encType="multipart/form-data">
                      <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="category_name"
                      name="category_name"
                      required
                      onChange={handleInputChange}
                      className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                        errorMessage ? 'border-red-600' : ''
                      }`}
                    />
                    {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>}
                  </div>
                  <div className="mb-4 dark:text-white">
                        <label htmlFor="image" className="block text-gray-700 font-bold dark:text-white ">
                          Image
                        </label>
                        <input
                          type="file"
                          id="image"
                          name="image"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none text-center"
                          required
                          onChange={handleInputChange}              
                        />
                        
                    </div>
                      <div className='flex justify-end pt-5'>
                        <button onClick={handleClose} className="w-full text-center mr-2 py-2 bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200">   
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                          Save
                        </button>
                        </div>
                      </form>
                      
                    </div>
                </div>
            </div>
        </div>
    )}
</div>

          

        <div className="flex justify-end items-center relative"> 
          <input type="text" placeholder="search category..." 
            className="lg:w-[350px]  p-2 px-5 outline-none focus:border-indigo-600 border shadow-lg rounded-full"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="text-2xl absolute right-0  pr-2">
            <MdSearch  />
          </button>
        </div>
      </div>
      <div className="flex-1 mb-20">
      <table className="w-full text-md text-left rtl:text-right text-gray-500">
        <thead className="text-sm text-gray-700 uppercase bg-gray-300 ">
        <tr className="whitespace-nowrap">
        <th scope="col" className="px-6 py-3">
            Category ID
        </th>
        <th scope="col" className="px-6 py-3">
            Category Image
        </th>
        <th scope="col" className="px-6 py-3">
            Category Name
        </th>
        <th scope="col" className="px-6 py-3">
            Action
        </th>
    </tr>
        </thead>
        <tbody>
            { data.map(({ id, category_name, image }) => {
                return (
                <tr key={id} className="bg-white hover:bg-gray-100 border-b ">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                            {id}
                        </th>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            <img className=" h-[50px] w-[100px]"
                             src={`${api.defaults.baseURL}${image}`} alt="category image" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                            {category_name}
                        </td>
                        <td className=" m-auto text-md relative">
                                <div className="flex items-center justify-center gap-5">
                                <button 
                                onClick={() => handleEdit(id)}
                                className="font-bold text-xl p-2 mt-3 bg-gray-200 rounded-md text-green-600 text-center flex items-center">
                                    <FaRegEdit />
                                </button> 
                                {edit && (
                                  <EditCategory 
                                  categoryID={categoryID}
                                  handleClose={handleClose}
                                  handleCategoryUpdate={handleCategoryUpdate}
                                  />
                                )}
                                  <Link 
                                    to={`/filter-event-category/${category_name}`}
                                  className="font-bold text-xl p-2 mt-3 bg-gray-200 rounded-md text-blue-600 text-center flex items-center">
                                  <MdRemoveRedEye />
                                </Link>
                                <button className="font-bold text-xl p-2 mt-3 bg-gray-200 rounded-md text-red-500"><RiDeleteBin6Line 
                                 onClick={() => handleDelete(id)}
                                /></button>

                                </div>

                        </td>
                    </tr>
                )
            })}
            
        </tbody>
    </table>
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

export default Category;
