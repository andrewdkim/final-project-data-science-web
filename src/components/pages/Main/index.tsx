import { Box, FormControl, Typography, Select, MenuItem, Paper } from '@mui/material'
import React, { FC } from 'react'
import { TweetData } from '../../../api/TweetData';
import Description from '../../molecules/Description';
import FrequencyGraph from '../../organisms/FrequencyGraph';
import KeywordHypothesisTest from '../../organisms/KeywordHypothesisTest';
import SentimentGraph from '../../organisms/SentimentGraph';


const Main:FC = () => {


  return (
    <Box sx={{mx: 3, my: 3}}>
      <Typography variant="h3" sx={{fontWeight: 700}}>Hypothesis 1</Typography>
      <Typography variant="h5" >Question: Are there differences between how CNN tweets about COVID vs how Fox tweets about COVID?"</Typography>
      <KeywordHypothesisTest type="hypothesis1"/>
      <Typography variant="h3">Hypothesis 2</Typography>
      <SentimentGraph/>


      <Typography variant="h3">Hypothesis 3</Typography>
      <Typography variant="h5">Question: Do certain COVID related Keywords make the tweet more viral?"</Typography>
      <KeywordHypothesisTest type="hypothesis3"/>

      <FrequencyGraph type="FOX"/>
      <FrequencyGraph type="CNN"/>

    </Box>
  )
}

export default Main