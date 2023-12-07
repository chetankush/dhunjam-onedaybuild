import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import './Graph.css'
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement
);

const Graph = ({ category6, category7, category8, category9, category10 }) => {
  // Data for the graph
  const data = {
    labels: ['Custom', 'Category 7', 'Category 8', 'Category 9', 'Category 10'],
    datasets: [{
      label: '# of Votes',
      data: [category6, category7, category8, category9, category10],
      backgroundColor: 'rgba(240, 195, 241, 1)',
      borderColor: 'rgba(240, 195, 241, 1)',
      borderWidth: 1,
      barThickness: 20,
      borderRadius: 5,
    }]
  };
  // Styling options for the graph
  const options = {
    maintainAspectRatio: false,
    scales: {

      x: {
        beginAtZero: true,
        ticks: {
          color: 'white',
          fontSize: 16, // Set font size for X-axis labels
        },
        grid: {
          display: false,
        },
        categorySpacing: 0.5,
        axis: 'y',
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white',
        },
        grid: {
          display: false,
        },
        position: 'left',
        axis: 'x',
      },
    },
    plugins: {
      legend: {
        labels: {
          fontSize: 16,
        },
      },
    },
    elements: {
      line: {
        borderColor: 'rgba(255, 255, 255, 1)', // Color of the axis lines
        borderWidth: 2, // Width of the axis lines
      },
      point: {
        radius: 0, // Set point radius to 0 to hide points
      },
    },
  };



  return (

    <div className="graphmain" style={{ width: '100%' }}>
      <CurrencyRupeeIcon />
      <div>
        <Bar
          data={data}
          height={300}
          width={440}
          className='chart'
          options={options}
        />
      </div>
    </div>
  );
};

export default Graph;
