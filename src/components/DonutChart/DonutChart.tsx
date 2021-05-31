import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';

export interface DonutChartProps {
  color?: string;
  secondaryColor?: string;
  dark?: boolean;
  data?: Array<number>;
  labels?: Array<string>;
  width?: number;
  height?: number;
}
const DonutChart: React.FC<DonutChartProps> = ({
  data = [],
  labels = [],
  width = 300,
  height = 300,
}) => {
  // const theme = useTheme();

  const options = {
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '90%',
        },
        track: {
          background: 'rgba(31, 162, 109, 0.11773)',
          strokeWidth: '75%',
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },
      },
    },
    labels,
    legend: {
      formatter: (val: any, opts: any) => {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    fill: {
      type: 'gradient',
      colors: ['#1EFF78', '#EB4A97'],
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#1EFF78'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [7.78, 118.78],
      },
    },
  };

  return (
    <Chart
      options={options}
      series={data}
      type='donut'
      width={width}
      height={height}
    />
  );
};

export default DonutChart;
