import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Chart from 'react-apexcharts';

const useStyles = makeStyles((theme: Theme) => ({
  chart: {
    background: 'transparent',
    width: 'fit-content',

    '& circle': {
      strokeWidth: 1,
      stroke: theme.palette.divider,
    },
  },
  formatter: {
    color: theme.palette.secondary.main,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 14,
    lineHeight: '18px',

    '& svg': {
      maxWidth: 33,
      marginBottom: 3,

      '& path': {
        fill: theme.palette.secondary.main,
      },
    },

    '& h5': {
      fontWeight: 'bold',
      fontSize: 18,
      lineHeight: '18px',
    },
  },
}));

export interface RadialChartProps {
  color?: string;
  secondaryColor?: string;
  dark?: boolean;
  data?: Array<number>;
  width?: number;
  children?: any;
}

const RadialChart: React.FC<RadialChartProps> = ({
  color = '#1EFF78',
  secondaryColor = '#5294FF',
  dark = true,
  data = [],
  width = 300,
  children,
}) => {
  const classes = useStyles();
  const options = {
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          size: '75%',
          background: 'transparent',

          dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 25,
            opacity: 0.25,
          },
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
        dataLabels: {
          show: false,
        },
      },
    },
    fill: {
      type: 'gradient',
      colors: [color],
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [secondaryColor],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [7.78, 118.78],
      },
    },
    stroke: {
      lineCap: 'round',
    } as ApexStroke,
    labels: ['Percent'],
  };

  return (
    <div className={classes.chart}>
      <Chart options={options} series={data} type='radialBar' width={width} />
      <div className={classes.formatter}>{children}</div>
    </div>
  );
};

export default RadialChart;
