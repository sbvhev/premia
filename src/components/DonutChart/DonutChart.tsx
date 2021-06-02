import React, { useRef, useLayoutEffect } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  chartBox: {
    '& g > g:nth-child(2) > g:nth-child(2) > g > g:nth-child(3)': {
      display: 'none'
    }
  },
  chartInside: {
    width: 130,
    height: 130,
    borderRadius: 70,
    filter: 'drop-shadow(0px 2px 5px rgba(0, 0, 0, 0.0406947))',
    border: `1px solid ${palette.divider}`,
    position: 'absolute',
    top: '50%',
    left: 43,
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
  data?: Array<any>;
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
  let chart1 = useRef<any>();
  useLayoutEffect(() => {
    var chart = am4core.create("chartdiv", am4charts.PieChart);
    chart.hideTooltip();
    chart.hiddenState.properties.opacity = 0;

    chart.data = data;
    chart.contentWidth = 500;
    chart.radius = am4core.percent(70);
    chart.innerRadius = am4core.percent(60);
    chart.startAngle = 270;
    chart.endAngle = 630;  

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    let gradient = new am4core.LinearGradient();
    gradient.addColor(am4core.color("#5294FF"));
    gradient.addColor(am4core.color("#1EFF78"));
    // gradient.cx = am4core.percent(7.78);
    // gradient.cy = am4core.percent(118.78);
    gradient.rotation = 121.21;

    let gradient1 = new am4core.LinearGradient();
    gradient1.addColor(am4core.color("#EB4A97"));
    gradient1.addColor(am4core.color("#8C43F6"));
    // gradient1.cx = am4core.percent(18.89);
    // gradient1.cy = am4core.percent(95.84);
    gradient1.rotation = 316.57;

    let gradients = [gradient, gradient1];
    series.slices.template.adapter.add("fill", (fill, target) => {
      return target.dataItem ? gradients[target.dataItem.index] : fill;
    });

    series.slices.template.cornerRadius = 10;
    series.slices.template.innerCornerRadius = 7;
    series.slices.template.draggable = true;
    series.slices.template.inert = true;

    series.slices.template.stroke = am4core.color(theme.palette.background.paper);
    series.slices.template.strokeWidth = 2;
    series.slices.template.strokeOpacity = 1;
    series.labels.template.disabled = true;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    chart.legend.maxWidth = 150
    chart.legend.labels.template.fill = am4core.color(theme.palette.text.primary);
    chart.legend.valueLabels.template.fill = am4core.color(theme.palette.text.secondary); 
    chart.legend.valueLabels.template.align = "right";
    chart.legend.valueLabels.template.textAlign = "end"; 
    chart.legend.markers.template.width = 12;
    chart.legend.markers.template.height = 12;
    
    chart1.current = chart;
    return () => {
      chart.dispose();
    }; 
  }, [data, theme.palette.background.paper, theme.palette.text.primary, theme.palette.text.secondary]);

  return (
    <Box id="chartdiv" className={classes.chartBox} style={{ width: "100%" }}></Box>
  );
};

export default DonutChart;
