import { FaUser } from 'react-icons/fa'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const Dashboard = () => {

  const COLORS = [
    '#e88245', 
    '#8daa3b', 
    '#1f82c1', 
    '#9333ea', 
    '#ff5733', 
    '#6c5b7b', 
    // '#ffcc29', 
    '#00a8cc'];

  const cards = [
    { name: 'Total Events', count: 100 },
    { name: 'Total Revenue', count: 100 },
    { name: 'Total Attendees', count: 100 },
    { name: 'Upcoming Events', count: 100 },
  ]

  const getNextColor = () => {
    const color = COLORS.shift();
    COLORS.push(color);
    return color;
  };

  // Sample static data for the line chart
  const data = [
    { month: 'Jan', event1: 30, event2: 45, event3: 50 },
    { month: 'Feb', event1: 40, event2: 55, event3: 40 },
    { month: 'Mar', event1: 25, event2: 30, event3: 50 },
    { month: 'Jan', event1: 30, event2: 45, event3: 50 },
    { month: 'Feb', event1: 40, event2: 55, event3: 40 },
    { month: 'Mar', event1: 25, event2: 30, event3: 50 },
    { month: 'Jan', event1: 30, event2: 45, event3: 50 },
    { month: 'Feb', event1: 40, event2: 55, event3: 40 },
    { month: 'Mar', event1: 25, event2: 30, event3: 50 },
    { month: 'Jan', event1: 30, event2: 45, event3: 50 },
    { month: 'Feb', event1: 40, event2: 55, event3: 40 },
    // Add more data for other months
  ];

  const getGraphColor = () => getNextColor();

  return (
    <div>
      <div>
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
                                    <h2 className='text-[#1f2633fd] text-xl leading-[22px] px-[10px] font-bold'>{name.name}</h2>
                                    <h1 className='text-[30px] leading-[24px] font-bold  px-[10px] mt-[5px]'>{name.count}</h1>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='flex flex-col md:flex-row md:gap-6 mt-[16px] w-full'>
            <div className='basis-[60%] rounded dark:border-white bg-white shadow-md cursor-pointer  mb-4 md:mb-0 lg:mb-0 lg:mr-4'>
                    <div className='bg-gray-500 flex items-center justify-between py-[15px] px-[20px] border-b-4 mb-[20px]'>
                        <h2 className='text-[#020617]  dark:text-white text-[16px] leading-[19px] font-bold '>Events Chart</h2>
                        {/* <YearDropdown 
                            selectedYear={selectedYear} 
                            onYearSelect={handleYearChange} 
                        /> */}
                    </div>

                    <div className="lineChart">
                        <ResponsiveContainer width="100%" height={320}>
                        <LineChart
                            data={data}
                            margin={{
                                top: 5,
                                right: 5,
                                left: 10,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="6 6"/>
                            <XAxis dataKey="month" />
                            <YAxis domain={[0, 'dataMax + 1']} />
                            {/*
                            <YAxis domain={[0, 500]} /> 
                            
                            <YAxis domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]} />
                            */}
                            <Tooltip />
                            <Legend />
                            {data && data.length > 0 && Object.keys(data[0])
                                .filter((key) => key !== 'month')
                                .map((key, index) => (
                                  <Line
                                    key={index}
                                    type="monotone"
                                    dataKey={key}
                                    stroke={getGraphColor()}
                                    activeDot={{ r: 8 }}
                                  />
                                ))}
                        </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>
                </div>
        </div>
    </div>
  )
}

export default Dashboard