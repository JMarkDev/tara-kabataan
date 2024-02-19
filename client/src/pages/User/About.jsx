import React from 'react'
import teamImg from '../../assets/images/403980423_1677437305995152_977287819037658799_n.jpg'
import mission from '../../assets/images/mission.jpg'
import tarakabataan from '../../assets/images/tarakabataan.jpg'

const About = () => {
  return (
    <div>
      <h1 className=' text-center p-10 text-2xl lg:text-4xl font-bold'>About <span className='text-[#6415ff]'>Us</span></h1>
      <div className='p-10 ;g:py-20 flex lg:flex-row flex-col justify-center'>
        <div className='p-5 flex justify-center'>
        <img src={tarakabataan} alt="team" className='rounded-lg w-[450px]'/>
        </div>
        <div className='lg:w-[50%] lg:px-10'>
          <h1 className='text-xl lg:text-2xl text-[#6415ff] py-5 font-bold'>Vision</h1>
          <p className='leading-8'>TARA Kabataan Organization aims to reach more youth leaders in Zamboanga City and in the Country, creating an ever-greater impact throughout the Country. TARA Kabataan Organization remain committed to working with youths in the implementation of the TARA Kabataan activities, expanding to benefit more youth leaders. TARA Kabataan Organization will continue assessing the partnering with other stakeholders.</p>
        </div>
      </div>
      <div className='p-10 lg:py-20 flex lg:flex-row flex-col justify-center'>
        <div className='lg:w-[50%] lg:pr-10'>
          <h1 className='text-xl lg:text-2xl text-[#6415ff] py-5 font-bold'>Mission</h1>
          <p className='leading-8'>The TARA Kabataan Organization is a Non-Profit, Non-Stock and Non-Partisan Youth Organization with its mission of empowering the youth, with its purpose to capacitate and provide massive advocacy campaigns on cross-cultural exchange and leadership empowerment to young leaders towards a more engaging and empowering communities.</p>
        </div>
        <div className='p-5 flex justify-center'>
        <img src={mission} alt="team" className='rounded-lg w-[450px]'/>
        </div>
      </div>
      <h1 className='text-center lg:text-4xl font-bold '>Our <span className='text-[#6415ff]'>Team</span></h1>
    </div>
  )
}

export default About