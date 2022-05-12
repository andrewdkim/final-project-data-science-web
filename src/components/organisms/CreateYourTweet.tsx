import { Autocomplete, Box, Chip, TextField, Typography } from "@mui/material";
import { FC, useState } from "react";
import { TweetData } from "../../api/TweetData";
import Button from "../atoms/Button";
import InteractiveComponentWrapper from "../molecules/InteractiveComponentWrapper";

const CreateYourTweet:FC = () => {
  const allKeywords:string[] = TweetData.getAllFrequencyKeywords("CNN")
  const [value, setValue] = useState<string[]>([]);
  const [sentence, setSentence] = useState<string>("");
  const [score, setScore] = useState<number>();
  const colors = ["#1DA1F2"] 

  const onTextChange = (e:any) => {
    setSentence(e.target.value as string)
  }

  const analyze = (e:any) => {
    if (sentence.length !== 0) {
      TweetData.getSentiment(sentence).then(data => {
        if (data) {
          let maxScore = -Infinity;
          let category = "";
          let multiplier = 1;
          data?.forEach((item) => {
            if (item.score > maxScore) {
              maxScore = item.score;
              category = item.label;
            }
          });
          if (category == "Positive" || category == "Negative") {
            multiplier += maxScore
          }
          const viralities = TweetData.getAverageViralities(value);
          let summation = 400
          Object.keys(viralities).forEach(key => {
            summation += viralities[key] as number
          });
          if (Object.keys(viralities).length === 0) {
            setScore((summation) * multiplier)
          } else {
            setScore((summation / Object.keys(viralities).length) * multiplier)
          }
        }
      }).catch(e => {
      })
    }
  }

  const getViralityCategory = () => {
    if (score) { 
      if (score >= 2000) { 
        return "Very Viral"
      } else if (score >= 1800) { 
        return "Viral";
      } else if (score >= 1600) { 
        return "Somewhat Viral";
      }
    }
    return "Not Viral"
  }

  const isViral = () => {
    if (score) { 
      if (score >= 1600) { 
        return true;
      }
    }
    return false;
  }

  const getGifURL = () => {
    if (isViral()) {
      return "https://media.giphy.com/media/l378AXODb74RlihFK/giphy.gif"
    }
    return "https://media.giphy.com/media/xUOxeYGfFzybpBTazC/giphy.gif"
  }

  const comment = () => {
    if (isViral()) { 
      return "Congrats! According to our algorithm, your tweet could be viral!"
    }
    return "Hmm... it seems like your tweet might not do very well. Try again!"
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
      {score && (
        <>
        <Box sx={{display: "flex", flexWrap: "wrap", mt:3}}>
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center"}}>
          Result: &nbsp;{" "}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: isViral()
              ? "#A5CB43"
              : "#808080",
          }}
        >
          {getViralityCategory()}
          </Typography>

          </Box>
        <Typography variant="h6">{comment()}</Typography>

          <Box
              sx={{
                mt: 4,
                mb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img style={{ width: "100%", maxWidth: "350px" }} src={getGifURL()} />
            </Box>
        </>
      )}
    </InteractiveComponentWrapper>
  )
}

export default CreateYourTweet