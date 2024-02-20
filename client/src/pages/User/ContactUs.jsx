import React from 'react'
import img from '../../assets/images/undraw_contact_us_re_4qqt.svg'
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";

const ContactUs = () => {
  return (
    <div className='px-20'>
      <h1 className='text-center text-2xl lg:text-4xl p-10 font-bold'>Get In <span className='text-[#6415ff]'>Touch</span></h1>
      <div className='flex justify-center bg-white p-10'>
        <div className='w-[50%] p-10 flex-col'>
          <div className='flex justify-center'>
            <img src={img} alt="contact us" className=' h-[200px]'/>
          </div>
          <div className='mt-5'>
            <div className='flex items-center gap-3'>
              <FaPhone className='text-[#6415ff] text-2xl'/>
              <h1 className='text-xl font-bold p-2'>Call Us</h1>
            </div>
            <p className='text-md text-gray-600 p-2'>09123456789, 09123456789</p>
          </div>
          <div className='mt-5'>
            <div className='flex items-center gap-3'>
              <MdEmail className='text-[#6415ff] text-2xl'/>
              <h1 className='text-xl font-bold p-2'>Email</h1>
            </div>
            <p className='text-md text-gray-600 p-2'>tarakabataan2024@gmail.com</p>
          </div>
          <div className='mt-5'>
            <div className='flex items-center gap-3'>
              <FaLocationDot className='text-[#6415ff] text-2xl'/>
              <h1 className='text-xl font-bold p-2'>Location</h1>
            </div>
            <p className='text-md text-gray-600 p-2'>Brgy. Bulatok Pagadian City</p>
          </div>
        </div>
        <div className='rounded-lg bg-gray-200 p-10 w-[50%] flex flex-col'>
          <h1 className='text-center text-xl font-bold'>Contact Us</h1>
          <form action="">
            <div>
              <div className="mt-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Name
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Email
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Subject
                  </label>
                  <div className="flex flex-col items-start">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      className="mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 undefined"
                  >
                    Message
                  </label>
                  <div className="flex flex-col items-start">
                    <textarea rows={8}
                      type="text"
                      name="Type message here..."
                      placeholder="Send message here..."
                      className="mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
            </div>
            <button className='rounded-full p-2 px-10 bg-[#6415ff] text-white mt-5'>Submit</button>
            
          </form>
        </div>
        </div>
    </div>
  )
}

export default ContactUs