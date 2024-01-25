import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import PieChartComponent from '../../../components/PieChart';
import Cards from '../../../components/Cards';

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
  ];

  const getGraphColor = () => getNextColor();

  return (
    <div>
      <div>
        <Cards cards={cards} getNextColor={getNextColor} />
            <div className=' flex lg:flex-row flex-col md:flex-col md:gap-6 mt-[16px] w-full'>
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
                        </ResponsiveContainer >
                    </div>
                </div>
                <div> 
                  <PieChartComponent />
                </div>
                </div>
        </div>
    </div>
  )
}

export default Dashboard