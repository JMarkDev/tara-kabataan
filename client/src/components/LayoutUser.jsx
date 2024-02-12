import NavbarUser from './NavbarUser'
import PropTypes from 'prop-types'

const LayoutUser = ({ children }) => {
    

    return (
        <>
            <div className='w-auto flex flex-auto h-full bg-[#efeff5]'>
                <div className='grow'>
                    <NavbarUser />
                    <div className=''>{children}</div>
                </div>
            </div>
        </>
    )
}

LayoutUser.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutUser
