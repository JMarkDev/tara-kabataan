import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
// import PieChartComponent from '../../../components/PieChart';
// import Cards from '../../../components/Cards';
import useColorGenerator from '../hooks/useColorGenerator';

const BarGraph = () => {
  const { getNextColors, usedColors } = useColorGenerator();

  const COLORS = [
    '#e88245', 
    '#8daa3b', 
    '#1f82c1', 
    '#9333ea', 
    '#ff5733', 
    '#6c5b7b', 
    // '#ffcc29', 
    '#00a8cc'];


  const getNextColor = () => {
    const color = COLORS.shift();
    COLORS.push(color);
    return color;
  };

  const data = [
    { month: 'Jan', event1: 30, event2: 45, event3: 100, event4: 10 },
    { month: 'Feb', event1: 40, event2: 55, event3: 40 , event4: 20},
    { month: 'Mar', event1: 25, event2: 30, event3: 50 , event4: 30},
    { month: 'Apr', event1: 30, event2: 45, event3: 50 , event4: 40},
    { month: 'May', event1: 40, event2: 55, event3: 40 , event4: 50},
    { month: 'Jun', event1: 25, event2: 30, event3: 50 , event4: 60},
    { month: 'Jul', event1: 30, event2: 45, event3: 50 , event4: 70},
    { month: 'Aug', event1: 40, event2: 55, event3: 40 , event4: 80},
    { month: 'Sep', event1: 25, event2: 30, event3: 50 , event4: 90},
    { month: 'Oct', event1: 30, event2: 45, event3: 50 , event4: 100},
    { month: 'Nov', event1: 40, event2: 55, event3: 40 , event4: 110},
    { month: 'Dec', event1: 25, event2: 30, event3: 50 , event4: 120},
  ];

  // const getGraphColor = () => getNextColor();

  return (
    <div className='w-full'>
      <div>
            <div className=' flex lg:flex-row flex-col md:flex-col md:gap-6 mt-[16px] w-full'>
            <div className=' basis-[100%] rounded dark:border-white bg-white shadow-md cursor-pointer  mb-4 md:mb-0 lg:mb-0 lg:mr-4'>
                    <div className='bg-gray-500 flex items-center justify-between py-[15px] px-[20px] border-b-4 mb-[20px]'>
                        <h2 className='text-white text-[16px] leading-[19px] font-bold '>Events Chart</h2>
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
                            <YAxis domain={[0, 'dataMax']} />
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
                                    stroke={usedColors[index] || getNextColors()}
                                    activeDot={{ r: 8 }}
                                  />
                                ))}
                        </LineChart>
                        </ResponsiveContainer >
                    </div>
                </div>
                </div>
        </div>
    </div>
  )
}

export default BarGraph