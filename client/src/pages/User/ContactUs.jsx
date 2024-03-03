import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import api from '../../api/api';

import img from '../../assets/images/undraw_contact_us_re_4qqt.svg'
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import Cookies from 'js-cookie';


const ContactUs = () => {
  const form = useRef();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const id = Cookies.get('userId')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if(id) {
          const response = await api.get(`/user/id/${id}`)
          setName(response.data.firstname + ' ' + response.data.lastname)
          setEmail(response.data.email)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [id])

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_p0cen2y', 'template_wmngqc8', form.current, {
        publicKey: 'q8I-gVhBgrn6t9esu',
      })
      .then(
        () => {
          alert('Message Sent Successfully!');
          form.current.reset(); // Reset the form after successful submission
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };
  return (
    <div className='lg:px-20'>
      <h1 className='text-center text-2xl lg:text-4xl p-10 font-bold'>Get In <span className='text-[#6415ff]'>Touch</span></h1>
      <div className='flex md:flex-row flex-col justify-center bg-white lg:p-10 p-5'>
        <div className='md:w-[50%] w-full m-auto md:p-10 flex-col'>
          <div className='flex justify-center'>
            <img src={img} alt="contact us" className=' h-[200px]'/>
          </div>
          <div className='lg:mt-5'>
            <div className='flex items-center gap-3'>
              <FaPhone className='text-[#6415ff] lg:text-xl text-lg'/>
              <h1 className='md:text-xl text-lg font-bold p-2'>Call Us</h1>
            </div>
            <p className='text-md text-gray-600 p-2'>09123456789, 09123456789</p>
          </div>
          <div className='lg:mt-5'>
            <div className='flex items-center gap-3'>
              <MdEmail className='text-[#6415ff] lg:text-2xl text-lg'/>
              <h1 className='lg:text-xl text-lg font-bold p-2'>Email</h1>
            </div>
            <p className='text-md text-gray-600 p-2'>tarakabataan2024@gmail.com</p>
          </div>
          <div className='lg:mt-5'>
            <div className='flex items-center gap-3'>
              <FaLocationDot className='text-[#6415ff] lg:text-2xl text-lg'/>
              <h1 className='lg:text-xl text-lg font-bold p-2'>Location</h1>
            </div>
            <p className='text-md text-gray-600 p-2'>Brgy. Bulatok Pagadian City</p>
          </div>
        </div>
        <div className='m-auto mt-5 md:mt-0 rounded-lg bg-gray-200 lg:p-10 p-5 w-full md:w-[50%] flex flex-col'>
          <h1 className='text-center text-xl font-bold'>Contact Us</h1>
          <form action="" ref={form} onSubmit={sendEmail}>
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
                      defaultValue={name}
                      disabled
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
                      defaultValue={email}
                      disabled
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
                    <textarea rows={6}
                      type="text"
                      name="message"
                      placeholder="Send message here..."
                      className="mt-2 block w-full border py-2 px-2 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
            </div>
            <button 
              type="submit"
            className='rounded-full p-2 px-3 md:px-5 bg-indigo-500 hover:bg-indigo-800 text-white text-sm lg:text-lg mt-5'>Send Message</button>
            
          </form>
        </div>
        </div>
    </div>
  )
}

export default ContactUs