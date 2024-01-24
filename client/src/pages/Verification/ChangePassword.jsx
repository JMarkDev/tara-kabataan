import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import api from '../../api/api'
import Loading from "../../components/loading/otpLoader/otpLoader";

function ChangePassword() {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
//   const [successMessage, setSuccessMessage] = useState('')
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoader(true);
    setEmailError('');
    try {
      const response = await api.post('/auth/change-password', { email } );
      if(response.data.status === 'success') {
        // setSuccessMessage(response.data.message)
        navigate('/change-password-otp', { state: { email } })
      }
      console.log(response.data)
    } catch (error) {
      setLoader(false);
      setEmailError(error.response.data.message)
      console.log(error)
    }
  }

  return (
    <>
    <div className='flex items-center justify-center h-screen'>
    { loader && 
      <div className="absolute flex items-center justify-center h-screen">
        <Loading />
      </div>
    }
      <div className="w-[350px] sm:mx-auto sm:w-full sm:max-w-lg px-8 py-10 mt-6 overflow-hidden bg-white p-4 rounded-lg shadow-md">
        <div className='flex'>
        <Link to="/login" className="flex items-center gap-2 mb-4">
          <MdOutlineKeyboardBackspace className='text-2xl'/>
        </Link>
        <h1 className="ml-5 text-2xl font-semibold mb-4">Forgot Password?</h1>
        </div>
        <h3 className='text-gray-600 mb-6'>Please type in your email address for a password OTP</h3>

        <form onSubmit={handleSendOtp} >
          <div>
            <label className='block text-gray-700'>Email</label>
            <input
              type="text"
              className={`block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                emailError ? 'border-red-600' : '' // Apply border-red-600 class when there's an error
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* error message */}
          {emailError && <div className="text-red-600 text-sm">{emailError}</div>}
          <button
            type="submit"
            className="mt-8 flex w-full justify-center rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58]
            px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm transition-all duration-300 ease-in-out 
            hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] "
         >
            Continue
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default ChangePassword;
