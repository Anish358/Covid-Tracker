import React , {useState , useEffect} from 'react'
import {fetchDailyData} from "../../api/index"
import {Line , Bar} from "react-chartjs-2"
import styles from "./Charts.module.css"

const Charts = ({ data: { confirmed, recovered, deaths }, country }) => {

    const [dailyData, setDailyData] = useState({}); 

    // use effect cant be turned into aync function 
    // so we have to create a async function in that and call it right there 
    useEffect(() => {
      // async func to fectch the data and wait 
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        // calling it right here 
        fetchAPI();
        
    }, []);
    

    // line chart 
    const lineChart = (
      // if there is data return the chart else null
        dailyData[0] ? (
          <Line
            data={{
              // mapping over all the dates in the array and simplying returning it
              labels: dailyData.map(({ date }) => date),
              datasets: [{
                // same as above 
                data: dailyData.map((data) => data.confirmed),
                label: 'Infected',
                borderColor: '#3333ff',
                fill: true,
              }, {
                // same as aove
                data: dailyData.map((data) => data.deaths),
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
      const barChart = (
        confirmed ? (
          <Bar
            data={{
              labels: ['Infected', 'Recovered', 'Deaths'],
              datasets: [
                {
                  label: 'People',
                  backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
                  data: [confirmed.value, recovered.value, deaths.value],
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
    return (
        <div className = {styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}

export default Charts
