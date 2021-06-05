import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';
import moment from 'moment';
import { useIsDarkMode } from 'state/user/hooks';

const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export interface LineChartProps {
  backgroundColor?: string;
  isCall?: boolean;
  data?: Array<number>;
  categories?: Array<string>;
  width?: number | string;
  height?: number | string;
  palette?: Object;
  chartType?: string;
  showYAxis?: boolean;
}
const LineChart: React.FC<LineChartProps> = ({
  backgroundColor,
  isCall = false,
  categories = [],
  data = [],
  width = 500,
  height = 200,
  chartType = 'weekly',
  showYAxis = false,
}) => {
  const dark = useIsDarkMode();
  const theme = useTheme();

  let strokeColor = isCall ? '#14A887' : '#BF47C3';
  let gradientColor = isCall ? '#D4F8FB' : '#F8D0E7';

  if (dark) {
    gradientColor = isCall ? '#022628' : '#350E25';
  }

  const options = {
    chart: {
      sparkline: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      width: '100%',
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
      colors: [strokeColor],
    },
    fill: {
      type: 'gradient',
      colors: [gradientColor],
      gradient: {
        gradientToColors: [backgroundColor || theme.palette.background.paper],
        shadeIntensity: 1,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories:
        chartType === 'weekly'
          ? categories.map(
              (label) => weekdays[moment(label, 'YYYY/MM/DD').isoWeekday() - 1],
            )
          : categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: new Array(categories.length).fill(
            dark ? '#646464' : '#CACED3',
          ),
        },
      },
    },
    yaxis: {
      show: showYAxis,
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
      padding: {
        left: 30,
        right: 20,
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    tooltip: {
      enabled: true,
      theme: dark ? 'dark' : 'light',
      marker: {
        show: false,
      },
      fillSeriesColor: false,
      custom: (props: any) => {
        return (
          `<div class="tooltip" style="display: flex; flex-direction: column; box-shadow: none; border-radius: 12px; background: transparent;">` +
          `<span style="padding: 0.5rem; border: 1px solid ${
            dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
          }; border-radius: 12px 12px 0 0; background: ${
            dark ? 'rgba(0, 0, 0, 0.91)' : 'rgba(255, 255, 255, 0.91)'
          }; color: ${dark ? '#646464' : '#8D97A0'};">` +
          moment(categories[props.dataPointIndex], 'YYYY/MM/DD').format(
            'DD MMM, YYYY',
          ) +
          '</span>' +
          `<span style="padding: 0.5rem; border: 1px solid ${
            dark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)'
          }; border-top: none; border-radius: 0 0 12px 12px; background: ${
            dark ? 'rgba(0, 0, 0, 0.91)' : 'rgba(255, 255, 255, 0.91)'
          }; color: ${dark ? '#646464' : '#8D97A0'};">` +
          `Price: <b style="color: ${
            dark ? 'white' : 'rgba(0, 0, 0, 0.91)'
          };">` +
          '$' +
          props.series[props.seriesIndex][props.dataPointIndex] +
          '</b></span>' +
          '</div>'
        );
      },
    },
  };

  const series = [
    {
      name: 'Prices',
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
