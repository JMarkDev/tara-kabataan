import { useEffect, useState } from "react";
import logo from "../assets/images/logo.jpg";
import { Link, useLocation } from "react-router-dom";
import HamburgerButton from "./HamburgerMenuButton/HamburgerButton";
import Cookies from "js-cookie";
import api from "../api/api";
import userIcon from "../assets/images/user.png";
import UserProfile from "./UserProfile";
import Notification from "./Notification";
import { IoNotificationsOutline } from "react-icons/io5";

const NavbarUser = () => {
  const location = useLocation();
  const [mobileMenu, setMobileMenu] = useState(false);
  const [userData, setUserData] = useState(false);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [image, setImage] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [allNotification, setAllNotification] = useState(0);
  const [data, setData] = useState([]);

  const userId = Cookies.get("userId");

  useEffect(() => {
    if (userId) {
      setUserData(true);
    }
  }, [userId, image]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`);
          setCreatedAt(response.data.createdAt);
          setName(response.data.firstname);
          setImage(response.data.image);
        } else {
          setUserData(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [userId]);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  const handleMobileLinkClick = () => {
    closeMobileMenu(); // Close the mobile menu when a link is clicked
  };

  const showProfile = () => {
    setOpen(!open);
    setOpenNotification(false);
  };

  const hideProfile = () => {
    setOpen(false);
  };

  const handleDropdownClick = (event) => {
    // Prevent closing the dropdown when clicking inside it
    event.stopPropagation();
    setOpen(false);
  };

  const fetchNotifications = async () => {
    try {
      const response = await api.get(`/notifications/user/all/${userId}`);
      const sortNotification = [...response.data].sort((a, b) => b.id - a.id);
      setData(sortNotification);
      const filterNotification = response.data.filter(
        (notif) => notif.is_read === false
      );
      setAllNotification(filterNotification.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId]);

  const handleCloseNotification = (notification, event_id) => {
    setOpenNotification(notification);
    const handleIsRead = async () => {
      try {
        const response = await api.put(
          `/notifications/update/id/${userId}/event/${event_id}/role/user`
        );
        fetchNotifications();
      } catch (error) {
        console.log(error);
      }
    };

    handleIsRead();
  };

  return (
    <header className="z-20 fixed border-b border-gray-300 w-full h-[70px] m-auto px-5 py-1 bg-[#efeff5] shadow-lg">
      <div className="hidden md:block">
        <div className="flex justify-between items-center">
          <Link to={"/home"}>
            <img src={logo} alt="logo" className="w-auto h-[60px]" />
          </Link>

          <ul className="flex gap-10">
            <li>
              <Link
                to="/home"
                className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                  location.pathname.includes("/home")
                    ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                    : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                  location.pathname.includes("/events")
                    ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                    : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                }`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                  location.pathname.includes("/about")
                    ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                    : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className={`flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                  location.pathname.includes("/contact-us")
                    ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                    : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          {userData ? (
            <div className="relative flex items-center gap-10  h-12">
              <div className="">
                <IoNotificationsOutline
                  onClick={() => {
                    setOpenNotification(!openNotification);
                    setOpen(false);
                  }}
                  onMouseEnter={() => {
                    setOpenNotification(!openNotification);
                    setOpen(false);
                  }}
                  className="text-2xl cursor-pointer w-10 h-10 p-2 bg-white rounded-full hover:bg-gray-200"
                />
                {allNotification === 0 ? null : (
                  <span className="absolute ml-6 text-[14px] top-0 bg-[#E72929] text-white px-2 min:w-5 h-5 text-center font-semibold rounded-full">
                    {allNotification}
                  </span>
                )}
              </div>

              {openNotification && (
                <Notification
                  data={data}
                  handleCloseNotification={handleCloseNotification}
                />
              )}

              <h1 className="text-lg font-semibold text-center m-auto">
                {name}
              </h1>
              <img
                onClick={showProfile}
                onMouseEnter={showProfile}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                src={`${image ? `${api.defaults.baseURL}${image}` : userIcon}`}
                alt=""
              />
              {open && (
                <>
                  <UserProfile
                    handleDropdownClick={handleDropdownClick}
                    hideProfile={hideProfile}
                    userId={userId}
                    // handleLogout={useLogout}
                  />
                </>
              )}
            </div>
          ) : (
            <div className="flex gap-10">
              <Link
                to="/login"
                className={` flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]  ${
                  location.pathname.includes("/login")
                    ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                    : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="flex items-center text-base font-semibold cursor-pointer bg-[#6415ff] text-white px-8 py-2 rounded-full"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden flex w-full justify-between items-center">
        <img src={logo} alt="logo" className="w-auto h-[60px]" />
        <div className="flex items-center">
          {userData && (
            <div className="flex gap-5 flex-row items-center">
              <div>
                <IoNotificationsOutline
                  onClick={() => {
                    setOpenNotification(!openNotification);
                    setOpen(false);
                  }}
                  onMouseEnter={() => {
                    setOpenNotification(!openNotification);
                    setOpen(false);
                  }}
                  className="text-2xl cursor-pointer w-10 h-10 p-2 bg-white rounded-full hover:bg-gray-200"
                />
                {allNotification === 0 ? null : (
                  <span className="absolute ml-6 text-[14px] top-2 bg-[#E72929] text-white px-2 min-w-5 h-5 text-center font-semibold rounded-full">
                    {allNotification}
                  </span>
                )}
              </div>

              {openNotification && (
                <Notification
                  data={data}
                  handleCloseNotification={handleCloseNotification}
                />
              )}
              <img
                onClick={showProfile}
                onMouseEnter={showProfile}
                className="w-8 mr-[50px] h-8 rounded-full object-cover cursor-pointer"
                src={`${image ? `${api.defaults.baseURL}${image}` : userIcon}`}
                alt=""
              />
            </div>
          )}
          {open && (
            <>
              <UserProfile
                handleDropdownClick={handleDropdownClick}
                hideProfile={hideProfile}
                userId={userId}
              />
            </>
          )}
          {!userId && (
            <div>
              <ul className="flex">
                <li>
                  <Link
                    onClick={handleMobileLinkClick}
                    to="/login"
                    className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
                  >
                    <span
                      className={`
                 ${
                   location.pathname.includes("/login")
                     ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                     : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                 }
               `}
                    >
                      Login
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleMobileLinkClick}
                    to="/register"
                    className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff] mr-10`}
                  >
                    <span
                      className={`
                 ${
                   location.pathname.includes("/register")
                     ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                     : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                 }
               `}
                    >
                      Register
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <HamburgerButton
            setMobileMenu={setMobileMenu}
            mobileMenu={mobileMenu}
          />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="">
          <div
            className={`${
              mobileMenu ? "flex" : "hidden"
            } w-[90%] text-center absolute z-50 flex-col self-end py-8 mt-10 bg-gray-50 dark:bg-slate-800 drop-shadow rounded-xl`}
          >
            <ul className="px-5">
              <li>
                <Link
                  onClick={handleMobileLinkClick}
                  to="/home"
                  className={`flex p-2 items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
                >
                  <span
                    className={`
                    ${
                      location.pathname.includes("/home")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                  >
                    Home
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  onClick={handleMobileLinkClick}
                  to="/events"
                  className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
                >
                  <span
                    className={`
                    ${
                      location.pathname.includes("/events")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                  >
                    Events
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleMobileLinkClick}
                  to="/about"
                  className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
                >
                  <span
                    className={`
                    ${
                      location.pathname.includes("/about")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                  >
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={handleMobileLinkClick}
                  to="/contact-us"
                  className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
                >
                  <span
                    className={`
                    ${
                      location.pathname.includes("/contact-us")
                        ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                        : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                    }
                  `}
                  >
                    Contact Us
                  </span>
                </Link>
              </li>
              {!userData && (
                <>
                  <li>
                    <Link
                      onClick={handleMobileLinkClick}
                      to="/login"
                      className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
                    >
                      <span
                        className={`
                        ${
                          location.pathname.includes("/login")
                            ? "border-b-2 border-[#6415ff] text-[#6414ff]"
                            : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300"
                        }
                      `}
                      >
                        Login
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={handleMobileLinkClick}
                      to="/register"
                      className={`p-2 flex items-center text-base font-semibold cursor-pointer text-[#333333] hover:text-[#6415ff]`}
                    >
                      <span
                        className={`
                        ${
                          location.pathname.includes("/register")
                            ? "border-b-2 border-[#6415ff] "
                            : "border-b-2 border-transparent hover:border-b-2 hover:border-[#6415ff] transition ease-in-out duration-300 bg-[#6415ff] text-white px-8 py-2 rounded-full "
                        }
                      `}
                      >
                        Register
                      </span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default NavbarUser;
