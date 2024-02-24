import React, { useState } from 'react'
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock'


const Chart = ({data}) => {



   
const options = {
    title: {
      text: 'Weekly additions/deletions activity'
    },
      yAxis: {
        title: {
          text: 'Changes' // Set y-axis title
        },
      },
    series: [{
      data: data
    }]
  }

    return(
        <HighchartsReact
        highcharts={Highcharts}
        constructorType={'chart'}
        options={options}
      />
    )
}
export default Chart;