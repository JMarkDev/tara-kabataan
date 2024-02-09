import { useState } from "react";
import api from "../api/api";

const CompleteEvent = ({ handleCloseModal, eventID, eventData }) => {
  const [images, setImages] = useState([])

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setImages(prevData => ({
      ...prevData,
      [name]: name === 'image' ? files : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const { image } = images;

        const data = new FormData();

        for(let i = 0; i < image.length; i++) {
        data.append('image', image[i]);
        }

        const response = await api.put(`/archive/update/${eventID}`, data)
        console.log(response.data)
        if(response.data.status === 'success') {
            handleCloseModal(eventID)
            alert(response.data.message)
        }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
    <div className="fixed inset-0 z-50 flex justify-center items-center overflow-y-auto bg-black bg-opacity-10">
      <div className="relative p-4 w-full max-w-lg">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              Completed Event
            </h3>
            <button
              type="button"
              onClick={handleCloseModal}
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
            <h1>Please upload the image of the event</h1>
            <form onSubmit={handleSubmit} action="" method="PUT" encType="multipart/form-data">
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold"
                >
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  multiple
                  required
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleCloseModal}
                  className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-red-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 h-10 bg-green-500 text-white px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                >
                  Completed
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default CompleteEvent;
