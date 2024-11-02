// src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import ChartOne from '../../components/Charts/ChartOne.tsx';
import CardDataStats from '../../components/CardDataStats.tsx';
import { host } from '../../config/constraints';
import { useChart } from '../../context/chartContext.js';
import useColorMode from '../../hooks/useColorMode.tsx';
const ReportPage = () => {
  const [selectSubject, setSelectSubject] = useState('');
  const {data, setData, setOptions } = useChart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [subjects, setSubjects] = useState([
    { value: 'toan', label: 'Toán' },
    { value: 'ngu_van', label: 'Ngữ văn' },
    { value: 'ngoai_ngu', label: 'Ngoại ngữ' },
    { value: 'vat_li', label: 'Vật lý' },
    { value: 'hoa_hoc', label: 'Hóa học' },
    { value: 'sinh_hoc', label: 'Sinh học' },
    { value: 'lich_su', label: 'Lịch sử' },
    { value: 'dia_li', label: 'Địa lý' },
    { value: 'gdcd', label: 'GDCD' },
  ]);
  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch(`${host}students/reports/${selectSubject}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Cant connect to database');
      }

      const fetchedData = await response.json();
      console.log(fetchedData);
      setData({
        series: [
          {
            name: fetchedData.name || 'Default Name', // Use a fallback name
            data: Array.isArray(fetchedData.data) ? fetchedData.data : [], // Ensure it's an array
          },
        ]
      });
    } catch (error) {
      console.error(error);
      setError('Get data failed. Please check your internet and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const {colorMode} = useColorMode(); // Get the color mode

  const option: ApexOptions = {
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Rubik, sans-serif',
      height: 335,
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: false,
      },
      // Add background color depending on color mode
      background: colorMode === 'dark' ? 'bg-boxdark' : 'bg-white',
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: 'straight',
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },

      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: 'category',
      categories: [
        '10 - 8',
        '8 - 6',
        '6 - 4',
        '4 - 0',
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickPlacement: 'between',
      labels: {
        style: {
          colors: colorMode === 'dark' ? '#FFFFFF' : '#000000',
        },
      },

  },    
  yaxis: {
    labels: {
      style: {
        colors: colorMode === 'dark' ? '#FFFFFF' : '#000000',
      },
    },
    min: 0,
    max: 600000,
  },
  };
  const handleSubjectChange = (e) => {
    setSelectSubject(e.target.value);
  };

  const handleFindReport = () => {
    fetchData();
  };
  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    setOptions(option);
    setData({
      series: [
        {
          name: 'Default Name',
          data: [],
        },
      ],
    })
  }, []);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="mt-30 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
            <div className="col-span-12 md:col-span-6 2xl:col-span-4">
              <select
                value={selectSubject}
                onChange={handleSubjectChange}
                className="block w-full py-2 pl-10 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="">Chọn môn học</option>
                {subjects.map((subject) => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-12 md:col-span-6 2xl:col-span-4">
            <button
              onClick={handleFindReport}
              className="block w-1/2 py-1 text-sm text-white dark:text-white bg-blue-500 dark:bg-boxdark hover:bg-blue-700 dark:hover:bg-boxdark-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Find report
            </button>
            </div>
            <div className="col-span-12 md:col-span-6 2xl:col-span-6">
              <ChartOne />
            </div>
            <div className="col-span-12 md:col-span-6 2xl:col-span-6">
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Score</th>
                    <th className="px-4 py-2">Number of Students</th>
                  </tr>
                </thead>
                <tbody>
                  {data.series[0].data.map((score, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2 dark:border-strokedark">{score}</td>
                      <td className="border px-4 py-2 dark:border-strokedark">{score} students</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReportPage;
