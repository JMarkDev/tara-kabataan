import EventsTable from "../../../components/EventsTable"
import Pagination from "../../../components/Pagination"

const Events = () => {
  return (
    <div className="flex flex-col h-screen">
      <button
        type="submit"
        className="mb-5 w-[150px] rounded-md bg-gradient-to-r from-[#f87a58] via-[#f7426f] to-[#f87a58] px-5 py-2 text-md font-normal text-white hover:from-[#f7426f] hover:to-[#f7426f] hover:via-[#f87a58] "
      >
        Create Event
      </button>
      <div className="flex-1">
        <EventsTable />
      </div>
      <div className="mt-auto m-10 absolute right-0 bottom-0">
        <Pagination />
      </div>
    </div>
  );
};

export default Events;
