import React from 'react';
import Chart from 'react-apexcharts';
import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  chartBox: {
    '& .apexcharts-graphical': {
      transform: 'translate(16px, 0) !important',
      marginRight: '-50px !important',
    },
    '& .apexcharts-legend': {
      width: 130,
      padding: 0,
      right: '30px !important',
      top: '50% !important',
      transform: 'translateY(-50%)',
      bottom: 'unset !important',
      '& .apexcharts-legend-marker': {
        borderRadius: '3px !important',
        marginRight: 8,
      },
      '& .apexcharts-legend-series': {
        width: '100%',
        margin: '4px 0 !important',
        display: 'flex',
        alignItems: 'center',
        '& .apexcharts-legend-text': {
          flex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          '& span:first-child': {
            marginRight: 12
          }
        }
      }
    }
  },
  chartInside: {
    width: 140,
    height: 140,
    borderRadius: 70,
    filter: 'drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.0406947))',
    border: `1px solid ${palette.divider}`,
    position: 'absolute',
    top: '50%',
    left: 38,
    transform: 'translateY(-50%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export interface DonutChartProps {
  color?: string;
  secondaryColor?: string;
  dark?: boolean;
  data?: Array<number>;
  labels?: Array<string>;
  colors?: Array<string>;
  width?: number;
  height?: number;
  children?: any;
}
const DonutChart: React.FC<DonutChartProps> = ({
  data = [],
  labels = [],
  width = 360,
  height = 300,
  colors = [],
  children
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const options = {
    plotOptions: {
      pie: {
        size: 200,
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
      fontSize: '14px',
      fontFamily: 'DM Sans',
      labels: {
        colors: [theme.palette.text.primary]
      },
      formatter: (val: any, opts: any) => {
        return `<span>${val}</span><span style="color:${theme.palette.text.secondary}">${opts.w.globals.series[opts.seriesIndex] + '%'}</span>`;
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
      colors: [theme.palette.background.paper]
    },
    fill: {
      type: 'gradient',
      colors: colors,
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
    <Box className={classes.chartBox}>
      <Chart
        options={options}
        series={data}
        type='donut'
        width={width}
        height={height}
      />
      <Box className={classes.chartInside}>
        { children }
      </Box>
    </Box>
  );
};

export default DonutChart;
