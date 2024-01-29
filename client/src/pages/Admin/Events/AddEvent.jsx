
const AddEvent = () => {
  return (
    <div>
      <h1 className="text-xl font-semibold px-5">Event Information</h1>
      
      <div>
        <form>
          <div className="flex flex-wrap">
            <div className="w-full flex flex-col px-5 py-5">
              <label htmlFor="event_title">
                Event Title
              </label>
              <input type="text" className="pl-3 outline-none border-gray-200 border py-2 rounded-md"/>
            </div>
            <div className="flex flex-col px-5 py-5">
              <label htmlFor="event_organizer">
                Event Organizer
              </label>
              <input type="text" className="pl-3 outline-none border-gray-200 border py-2 rounded-md"/>
            </div>
            <div className="w-full flex flex-col px-5 py-5">
              <label htmlFor="event_title">
                Event Title
              </label>
              <input type="text" className="pl-3 outline-none border-gray-200 border py-2 rounded-md"/>
            </div>
            <div className="flex flex-col px-5 py-5">
              <label htmlFor="event_organizer">
                Event Organizer
              </label>
              <input type="text" className="pl-3 outline-none border-gray-200 border py-2 rounded-md"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEvent