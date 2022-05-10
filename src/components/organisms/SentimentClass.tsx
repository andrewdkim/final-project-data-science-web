import React, { FC } from 'react'
import InteractiveComponentWrapper from '../molecules/InteractiveComponentWrapper';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';



export interface SentimentClassProps {
  type: "CNN" | "FOX"
}




const SentimentClass:FC<SentimentClassProps> = (props) => {
  const colors = {
    "negative" : "#F65247", 
    "neutral" : "#808080", 
    "positive" : "#A5CB43"
  } 


  //@ts-ignore
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index , label}) => {
    console.log(label)
    const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      // @ts-ignore
      <text x={x} y={y} fill={colors[label.toLowerCase()]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${label}: ${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const {type} = props;
  const data =  type === "CNN" ? [ 
      {
        label: "Neutral", 
        value: 39.9
      },
      {
        label: "Positive", 
        value: 9.9
      },
      {
        label: "Negative", 
        value: 50.2
      },
    ] : [
      {
        label: "Neutral", 
        value: 41.3
      },
      {
        label: "Positive", 
        value: 7.8
      },
      {
        label: "Negative", 
        value: 50.9
      },
    ]
  
  return (
    <InteractiveComponentWrapper>
      <Box sx={{mb: 5}}>
        <Typography variant="h4"  sx={{fontWeight: 700, display:"flex", alignItems:"center" }}>
          {type === "CNN" ? "CNN's Sentiment Breakdown" : "FOX's Sentiment Breakdown"}
        </Typography>
        <Typography variant="body1" color="secondary"  sx={{display:"flex", alignItems:"center" }}>
          {type === "CNN" ? "This pie chart shows the category of CNN posts organized by sentiment categories - positive, negative, and neutral" 
          : "This pie chart shows the category of FOX posts organized by sentiment categories - positive, negative, and neutral" }
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart height={300} margin={{
            top: 5,
            right: 20,
            left: 20,
            bottom: 5,
          }}>
          <Pie 
            data={data} 
            dataKey="value" 
            outerRadius={100}
            nameKey="label" 
            cx="50%" 
            cy="50%" 
            label={renderCustomizedLabel}
          > 

            {data.map((entry, index) => {
              // @ts-ignore
              return <Cell key={`cell-${index}`}  fill={colors[entry.label.toLowerCase()]} />
            })}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </InteractiveComponentWrapper>
    
  )
}

export default SentimentClass;