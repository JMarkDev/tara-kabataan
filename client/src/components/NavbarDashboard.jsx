import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes  from 'prop-types';
import { RxHamburgerMenu } from 'react-icons/rx'
import api from '../api/api';
import Cookies from 'js-cookie';
import userIcon from '../assets/images/user.png';
import UserProfile from './UserProfile';
import { useResizeLayout } from '../hooks/resizeLayout';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/admin-events': 'Event List',
  '/admin-users': 'User List',
  '/admin': 'Admin List',
  '/admin-profile': 'Admin Profile',
}

function NavbarDashboard({ setOpen}) {
  const [name, setName] = useState('');
  const [openProfile, setOpenProfile] = useState(false); 
  const userId = Cookies.get('userId');
  const [resize, setResize] = useState(false);
  const { isSmallScreen } = useResizeLayout();


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
    setOpenProfile(!openProfile);
  };

  const hideProfile = () => {
    setOpenProfile(false);
  }

  const handleDropdownClick = (event) => {
    // Prevent closing the dropdown when clicking inside it
    event.stopPropagation();
    setOpenProfile(false)
  };

  return (
    <div className={`h-[70px] bg-[#f2f2f2] z-10 fixed w-full shadow-md`}>
    <div className=" flex justify-between p-4" style={isSmallScreen ? {width: 'full'} : { marginLeft: !resize ? '250px' : '80px' }}>
        <div className="flex items-center text-center">
          <RxHamburgerMenu onClick={handleBurgerClick} className="text-3xl mr-5" />
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        <div className='relative'>
          <div className="flex gap-10">
            <h1 className="text-lg font-semibold text-center m-auto">{name}</h1>
            <img onClick={showProfile}
                onMouseEnter={showProfile}
                className="w-8 h-8 rounded-full object-cover cursor-pointer"
                src={userIcon} 
                alt=""
              />
            {openProfile && (
              <div className="absolute top-[60px] right-0 mr-[-10px]">
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