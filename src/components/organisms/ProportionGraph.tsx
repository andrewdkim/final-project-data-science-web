import { Box, Typography, Autocomplete, Chip, TextField } from "@mui/material";
import { FC, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { TweetData } from "../../api/TweetData";
import InteractiveComponentWrapper from "../molecules/InteractiveComponentWrapper";


const ProportionGraph:FC = () => {

  const [keywords, setKeywords] = useState<string[]>(["trump", "biden", "fauci"]); 
  const colors = ["#F65247", "#F0AD28", "#F4DC39", "#A5CB43", "#52AFE6", "#565BAF"] 
 

  return (
    <InteractiveComponentWrapper>
      <Box sx={{mb: 5}}>
        <Typography variant="h4"  sx={{fontWeight: 700, display:"flex", alignItems:"center" }}>
          Proportion of tweets that contain certain keywords
        </Typography>
        <Typography variant="body1" color="secondary"  sx={{display:"flex", alignItems:"center" }}>
          Select multiple keywords to see what proportion of CNN and Fox tweets contain these keywords. 
        </Typography>
      </Box>
      <Autocomplete
        sx={{
          mb: 3
        }}
        fullWidth
        multiple
        id="fixed-tags-demo"
        value={keywords}
        onChange={(event, newValue) => {
          setKeywords([...newValue]);
        }}
        options={TweetData.getAllProportionKeywords()}
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
      <ResponsiveContainer width="100%" height={350}>
        <BarChart height={350} data={TweetData.getProportion(keywords)}>
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis type="number" />
          <XAxis type="category" dataKey={"keyword"} />
          <Tooltip />
          <Bar dataKey="cnn_prop" fill="#52AFE6"/>
          <Bar dataKey="fox_prop" fill="#F65247"/>
            {/* {data?.map((row) => {
              return (
                <Cell
                  key={`cell-${row["label"]}`}
                  //@ts-ignore
                  fill={colors[row["label"].toLowerCase()]}
                />
              );
            })} */}
        </BarChart>
      </ResponsiveContainer>
    </InteractiveComponentWrapper>
  )
}

export default ProportionGraph