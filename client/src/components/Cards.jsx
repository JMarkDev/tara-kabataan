import {
  FaUser,
  FaCalendarAlt,
  FaCalendarCheck,
  FaChartBar,
} from "react-icons/fa";
import PropTypes from "prop-types";

const Cards = ({ cards, getNextColor }) => {
  const icons = [FaCalendarCheck, FaChartBar, FaUser, FaCalendarAlt]; // Store component types

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      {cards[0]?.map((name, index) => {
        const Icon = icons[index % icons.length]; // Get component type dynamically
        return (
          <div
            key={index}
            className="border-2 h-[150px] rounded-[20px] bg-[#e6e6fa] border-l-[6px] flex items-center cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out "
            style={{ borderColor: getNextColor() }}
          >
            <div className="flex">
              <div className="ml-5 flex">
                <div className="rounded-full h-10 w-10 flex items-center justify-center bg-emerald-200">
                  <Icon fontSize={22} color="" /> {/* Render the component */}
                </div>
                <div>
                  <h2 className="text-[#1f2633fd] text-lg  leading-[22px] px-[10px] font-medium">
                    {name.name}
                  </h2>
                  <h1 className="text-[30px] leading-[24px] font-bold  px-[10px] mt-[5px]">
                    {name.count}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Cards.propTypes = {
  cards: PropTypes.array.isRequired,
  getNextColor: PropTypes.func.isRequired,
};

export default Cards;
