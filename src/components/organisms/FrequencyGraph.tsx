import { Autocomplete, Box, Chip, TextField, Typography } from '@mui/material';
import {FC, useState} from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TweetData } from '../../api/TweetData';
import InteractiveComponentWrapper from '../molecules/InteractiveComponentWrapper';


export interface FrequencyGraphProps {
  type: "FOX" | "CNN"
}

const FrequencyGraph:FC<FrequencyGraphProps> = (props) => {
  const {type} = props
  const allKeywords:string[] = TweetData.getAllFrequencyKeywords(type)
  const [value, setValue] = useState([allKeywords[13]]);
  const colors = ["#F65247", "#F0AD28", "#F4DC39", "#A5CB43", "#52AFE6", "#565BAF"] 
  const parseData = (keywords:string[]) => {
    const data = TweetData.getFrequencyPerKeyword(type, keywords)
    return Object.keys(data).map(month => {
      return {
        month, 
        ...data[month]
      }
    })
  }

  console.log(parseData(value))

  return ( 
    <InteractiveComponentWrapper>
      <Box sx={{mb: 5}}>
        <Typography variant="h4"  sx={{fontWeight: 700, display:"flex", alignItems:"center" }}>
          {type === "CNN" ? "CNN's Monthly # of Keywords Mentioned" : "FOX's Monthly # of Keywords Mentioned"}
        </Typography>
        <Typography variant="body1" color="secondary"  sx={{display:"flex", alignItems:"center" }}>
          {type === "CNN" ? "Select multiple keywords to see the number of times CNN has mentioned these keywords in their tweets per month" 
          : "Select multiple keywords to see the number of times FOX has mentioned these keywords in their tweets per month"}
        </Typography>
      </Box>
      <Autocomplete
        sx={{
          mb: 3
        }}
        fullWidth
        multiple
        id="fixed-tags-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue([...newValue]);
        }}
        options={allKeywords}
        getOptionLabel={(option) => option}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option}
              sx={{
                backgroundColor: colors[tagValue.indexOf(option) % colors.length],
                color: "#FFF",
              }}
              {...getTagProps({ index })}
            />
          ))
        }
        style={{ maxWidth: 500, width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Keyword Tags" placeholder="Add More Keywords" fullWidth/>
        )}
      />
      <ResponsiveContainer width="100%" height={500} >
          <LineChart height={500} data={parseData(value)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" padding={{ left: 30, right: 30 }} tickSize={15} />
            <YAxis type="number"/>
            <Tooltip />
            <Legend />
            {value.map((keyword) => {
              console.log(colors.length % value.indexOf(keyword))
              return <Line type="monotone" stroke={colors[value.indexOf(keyword) % colors.length]} strokeWidth={2} dataKey={keyword} activeDot={{ r: 5 }} />
            })}
          </LineChart>
        </ResponsiveContainer>
    </InteractiveComponentWrapper>
  )
}

export default FrequencyGraph;