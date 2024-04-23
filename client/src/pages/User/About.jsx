import React, { useState } from "react";
import { Link } from "react-router-dom";
import mission from "../../assets/images/mission.jpg";
import tarakabataan from "../../assets/images/tarakabataan.jpg";
import img1 from "../../assets/images/sir1.jpg";
import img2 from "../../assets/images/AILISH O. PALA.jpg";
import img3 from "../../assets/images/CIELO T. SARATAO.jpg";
import { FaFacebookF } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin } from "react-icons/fa6";
import { motion } from "framer-motion";

const About = () => {
  const [openLink, setOpenLink] = useState(false);
  const [isHover, setIshover] = useState(false);
  return (
    <div>
      <h1 className=" text-center p-10 text-2xl lg:text-4xl font-bold">
        About <span className="text-[#6415ff]">Us</span>
      </h1>
      <div className="lg:py-20 flex lg:flex-row flex-col justify-center">
        <motion.div
          className="p-5 flex justify-center"
          initial={{
            opacity: 0,
            x: -50,
            // x: index % 2 === 0 ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <img src={tarakabataan} alt="team" className="rounded-lg w-[450px]" />
        </motion.div>
        <motion.div
          className="lg:w-[50%] md:px-20 px-5"
          initial={{
            opacity: 0,
            x: 50,
            // x: index % 2 === 0 ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <h1 className="text-xl lg:text-2xl text-[#6415ff] py-5 font-bold">
            Vision
          </h1>
          <p className="leading-8">
            TARA Kabataan Organization aims to reach more youth leaders in
            Zamboanga City and in the Country, creating an ever-greater impact
            throughout the Country. TARA Kabataan Organization remain committed
            to working with youths in the implementation of the TARA Kabataan
            activities, expanding to benefit more youth leaders. TARA Kabataan
            Organization will continue assessing the partnering with other
            stakeholders.
          </p>
        </motion.div>
      </div>
      <div className="px-5 md:px-20 lg:py-20 flex-col-reverse flex lg:flex-row justify-center">
        <motion.div
          className="lg:w-[50%] lg:pr-10"
          initial={{
            opacity: 0,
            x: -50,
            // x: index % 2 === 0 ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <h1 className="text-xl lg:text-2xl text-[#6415ff] py-5 font-bold">
            Mission
          </h1>
          <p className="leading-8">
            The TARA Kabataan Organization is a Non-Profit, Non-Stock and
            Non-Partisan Youth Organization with its mission of empowering the
            youth, with its purpose to capacitate and provide massive advocacy
            campaigns on cross-cultural exchange and leadership empowerment to
            young leaders towards a more engaging and empowering communities.
          </p>
        </motion.div>
        <motion.div
          className="py-5 flex justify-center"
          initial={{
            opacity: 0,
            x: 50,
            // x: index % 2 === 0 ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <img
            src={mission}
            alt="team"
            className="rounded-lg  w-full md:w-[450px]"
          />
        </motion.div>
      </div>
      <h1 className="text-center lg:text-4xl md:text-2xl text-xl font-bold mt-10">
        Our <span className="text-[#6415ff]">Team</span>
      </h1>
      <div className=" mt-10 px-5 md:px-20 lg:px-20 grid justify-center items-center lg:grid-cols-3 md:grid-cols-2 gap-10">
        <motion.div
          className="hover:shadow-xl flex flex-col "
          initial={{
            opacity: 0,
            x: -50,
            // x: index % 2 === 0 ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <img src={img1} alt="team" className="w-full h-[350px]" />
          <div className="flex w-full flex-col justify-center items-center bg-gray-300">
            <h1 className="text-xl p-3 font-bold text-[#243e63]">
              Mark Kevin Cervas Nugas
            </h1>
            <p>Founder and Chair</p>
            <div className="flex gap-5 p-3 relative">
              <div className="bg-white hover:bg-blue-300  gray-200 rounded-full p-2 text-lg ">
                <Link to="https://www.facebook.com/kabataantara/">
                  <FaFacebookF />
                </Link>
              </div>
              <div className="bg-white hover:bg-blue-300  gray-200 rounded-full p-2 texst-lg ">
                <Link to="https://www.instagram.com/krammynugas/">
                  <RiInstagramFill />
                </Link>
              </div>
              {isHover && (
                <div className="absolute bottom-[50px] left-[30px] bg-white p-1 px-2 rounded-full">
                  <p className="text-sm text-red-500">No links available</p>
                </div>
              )}
              <div
                onMouseEnter={() => setIshover(true)}
                onMouseLeave={() => setIshover(false)}
                className="bg-white hover:bg-blue-300 gray-200 rounded-full p-2 text-lg"
              >
                <Link to={""}>
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="hover:shadow-xl flex flex-col"
          initial={{
            opacity: 0,
            x: -50,
            // x: index % 2 === 0 ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <img src={img2} alt="team" className="w-full h-[350px]" />
          <div className="flex w-full flex-col justify-center items-center bg-gray-300 ">
            <h1 className="text-xl p-3 font-bold text-[#243e63]">
              Ailish O. Pala
            </h1>
            <p>Director for Administration</p>
            <div className="flex gap-5 p-3">
              <div className="bg-white hover:bg-blue-300 gray-200 rounded-full p-2 text-lg">
                <Link to={"https://web.facebook.com/ailishaleeza"}>
                  <FaFacebookF />
                </Link>
              </div>
              <div className="bg-white hover:bg-blue-300  gray-200 rounded-full p-2 text-lg">
                <Link to={"https://www.instagram.com/itsailish.b/"}>
                  <RiInstagramFill />
                </Link>
              </div>
              <div className="bg-white hover:bg-blue-300  gray-200 rounded-full p-2 text-lg">
                <Link to={"https://www.linkedin.com/in/ailish-pala-38291725b/"}>
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="hover:shadow-xl flex flex-col relative"
          initial={{
            opacity: 0,
            x: -50,
            // x: index % 2 === 0 ? 50 : -50,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            transition: {
              duration: 1,
            },
          }}
          viewport={{ once: true }}
        >
          <img src={img3} alt="team" className="w-full h-[350px]" />
          <div className="flex w-full flex-col justify-center items-center bg-gray-300 ">
            <h1 className="text-xl p-3 font-bold text-[#243e63]">
              Cielo T. Saratao
            </h1>
            <p>Director for Finance</p>
            <div className="flex gap-5 p-3">
              <div className="bg-white hover:bg-blue-300  gray-200 rounded-full p-2 text-lg">
                <Link to={"https://web.facebook.com/vhong.tonghay"}>
                  {" "}
                  <FaFacebookF />
                </Link>
              </div>
              <div className="bg-white hover:bg-blue-300  gray-200 rounded-full p-2 text-lg">
                <Link to={"https://www.instagram.com/cietagram/"}>
                  <RiInstagramFill />
                </Link>
              </div>
              {openLink && (
                <div className="absolute bottom-[50px] left-[120px] bg-white p-1 px-2 rounded-full">
                  <p className="text-sm text-red-500">No links available</p>
                </div>
              )}
              <div
                onMouseEnter={() => setOpenLink(true)}
                onMouseLeave={() => setOpenLink(false)}
                className="bg-white hover:bg-blue-300 gray-200 rounded-full p-2 text-lg"
              >
                <Link to={""}>
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
