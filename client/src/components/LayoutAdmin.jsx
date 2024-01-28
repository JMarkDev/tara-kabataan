import { useState } from 'react';
import PropTypes from 'prop-types';
import NavbarDashboard from './NavbarDashboard';
import Sidebar from './Sidebar';
import { useResizeLayout } from '../hooks/resizeLayout';

const LayoutAdmin = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { isSmallScreen } = useResizeLayout();

  const handleOverlayClick = () => {
    if (isSmallScreen && open) {
      setOpen(false);
    }
  };

  return (
    <>
      <div className='transition-all ease-in-out duration-300 flex flex-auto h-full w-auto'>
        <div className='z-30'>
          <Sidebar open={open} setOpen={setOpen} />
        </div>
        {isSmallScreen && open && (
          <div
            className='fixed top-0 left-0 w-full h-full bg-black opacity-50 z-20'
            onClick={handleOverlayClick}
          />
        )}
        <div className='bg-[#f2f2f2] w-full transition-all ease-in-out duration-300 relative'>
          <NavbarDashboard setOpen={setOpen} open={open} />
          <div
            className="transition-all ease-in-out duration-300 flex justify-between p-4"
            style={isSmallScreen ? { width: 'full' } : { marginLeft: open ? '50px' : '250px' }}
          >
            <div className={`w-full p-4 pt-[90px] ${open && !isSmallScreen && 'px-10'}`}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

LayoutAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutAdmin;
