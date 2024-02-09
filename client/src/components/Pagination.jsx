import PropTypes from 'prop-types'

const Pagination = ({ currentPage, onPageChange, totalPages}) => {

  const handlePageClick = (newPage) => {
    onPageChange(newPage);
  }


  Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired
  }

  const renderPageNumbers = () => {
    const totalPage = Math.ceil(totalPages / 10);
    const pageNumbers = [];
    for (let i = 1; i <= totalPage; i++) {
      pageNumbers.push(
        <li key={i}>
        <a
          href="#"
          className={`flex items-center justify-center px-3 h-10 rounded-lg leading-tight ${
            i === currentPage ? 'text-white bg-gradient-to-r from-[#f87a58] to-[#f7426f] hover:from-[#f7426f] hover:to-[#f87a58]' : 'hover:text-white hover:bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58]  border border-gray-300'
          }`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </a>
      </li>
      )
    }
    return pageNumbers;
  }
 
  return (
    <div>
<nav aria-label="Page navigation example">
  <ul className="text-md flex space-x-2">
    <li>
      <a href="#" className={`flex items-center justify-center px-3 h-10 ms-0 leading-tight text-white bg-gradient-to-r from-[#f87a58] to-[#f7426f]  hover:from-[#f7426f] hover:to-[#f87a58] border border-e-0 border-gray-300 rounded-s-lg
          ${currentPage === 1 ? 'pointer-events-none' : ''}
        `}
        onClick={() => handlePageClick(currentPage - 1)}
      >Previous</a> 
    </li>
      {renderPageNumbers()}
    <li>
      <a href="#" className={`flex items-center justify-center px-3 h-10 leading-tight text-white bg-gradient-to-r from-[#f87a58] to-[#f7426f]  hover:from-[#f7426f] hover:to-[#f87a58]  border border-gray-300 rounded-e-lg
        ${currentPage === Math.ceil(totalPages / 10) ? 'pointer-events-none': ''}
      `}
        onClick={() => handlePageClick(currentPage + 1)}
      >Next</a>
    </li>
  </ul>
</nav>

    </div>
  )
}

export default Pagination