import React from 'react';
import Chart from 'react-apexcharts';

export interface LineChartProps {
  color?: string;
  dark?: boolean;
  data?: Array<number>;
  categories?: Array<string>;
  width?: number;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  color = '#14A887',
  dark = true,
  categories = [],
  data = [],
  width = 500,
  height = 200,
}) => {
  const options = {
    chart: {
      sparkline: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: [color],
    },
    fill: {
      type: 'gradient',
      colors: [color],
      gradient: {
        shade: dark ? 'dark': 'light',
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 70, 100],
      },
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      show: false,
      showForNullSeries: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      crosshairs: {
        show: false,
      },
    },
    grid: {
      show: false,
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      enabled: false
    }
  };

  const series = [
    {
      name: 'Series',
      data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type='area'
      width={width}
      height={height}
    />
  );
};

export default LineChart;
