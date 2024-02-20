import React from 'react'
import mission from '../../assets/images/mission.jpg'
import tarakabataan from '../../assets/images/tarakabataan.jpg'
import img1 from '../../assets/images/Mark Kevin Cervas Nugas.jpg'
import img2 from '../../assets/images/AILISH O. PALA.jpg'
import img3 from '../../assets/images/CIELO T. SARATAO.jpg'
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";


const About = () => {
  return (
    <div>
      <h1 className=' text-center p-10 text-2xl lg:text-4xl font-bold'>About <span className='text-[#6415ff]'>Us</span></h1>
      <div className='lg:py-20 flex lg:flex-row flex-col justify-center'>
        <div className='p-5 flex justify-center'>
        <img src={tarakabataan} alt="team" className='rounded-lg w-[450px]'/>
        </div>
        <div className='lg:w-[50%] md:px-20 px-5'>
          <h1 className='text-xl lg:text-2xl text-[#6415ff] py-5 font-bold'>Vision</h1>
          <p className='leading-8'>TARA Kabataan Organization aims to reach more youth leaders in Zamboanga City and in the Country, creating an ever-greater impact throughout the Country. TARA Kabataan Organization remain committed to working with youths in the implementation of the TARA Kabataan activities, expanding to benefit more youth leaders. TARA Kabataan Organization will continue assessing the partnering with other stakeholders.</p>
        </div>
      </div>
      <div className='px-5 md:px-20 lg:py-20 flex-col-reverse flex lg:flex-row justify-center'>
        <div className='lg:w-[50%] lg:pr-10'>
          <h1 className='text-xl lg:text-2xl text-[#6415ff] py-5 font-bold'>Mission</h1>
          <p className='leading-8'>The TARA Kabataan Organization is a Non-Profit, Non-Stock and Non-Partisan Youth Organization with its mission of empowering the youth, with its purpose to capacitate and provide massive advocacy campaigns on cross-cultural exchange and leadership empowerment to young leaders towards a more engaging and empowering communities.</p>
        </div>
        <div className='p-5 flex justify-center'>
        <img src={mission} alt="team" className='rounded-lg w-[450px]'/>
        </div>
      </div>
      <h1 className='text-center lg:text-4xl md:text-2xl text-xl font-bold mt-10'>Our <span className='text-[#6415ff]'>Team</span></h1>
      <div className='mt-10 px-5 md:px-20 lg:px-20 grid justify-center items-center lg:grid-cols-3 md:grid-cols-2 gap-5'>
        <div className='hover:shadow-xl flex flex-col max-w-[350px]'>
          <img src={img1} alt="team" className='w-full h-[350px]'/>
          <div className='flex w-full flex-col justify-center items-center bg-gray-300'>
            <h1 className='text-xl p-3 font-bold text-[#243e63]'>Mark Kevin Cervas Nugas</h1>
            <p>Founder and Chair</p>
            <div className='flex gap-5 p-3'>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <FaFacebookF/>
              </div>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <RiInstagramFill/>
              </div>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <FaLinkedin/>
              </div>
            </div>
          </div>
        </div>
        <div className='hover:shadow-xl flex flex-col max-w-[350px]'>
          <img src={img2} alt="team" className='w-full h-[350px]'/>
          <div className='flex w-full flex-col justify-center items-center bg-gray-300 '>
            <h1 className='text-xl p-3 font-bold text-[#243e63]'>AILISH O. PALA</h1>
            <p>Director for Administration</p>
            <div className='flex gap-5 p-3'>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <FaFacebookF/>
              </div>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <RiInstagramFill/>
              </div>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <FaLinkedin/>
              </div>
            </div>
          </div>
        </div>
        <div className='hover:shadow-xl flex flex-col max-w-[350px]'>
          <img src={img3} alt="team" className='w-full h-[350px]'/>
          <div className='flex w-full flex-col justify-center items-center bg-gray-300 '>
            <h1 className='text-xl p-3 font-bold text-[#243e63]'>CIELO T. SARATAO</h1>
            <p>Director for Finance</p>
            <div className='flex gap-5 p-3'>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <FaFacebookF/>
              </div>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <RiInstagramFill/>
              </div>
              <div className='bg-white gray-200 rounded-full p-2 text-lg'>
                <FaLinkedin/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About