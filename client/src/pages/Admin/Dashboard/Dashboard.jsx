import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PieChartComponent from "../../../components/PieChart";
import Cards from "../../../components/Cards";
import useColorGenerator from "../../../hooks/useColorGenerator";
import EventCalendar from "../../../components/EventCalendar";
import api from "../../../api/api";
import { useEffect, useState } from "react";
import YearDropdown from "../../../components/YearDropdown";

const Dashboard = () => {
  const [genderData, setGenderData] = useState([]);
  const { getNextColors, usedColors } = useColorGenerator();
  const [total, setTotal] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const response = await api.get("/analytics/total");
        setTotal(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTotals();
  }, []);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await api.get(`/analytics/events/${year}`);
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMonthlyData();
  }, [year]);

  useEffect(() => {
    const fetchGender = async () => {
      try {
        const response = await api.get("/analytics/gender");
        setGenderData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchGender();
  }, []);

  const COLORS = [
    "#e88245",
    "#8daa3b",
    "#1f82c1",
    // "#9333ea",
    "#ff5733",
    "#6c5b7b",
    // '#ffcc29',
    "#00a8cc",
  ];

  const getNextColor = () => {
    const color = COLORS.shift();
    COLORS.push(color);
    return color;
  };

  const handleYearChange = (year) => {
    setYear(year);
  };
  // const getGraphColor = () => getNextColor();

  return (
    <div className="w-full">
      <div>
        <Cards cards={total} getNextColor={getNextColor} />
        <div className=" flex lg:flex-row flex-col md:flex-col md:gap-6 mt-10 w-full">
          <div className=" basis-[70%] rounded dark:border-white bg-white shadow-md cursor-pointer  mb-4 md:mb-0 lg:mb-0 lg:mr-4">
            <div className="bg-gray-500 flex items-center justify-between py-[15px] px-[20px] border-b-4 mb-[20px]">
              <h2 className="text-white text-[16px] leading-[19px] font-bold ">
                Events Chart
              </h2>
              <YearDropdown
                selectedYear={year}
                onYearSelect={handleYearChange}
              />
            </div>

            <div className="lineChart">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 10,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="6 6" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, "dataMax"]} />
                  {/*
                            <YAxis domain={[0, 500]} /> 
                            
                            <YAxis domain={[0, 500]} ticks={[0, 100, 200, 300, 400, 500]} />
                            */}
                  <Tooltip />
                  <Legend />
                  {data &&
                    data.length > 0 &&
                    Object.keys(data[0])
                      .filter((key) => key !== "month")
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
              </ResponsiveContainer>
            </div>
          </div>
          <div>
            <PieChartComponent sampleData={genderData} />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <EventCalendar />
      </div>
    </div>
  );
};

export default Dashboard;
