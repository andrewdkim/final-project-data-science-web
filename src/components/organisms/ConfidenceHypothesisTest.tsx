import { Box, Typography, FormControl, Select, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { TweetData } from "../../api/TweetData";
import InteractiveComponentWrapper from "../molecules/InteractiveComponentWrapper";

const ConfidenceHypothesisTest:FC = () => {

  const [currentKeyword, setCurrentKeyword] = useState<string>("biden");

  const isSignificant = () => {
    const [lower, upper] = TweetData.getConfidence(currentKeyword);
    if (lower <= 0 && upper >= 0) {
      return false;
    }
    return true;
  }

  const onChange = (e: any) => {
    setCurrentKeyword(e.target.value)
  };

  const comment = () => {
    if (isSignificant()) { 
      return "Since the confidence interval does not include 0, we reject the null hypothesis. This means that the proportion of COVID news tweets that contain a particular keyword may be different between Fox and CNN"
    }
      return "Since the confidence interval does include 0, we fail to reject the null hypothesis. This means that the proportion of COVID news tweets that contain a particular keyword may be same between Fox and CNN"
  }

  return (
    <InteractiveComponentWrapper>
    <Box sx={{mb: 5}}>
      <Typography variant="h4"  sx={{fontWeight: 700, display:"flex", alignItems:"center" }}>
        Keyword Proportions
      </Typography>
      <Typography variant="body1" color="secondary"  sx={{display:"flex", alignItems:"center" }}>
        Select a keyword to see if the proportion of COVID tweets that uses this particular keyword is same or different between Fox and CNN. 
      </Typography>
    </Box>
    <FormControl component="fieldset">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Typography>Select a keyword: &nbsp;</Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentKeyword ?? "Select Keyword"}
          onChange={onChange}
        >
          {TweetData.getAllProportionKeywords().map((variable) => {
            return (
              <MenuItem key={variable} value={variable}>
                {variable}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </FormControl>

    <Box mt={5}>
      <Box sx={{display: "flex", flexWrap: "wrap"}}>
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center"}}>
          Result: &nbsp;{" "}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,

            color: isSignificant()
              ? "#A5CB43"
              : "#808080",
          }}
        >
          {isSignificant()
            ? "Different Proportion"
            : "Same Proportion"
          }
        </Typography>
      </Box>
      <Typography variant="h6">Confidence Interval: [{TweetData.getConfidence(currentKeyword)[0]} - {TweetData.getConfidence(currentKeyword)[1]}]</Typography>
    <Typography variant="h6">{comment()}</Typography>
    </Box>
  </InteractiveComponentWrapper>
  )
}

export default ConfidenceHypothesisTest;