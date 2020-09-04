import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../API';

import styles from './Chart.module.css';

const Chart = ({data, country}) => {
  const [dailyData, setDailyData] = useState({})

  useEffect(() => { //useEffect can't be made async hence wa have to make another function inside and make it async instead
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData()

      setDailyData(initialDailyData)
    };

    fetchMyAPI()

  }, []) // if array is added then it acts as componentDidMount, or else it will keep calling the API continously making the program slow

  const barChart = (
    data.confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [data.confirmed.value, data.recovered.value, data.deaths.value],
            },
          ],
        }}
        options={{
          legend: { display: false },
          title: { display: true, text: `Current state in ${country}` },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? ( //if first day or no data is available, then null, else follow
      <Line //Linechart imported from react charts
        data={{ // data required in the chart
          // labels =  data on the x-axis
          labels: dailyData.map(( { date } ) => { //destructured date in the argument itself
              return date}), 
          datasets: [{ //the lines or the data to be showed on the graph
            data: dailyData.map(( { confirmed} ) => confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true, //fill all the space bellow the border color
          }, {
            data: dailyData.map(( { deaths } ) => deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country? barChart: lineChart} {/* *if there is a country show a bar chart else a normal chart */}
    </div>
  );
};

export default Chart;