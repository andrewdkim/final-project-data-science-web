import { Box, FormControl, Typography, Select, MenuItem } from '@mui/material'
import React, { FC } from 'react'
import Description from '../../molecules/Description';
import KeywordHypothesisTest from '../../organisms/KeywordHypothesisTest';


const Main:FC = () => {


  return (
    <Box>
      <Typography variant="h3">Hypothesis 1</Typography>
      <Typography variant="h5">Question: Are there differences between how CNN tweets about COVID vs how Fox tweets about COVID?"</Typography>
      <KeywordHypothesisTest type="hypothesis1"/>

      <Typography variant="h3">Hypothesis 3</Typography>
      <Typography variant="h5">Question: Do certain COVID related Keywords make the tweet more viral?"</Typography>
      <KeywordHypothesisTest type="hypothesis3"/>
    </Box>
  )
}

export default Main