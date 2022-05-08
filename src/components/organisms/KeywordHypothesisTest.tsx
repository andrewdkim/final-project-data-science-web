import { Box, FormControl, MenuItem, Paper, Select, Typography } from '@mui/material';
import {FC, useState} from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis, Legend, Bar } from 'recharts';
import { ContentType } from 'recharts/types/component/Tooltip';
import { TweetData } from '../../api/TweetData';

export interface HypothesisTest {
  type: "hypothesis1" | "hypothesis3"
}

const KeywordHypothesisTest:FC<HypothesisTest> = (props) => {
  const {type} = props;
  const variables = TweetData.getHypothesisKeywords(type)
  const [currentKeyword, setCurrentKeyword] = useState<string>(variables[0]);
  const onChange = (e:any) => {
    setCurrentKeyword(e.target.value)
  }

  const getPValue = (keyword: string) => {
    return TweetData.getHypothesisKeywordStats(type, keyword)["p-value"]
  }

  const getTStats = (keyword: string) => {
    return TweetData.getHypothesisKeywordStats(type, keyword)["tstats"]
  }

  const expo = (x:string, f:number) => {
    return Number.parseFloat(x).toExponential(f);
  }
  

  const isSignificant = (pval: number) => {
    if (pval < 0.05){
      return true
    }
    return false;
  }

  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props
    if (active && payload && payload.length) {
      console.log(payload[0]["payload"]["label"])
      return (
        <Paper sx={{padding: "5px 5px"}}>
          <Typography>{`${"P-value"} : ${expo(getPValue(currentKeyword), 2)}`}</Typography>
        </Paper>
      );
    }
    return null;
  };

  const comment = () => {
    const significant = isSignificant(getPValue(currentKeyword))
    if (type === "hypothesis1") {
      return significant ? "P-value is lower than 0.05 so we reject the null hypothesis. It's likelly that CNN uses this keyword more/less frequently than Fox." 
      : "P-value is higher than 0.05 so we fail to reject the null hypothesis. There seems to be no difference in frequency of this keyword being used between CNN and Fox"
    } else if (type === "hypothesis3") { 
      return significant ? "" : ""
    }
  }
  

  return (
    <>
      
        <FormControl component="fieldset">
          {/* <Description title={title} description={description} /> */}
        
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Typography>
              Select a keyword:
            </Typography>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentKeyword ?? "Select Keyword"}
              onChange={onChange}
            >
              {variables.map((variable) => {
                return (
                  <MenuItem key={variable} value={variable}>
                    {variable}
                  </MenuItem>
                );
              })}
            </Select>
          </Box>
        </FormControl>
        <BarChart 
          width={730} 
          height={150} 
          layout="vertical"
          data={[{"name": "P-Value", "label": getPValue(currentKeyword), "pvalue": [1, getPValue(currentKeyword)]}]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" reversed ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]} />
          <YAxis type="category" dataKey="name"/>
          <Tooltip content={<CustomTooltip />}/>
          <Legend />
          <Bar dataKey="pvalue" fill="#8884d8" />
        </BarChart>
      <Typography>
          Result: {isSignificant(getPValue(currentKeyword)) ? "Significant" : "Not Significant"}
      </Typography>
      <Typography>
        P-Value: {expo(getPValue(currentKeyword), 2)}, T-stats: {expo(getTStats(currentKeyword), 2)}
      </Typography>
      <Typography>
        {comment()}
      </Typography>
    </>
  )
}
export default KeywordHypothesisTest;