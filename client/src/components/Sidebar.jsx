import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { RiDashboardLine } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { FaUserShield } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { FaUsersLine } from "react-icons/fa6";
import logo from '../assets/images/logo.jpg';
import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { useLogout } from '../hooks/useLogout';
import { useResizeLayout } from '../hooks/resizeLayout';

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const handleLogout = useLogout();
  const { isSmallScreen } = useResizeLayout();

  const Menus = [
    { title: 'Dashboard', path: '/dashboard', src: <RiDashboardLine /> },
    { title: 'Event List', path: '/admin-events', src: <BsFillJournalBookmarkFill /> },
    { title: 'Attendees', path: '/admin-attendees', src: <FaUsersLine />},
    { title: 'Users', path: '/admin-users', src: <CgProfile /> },
    { title: 'Admin', path: '/admin', src: <FaUserShield /> },
  ];

  Sidebar.propTypes = {
    open: PropTypes.bool.isRequired,
    setOpen: PropTypes.func.isRequired
  };

  return (
    <>
    <div 
    // className='w-[250px] fixed z-20 h-[100vh] bg-[#40189d] p-2 text-[#f2f2f2] transition-all ease-in-out duration-300'
      className={` w-[${isSmallScreen ? '80px' : open ? '80px' : '250px'}] fixed ${isSmallScreen  && 'hidden'} z-20 h-[100vh] bg-[#40189d] p-2 text-[#f2f2f2] transition-all ease-in-out duration-300`}
    >
      <div className="flex justify-center items-center gap-3">
        <img src={logo} alt="logo" className={`w-[70px] my-2`} />
      </div>
      <ul className={`pt-6 ${open ? 'items-center flex flex-col' : ''}`}>
        {Menus.map((menu, index) => (
          <li key={index}>
            <Link to={menu.path}>
              <div
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-[#607D8B] ${
                  location.pathname === menu.path && 'bg-[#607D8B] '
                }`}
              >
                <span className="text-2xl">{menu.src}</span>
                {!open && !isSmallScreen && (
                  <span className="origin-left duration-300 hover:block">{menu.title}</span>
                )}
              </div>
            </Link>
          </li>
        ))}
        <Link to="/login" onClick={handleLogout}>
          <div className="w-full mt-[250px] flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-[#607D8B]">
            <span className={`${!open && 'block'} text-2xl`}><MdLogout /></span>
            {!open && !isSmallScreen && (
              <span className="origin-left duration-300 hover:block">Logout</span>
            )}
          </div>
        </Link>
      </ul>
    </div>
    
    {isSmallScreen && open &&
      (
        <div className='fixed transition-all ease-in-out duration-300'>
          <div className={`w-[250px] h-[100vh] bg-[#40189d] p-2 text-[#f2f2f2] transition-all ease-in-out duration-300`}>
            <div className="flex justify-center items-center gap-3">
              <img src={logo} alt="logo" className={`w-[70px] my-2`} />
            </div>
            <ul className='pt-6 flex flex-col'>
        {Menus.map((menu, index) => (
          <li key={index}>
            <Link to={menu.path} onClick={() => setOpen(false)}>
              <div
                className={`flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-[#607D8B] ${
                  location.pathname === menu.path && 'bg-[#607D8B] '
                }`}
              >
                <span className="text-2xl">{menu.src}</span>
                  <span className="origin-left duration-300 hover:block">{menu.title}</span>
              </div>
            </Link>
          </li>
        ))}
        <Link to="/login" onClick={handleLogout}>
          <div className="w-full mt-[250px] flex items-center gap-x-6 p-3 text-base font-normal rounded-lg cursor-pointer hover:bg-[#607D8B]">
            <span className='text-2xl'><MdLogout /></span>
              <span className="origin-left duration-300 hover:block">Logout</span>
          </div>
        </Link>
      </ul>
          </div>
        </div>
      )
    }
    </>
  );
};

export default Sidebar;
