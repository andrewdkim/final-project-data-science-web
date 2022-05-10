import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { TweetData } from "../../api/TweetData";
import Button from "../atoms/Button";
import InteractiveComponentWrapper from "../molecules/InteractiveComponentWrapper";

const CreateYourTweet:FC = () => {
  const allKeywords:string[] = TweetData.getAllFrequencyKeywords("CNN")
  const [value, setValue] = useState<string[]>([]);
  const [sentence, setSentence] = useState<string>("");
  const colors = ["#1DA1F2"] 

  const onTextChange = (e:any) => {
    setSentence(e.target.value as string)
  }

  const analyze = (e:any) => {
    if (sentence.length !== 0) {
      TweetData.getSentiment(sentence).then(data => {
        if (data) {
          // setData(data)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }



  return (
    <InteractiveComponentWrapper>
      <Box sx={{mb: 5}}>
        <Typography variant="h4"  sx={{fontWeight: 700, display:"flex", alignItems:"center" }}>
          Virality Predictor
        </Typography>
        <Typography variant="body1" color="secondary"  sx={{display:"flex", alignItems:"center" }}>
          Start off by writing a sentence related to COVID and then choose hashtags that you want to use. Click "check virality" to see your virality score!
        </Typography>
      </Box>

    <Box sx={{mb: 2}}>
      <TextField variant="outlined" onChange={onTextChange} multiline fullWidth placeholder='Write your sentence here!'/>
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
              label={`#${option}`}
              sx={{
                backgroundColor: colors[tagValue.indexOf(option) % colors.length],
                color: "#FFF",
              }}
              {...getTagProps({ index })}
            />
          ))
        }
        style={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Hashtags" placeholder="Add More Hashtags" fullWidth/>
        )}
      />
      <Button variant="contained" onClick={analyze}>Check Virality</Button>
    </InteractiveComponentWrapper>
  )
}

export default CreateYourTweet