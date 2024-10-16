import React from 'react';
import * as Highcharts from 'highcharts';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import HC_exportData from 'highcharts/modules/export-data';
import HighchartsReact from 'highcharts-react-official';

// Initialize Highcharts modules
HC_more(Highcharts);
HC_exporting(Highcharts);
HC_exportData(Highcharts);

const BcgMatrixComponent = () => {
  const chartOptions = {
    chart: {
      type: 'scatter',
    },
    title: {
      text: 'BCG Matrix',
    },
    xAxis: {
      title: {
        text: 'Market Growth Rate',
      },
      gridLineWidth: 0,
    },
    yAxis: {
      title: {
        text: 'Relative Market Share',
      },
      gridLineWidth: 0,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      scatter: {
        marker: {
          radius: 6,
          states: {
            hover: {
              enabled: true,
              lineColor: 'rgb(100,100,100)',
            },
          },
        },
        states: {
          hover: {
            marker: {
              enabled: false,
            },
          },
        },
      },
    },
    series: [
      {
        name: 'Quadrant 1',
        color: 'rgba(223, 83, 83, .5)',
        data: [[3, 3], [4, 4], [5, 5]],
      },
      {
        name: 'Quadrant 2',
        color: 'rgba(119, 152, 191, .5)',
        data: [[-3, 3], [-4, 4], [-5, 5]],
      },
      {
        name: 'Quadrant 3',
        color: 'rgba(119, 152, 191, .5)',
        data: [[-3, -3], [-4, -4], [-5, -5]],
      },
      {
        name: 'Quadrant 4',
        color: 'rgba(223, 83, 83, .5)',
        data: [[3, -3], [4, -4], [5, -5]],
      },
    ],
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default BcgMatrixComponent;
