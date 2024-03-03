import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../../api/api'
import { AiOutlineUser } from "react-icons/ai";
import Cookies from 'js-cookie'

const Profile = () => {
  const userId = Cookies.get('userId')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`)
          const { firstname, lastname, email, gender } = response.data
          setName(`${firstname} ${lastname}`)
          setEmail(email)
          setGender(gender)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [userId])


  return (
    <div className="md:p-20 h-[100vh] flex flex-col md:flex-row gap-5 p-5">
      <div className="min-w-[200px] p-5 rounded-lg bg-gray-200">
        <ul className='flex flex-row md:flex-col '>
          <li>
            <Link to="/my-account" className='px-3 py-2 flex text-[#6414ff] md:text-lg text-sm text-nowrap'>
              My Account  
            </Link>
          </li>
          <li>
            <Link to="/joined-events" className='px-3 py-2 flex text-[#6414ff] md:text-lg text-sm text-nowrap'>
              Joined Events
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-full p-5 bg-gray-100">
        <h1 className='font-bold text-xl text-[#243e63] mb-5'>Personal details</h1>
        <div className='p-5 max-w-lg m-auto text-gray-500 bg-gray-200 rounded-lg'>
        <div className='flex justify-center mb-5'>
          <div className="cursor-pointer flex justify-center items-center flex-col" onClick={handleButtonClick}>
            <input ref={fileInputRef} id="file-upload" type="file" className="hidden" onChange={handleImageChange} />
            {image ? (
              <img src={image} className='h-[100px] w-[100px] rounded-full bg-gray-400 mb-2' alt="Uploaded Profile" />
            ) : (
              <AiOutlineUser className='h-[100px] w-[100px] rounded-full bg-gray-400 mb-2' />
            )}
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Image</button>
          </div>
        </div>
          <div className='flex items-center justify-between mb-5'>
            <p className="font-semibold">Name:</p>
            <p>{name}</p>
          </div>
          <div className='flex items-center justify-between mb-5'>
            <p className="font-semibold">Email:</p>
            <p>{email}</p>
          </div>
          <div className='mb-5 flex justify-between'>
            <p className="font-semibold">Gender:</p>
            <div className="flex gap-4">
            <label className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        // disabled
                        onChange={() => setGender('Male')}
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
                        checked={gender === 'Female'}
                        onChange={() => setGender('Female')}
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
                        onChange={() => setGender('Non-binary')}
                        className="accent-blue-600 form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                      />
                      <span className="ml-2">Non-binary</span>
                    </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
