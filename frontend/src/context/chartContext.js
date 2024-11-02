import React, { createContext, useContext, useState } from 'react';
import { ApexOptions } from 'apexcharts';
const ChartContext = createContext();

export const useChart = () => useContext(ChartContext);

export const ChartProvider = ({ children }) => {
  const [data, setData] = useState({
    series: [
      {
        name: 'Total Scores',
        data: [0],
      },
    ],
  });
  // Define options in ChartProvider
  const [options, setOptions] = useState({
    legend: {
      show: false,
      position: 'top',
      horizontalAlign: 'left',
    },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      fontFamily: 'Satoshi, sans-serif',
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
      toolbar: { show: false },
    },
    responsive: [
      { breakpoint: 1024, options: { chart: { height: 300 } } },
      { breakpoint: 1366, options: { chart: { height: 350 } } },
    ],
    stroke: { width: [2, 2], curve: 'straight' },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: { size: undefined, sizeOffset: 5 },
    },
    xaxis: {
      type: 'category',
      categories: ['<=1', '<=2', '<=3', '<=4', '<=5', '<=6', '<=7', '<=8', '<=9', '<=10'],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { style: { fontSize: '0px' } },
      min: 0,
      max: 3000000,
    },
  });
  return (
    <ChartContext.Provider value={{ data, setData, options, setOptions }}>
      {children}
    </ChartContext.Provider>
  );
};
