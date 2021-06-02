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
  type?: string;
  data?: Array<any>;
  colors?: Array<string>;
  endColors?: Array<string>;
  rotations?: Array<number>;
  width?: number;
  height?: number;
}
const DonutChart: React.FC<DonutChartProps> = ({
  data = [],
  width = 360,
  height = 300,
  type = 'gradient',
  colors = [],
  endColors = [],
  rotations = [],
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
    chart.radius = am4core.percent(100);
    chart.innerRadius = am4core.percent(85);
    chart.startAngle = 270;
    chart.endAngle = 630;  

    var series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = "value";
    series.dataFields.category = "category";

    let gradients = colors.map((val, index) => {
      let gradient = new am4core.LinearGradient();
      gradient.addColor(am4core.color(val));
      gradient.addColor(am4core.color(endColors[index]));
      gradient.rotation = rotations[index];  
      return gradient;
    });
    series.slices.template.adapter.add("fill", (fill, target) => {
      return target.dataItem ? type === 'gradient' ? gradients[target.dataItem.index] : am4core.color(colors[target.dataItem.index]) : fill;
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
  }, [colors, data, endColors, rotations, theme.palette.background.paper, theme.palette.text.primary, theme.palette.text.secondary, type]);

  return (
    <Box id="chartdiv" className={classes.chartBox} style={{ width: "100%" }}></Box>
  );
};

export default DonutChart;
