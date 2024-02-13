import { Link } from 'react-router-dom'
import Proptypes from 'prop-types'
import Cookies from 'js-cookie';
import { useLogout } from '../hooks/useLogout';
import { FaRegUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

const UserProfile = ({ handleDropdownClick, hideProfile }) => {
    const role = Cookies.get('role'); 
    const handleLogout = useLogout(); 
 
    UserProfile.propTypes = {
        handleDropdownClick: Proptypes.func.isRequired,
        hideProfile: Proptypes.func.isRequired,
        userId: Proptypes.string.isRequired,
    }
    
  return (
    <div 
    onClick={handleDropdownClick}
    onMouseLeave={hideProfile}
    className={`${role === 'user' && 'top-20'} bg-white dark:bg-[#075985] rounded-lg border h-[120px] w-[150px] absolute z-20 right-2 pt-[15px] space-y-[10px] `}>
    <ul className="w-full">
      <li>
        <Link
        to={`${role === 'user' ? '/profile' : '/admin-profile'}`}
        className=" gap-2 flex pl-3 items-center p-2  font-semibold cursor-pointer hover-bg-sky-100 dark:hover-bg-gray-200
        hover:bg-gray-200 border-b-2 border-transparent dark:hover:bg-gray-20 "
      >
        <FaRegUser className='text-blue-600'/>
          Profile
      </Link>
      </li>
      <li>
        <div>
        <button
        onClick={handleLogout}
        className="w-full flex items-center gap-2 pl-3 text-left p-2 font-semibold cursor-pointer hover-bg-sky-100 dark:hover-bg-gray-200
        hover:bg-gray-200 border-b-2 border-transparent dark:hover:bg-gray-20 "
      > 
        <MdLogout className='text-red-600'/>
        Log out
      </button>
        </div>
      </li>
    </ul>  
    </div>
  )
}

export default UserProfile