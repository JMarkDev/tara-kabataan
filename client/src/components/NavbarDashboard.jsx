import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { RxHamburgerMenu } from "react-icons/rx";
import api from "../api/api";
import Cookies from "js-cookie";
import userIcon from "../assets/images/user.png";
import UserProfile from "./UserProfile";
import { useResizeLayout } from "../hooks/resizeLayout";
import { IoNotificationsOutline } from "react-icons/io5";
import Notification from "./Notification";

function NavbarDashboard({ setOpen }) {
  const [openNotification, setOpenNotification] = useState(false);
  const [name, setName] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const userId = Cookies.get("userId");
  const [resize, setResize] = useState(false);
  const { isSmallScreen } = useResizeLayout();
  const { id } = useParams();

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/admin-events": "Event List",
    [`/edit-admin/${id}`]: "Edit Admin",
    "/admin-users": "User List",
    "/admin-category": "Category List",
    "/archives": "Archive List",
    "/admin": "Admin List",
    "/admin-profile": "Admin Profile",
    "/add-event": "Add Event",
    [`/edit-event/${id}`]: "Edit Event",
    [`/view-event/${id}`]: "View Event",
  };

  const location = useLocation();
  const title = pageTitles[location.pathname];

  const handleBurgerClick = () => {
    setOpen((prevOpen) => !prevOpen);
    setResize(!resize);
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userId) {
          const response = await api.get(`/user/id/${userId}`);
          setName(response.data.firstname);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, [userId]);

  const showProfile = () => {
    setOpenNotification(false);
    setOpenProfile(!openProfile);
  };

  const hideProfile = () => {
    setOpenProfile(false);
  };

  const handleDropdownClick = (event) => {
    // Prevent closing the dropdown when clicking inside it
    event.stopPropagation();
    setOpenProfile(false);
  };

  return (
    <div className={`h-[70px] bg-[#f2f2f2] z-10 fixed w-full shadow-md`}>
      <div
        className=" flex justify-between p-4"
        style={
          isSmallScreen
            ? { width: "full" }
            : { marginLeft: !resize ? "250px" : "80px" }
        }
      >
        <div className="flex items-center text-center">
          <RxHamburgerMenu
            onClick={handleBurgerClick}
            className="text-3xl mr-5"
          />
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className="relative">
          <div className="flex items-center gap-5">
            <IoNotificationsOutline
              onClick={() => {
                setOpenNotification(!openNotification);
                setOpenProfile(false);
              }}
              onMouseEnter={() => {
                setOpenNotification(!openNotification);
                setOpenProfile(false);
              }}
              className="text-2xl cursor-pointer w-10 h-10 p-2 bg-white rounded-full hover:bg-gray-200"
            />
            {openNotification && <Notification />}

            <div>
              <h1 className="text-lg font-semibold leading-6 text-center">
                {name}
              </h1>
              <span className="text-sm leading-5 flex justify-end">Admin</span>
            </div>
            <img
              onClick={showProfile}
              onMouseEnter={showProfile}
              className="w-8 h-8 rounded-full object-cover cursor-pointer"
              src={userIcon}
              alt=""
            />
            {openProfile && (
              <div className="absolute top-10 right-0 mr-[-10px]">
                <UserProfile
                  handleDropdownClick={handleDropdownClick}
                  hideProfile={hideProfile}
                  userId={userId}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

NavbarDashboard.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default NavbarDashboard;
