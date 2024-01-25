import { FaUser } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Cards = ({cards, getNextColor}) => {
    
    Cards.propTypes = {
        cards: PropTypes.array.isRequired,
        getNextColor: PropTypes.func.isRequired
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 '>
    {
        cards.map((name, index) => (
            <div key={index} className='dark:bg-[#9333ea] border-2 h-[150px] rounded-[20px] bg-[#e6e6fa] border-l-[6px] flex items-center cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out '  
            style={{ borderColor: getNextColor() }}
            > 
                <div className='flex'>
                    <div className='ml-5 flex'>
                    <div className='rounded-full h-10 w-10 flex items-center justify-center bg-emerald-200'>
                        <FaUser fontSize={22} color="" />
                    </div>
                    <div>
                        <h2 className='text-[#1f2633fd] text-lg  leading-[22px] px-[10px] font-medium'>{name.name}</h2>
                        <h1 className='text-[30px] leading-[24px] font-bold  px-[10px] mt-[5px]'>{name.count}</h1>
                    </div>
                    </div>
                </div>
            </div>
        ))
    }
</div>
  )
}

export default Cards