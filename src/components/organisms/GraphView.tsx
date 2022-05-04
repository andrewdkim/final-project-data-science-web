import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ComposedChart,
} from "recharts";
import regression from "regression";
import { Point, Reg } from "../../types";

export interface GraphViewProps {
  data: Point[];
  xAxisLabel: string;
  yAxisLabel: string;
}

const GraphView: FC<GraphViewProps> = memo((props) => {
  const { data, xAxisLabel, yAxisLabel } = props;
  const [currentGraph, setCurrentGraph] = useState<number>(1);
  const [graphData, setGraphData] = useState<(Point | Reg)[]>([]);
  const [xRange, setXRange] = useState<number[]>();
  const [yRange, setYRange] = useState<number[]>();
  const [regressionData, setRegressionData] = useState<string>("");

  useEffect(() => {
    if (data.length === 0) {
      setGraphData([]);
    } else {
      const regResult = regression.linear(
        data.map((point) => [point.x, point.y])
      ); // y = ax + b
      const [a, b] = regResult.equation;
      const xMaximum = Math.max.apply(
        Math,
        data.map((obj) => {
          return obj.x;
        })
      );
      const xMinimum = Math.min.apply(
        Math,
        data.map((obj) => {
          return obj.x;
        })
      );
      const yMaximum = Math.max.apply(
        Math,
        data.map((obj) => {
          return obj.y;
        })
      );
      const yMinimum = Math.min.apply(
        Math,
        data.map((obj) => {
          return obj.y;
        })
      );
      setXRange([xMinimum, xMaximum]);
      setYRange([yMinimum, yMaximum]);
      setRegressionData(`y = ${a}x + ${b}, R2 = ${regResult.r2}`);
      const dataWithReg = [
        ...data,
        ...[
          { x: xMinimum, reg: a * xMinimum + b },
          { x: xMaximum, reg: a * xMaximum + b },
        ],
      ];
      setGraphData(dataWithReg);
    }
  }, [data]);

  const onGraphChange = () => {
    setCurrentGraph(currentGraph === 1 ? 2 : 1);
  };

  return (
    <Paper sx={{ px: 3, py: 3, height: "100%", bgcolor: "white" }}>
      {data.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography>No data to show.</Typography>
        </Box>
      ) : (
        <>
          <Tabs value={currentGraph} onChange={onGraphChange} sx={{ mb: 2 }}>
            <Tab label="Regression" value={1} />
            <Tab label="Scatterplot" value={2} />
          </Tabs>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
            {props.xAxisLabel} vs {props.yAxisLabel}{" "}
          </Typography>

          <ResponsiveContainer width="100%" height="80%">
            {currentGraph === 1 ? (
              <ComposedChart
                width={100}
                height={200}
                data={graphData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} content={<Typography>{regressionData}</Typography>} />
                <XAxis
                  type="number"
                  dataKey="x"
                  range={xRange}
                  name={xAxisLabel}
                  height={40}
                  label={{ value: `Input: ${xAxisLabel}`, offset: 0, position: 'insideBottom', style: { textAnchor: 'middle' } }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  range={yRange}
                  name={yAxisLabel}
                  label={{ value:  `Output: ${yAxisLabel}`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <Scatter name="A school" dataKey="y" fill="#8884d8" />
                <Line
                  dataKey="reg"
                  stroke="blue"
                  dot={false}
                  activeDot={false}
                  legendType="none"
                />
              </ComposedChart>
            ) : (
              <ScatterChart
                width={100}
                height={200}
                data={graphData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid />
                <XAxis
                  type="number"
                  dataKey="x"
                  range={xRange}
                  name={xAxisLabel}
                  label={{ value: `Input: ${xAxisLabel}`, offset: 0, position: 'insideBottom', style: { textAnchor: 'middle' } }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  range={yRange}
                  name={yAxisLabel}
                  label={{ value:  `Output: ${yAxisLabel}`, angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }}
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="A school" data={data} fill="#8884d8" />
              </ScatterChart>
            )}
          </ResponsiveContainer>
        </>
      )}
    </Paper>
  );
});

export default GraphView;
