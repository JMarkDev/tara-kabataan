import React from 'react'

const JoinEvent = ({ handleClose }) => {
  return (
        <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto  bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-lg">
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
                      <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold dark:text-white">
                      Category Name
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
                        //   onChange={handleInputChange}              
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
  )
}

export default JoinEvent