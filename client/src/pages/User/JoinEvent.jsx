import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import Cookies from 'js-cookie'
import LocationComponent from '../../components/LocationComponent'
import PhoneInput from '../../components/PhoneInput'

const JoinEvent = ({ handleClose }) => {
  const userId = Cookies.get('userId')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(userId) {
          const response = await api.get(`/user/id/${userId}`)
          setFirstName(response.data.firstname)
          setLastName(response.data.lastname)
          setEmail(response.data.email)
          setGender(response.data.gender)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [userId])

  return (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto  bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-xl">
                <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 border-b rounded-t ">
                        <h3 className="text-xl font-semibold text-gray-900">
                            Please fill out informaton details
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
                      <form action="" method="POST" encType="multipart/form-data">
                      <div className="mb-4 flex md:flex-row flex-col justify-between">
                        <div>
                          <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            // disabled
                            defaultValue={firstName}
                            className='w-full md:w-[250px] border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          />
                        </div>
                        <div className='mt-4 md:mt-0'>
                          <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            // disabled
                            defaultValue={lastName}
                            className='w-full md:w-[250px] border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          // disabled
                          defaultValue={email}
                        //   onChange={handleInputChange}
                          className='block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                        {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
                      </div>
                      <div className="mt-2 mb-4">
                      <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                          Gender
                      </label>
                  <div className="flex items-start">
                    <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        // disabled
                        checked={gender === 'Male'}
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        // disabled
                        checked={gender === 'Femail'}
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                    <label className="inline-flex items-center ml-3">
                      <input
                        type="radio"
                        name="gender"
                        value="Non-Binary"
                        // disabled
                        checked={gender === 'Non-binary'}
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Non-binary</span>
                    </label>
                  </div>
                </div>
         
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                          Date of birth
                        </label>
                        <input
                          type="text"
                          id="category_name"
                          name="category_name"
                          required
                        //   onChange={handleInputChange}
                          className='block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        />
                        {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                          Phone Number
                        </label>
                        <div className='bg-red-500 flex '>
                        <PhoneInput />
                        </div>
                        {/* <input
                          type="text"
                          id="category_name"
                          name="category_name"
                          required
                        //   onChange={handleInputChange}
                          className='block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        /> */}
                        {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
                      </div>
                      <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                          Location
                        </label>
                        <LocationComponent />
                        {/* <input
                          type="text"
                          id="category_name"
                          name="category_name"
                          required
                        //   onChange={handleInputChange}
                          className='block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        /> */}
                        {/* {errorMessage && <div className="text-red-600 text-sm">{errorMessage}</div>} */}
                      </div>
                      <div className='flex justify-end pt-5'>
                        <button onClick={handleClose} className="w-full text-center mr-2 py-2 bg-gray-500 text-white px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200">   
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full py-2 h-10 bg-indigo-600 text-white px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
                        >
                          Submit
                        </button>
                        </div>
                      </form>
                      
                    </div>
                </div>
            </div>
        </div>
  )
}

export default JoinEvent