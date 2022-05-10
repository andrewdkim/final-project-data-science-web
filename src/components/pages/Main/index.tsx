import { Box, FormControl, Typography, Select, MenuItem, Paper, Divider } from '@mui/material'
import React, { FC } from 'react'
import { TweetData } from '../../../api/TweetData';
import Description from '../../molecules/Description';
import FrequencyGraph from '../../organisms/FrequencyGraph';
import KeywordHypothesisTest from '../../organisms/KeywordHypothesisTest';
import SentimentClass from '../../organisms/SentimentClass';
import SentimentGraph from '../../organisms/SentimentGraph';


const Main:FC = () => {


  return (
    <Box sx={{mx: 3, my: 3}}>
      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", my: 5, flexDirection: "column"}}>
        <img src="logo.png"/>
        <Typography variant="body1" sx={{fontWeight: 700, color: "GrayText", marginTop: "12px"}}>CSCI1951A Data Science Capstone Project</Typography>
      </Box>
      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Motivation</Typography>
        <Typography variant="h6">
          The pandemic is no longer solely about the virus. Since January 2020, the portrayal of COVID-19 and its implications within the US has been heavily politicized by public figures and news outlets across various social media platforms. As such, pandemic related information and opinions can no longer be looked at within a vacuum; misinformation, emotionally charged responses, and political motives need to be considered when consuming COVID related information online. Being college students who actively engage with social media and have been heavily affected by the pandemic, we have great personal interest in this project and hope to understand the political dialogue surrounding COVID-19 on Twitter.
        </Typography>
      </Box>

      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Project Overview</Typography>
        <Typography variant="h6">
          We have gathered COVID related tweets and replies from arguably the two most polarizing US news outlets: CNN and Fox News. With this data, we have examined the language trends and COVID sentiment across these two news outlets over the duration of the pandemic. Specifically, we seek to:
          <ol>
            <li>
              Examine the presentation of COVID information and polarization of COVID sentiment between CNN versus Fox. We will analyze this by observing how frequently some words / keywords are being used, as well as use sentiment analysis to check if the sentiment of the text contributes to the polarization.
            </li>
            <li>
              Examine the differences between how Twitter users respond to COVID related tweets from CNN versus Fox. 
            </li>
          </ol>
          Furthermore, we take inspiration from this example project, as the example project and our project both deal with language processing and sentiment. 
        </Typography>
      </Box>

      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Capstone Component</Typography>
        <Typography variant="h6">
          This website consists of 3 hypothesis testing and 4 visualizations. For each hypothesis testing and visualization, there is a built-in interactive component that you can play around with and see how changing the data impacts the overall trends. 
          <br/>
          <br/>
          This website is built using Create-React-App with Material UI framework and Typescript. Data is being parsed locally using JSON files generated from python scripts. All hypothesis testing are done using Sci-kit on the python side and is not included in this repo. Sentiment Analysis model is a pretrained RoBERTa model from HuggingFace. It's externally being called using HuggingFace's Inference API. 
        </Typography>
      </Box>

      <Divider/>
      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Hypothesis 1</Typography>
        <Typography variant="h6" >
          Question: Are there differences between how CNN tweets about COVID vs how Fox tweets about COVID?"
          <br/>
          <br/>
          Null Hypothesis: There is no significant difference in mean frequency of a specific keyword being used in a tweet between CNN and Fox news.
          <br/>
          <br/>
          We can evaluate this question by answering if CNN uses particular keywords more frequently in their tweets than Fox, and vice versa. We used a independent Two Sample T Test to determine this. 
          <br/>
          <br/>
          In the interactive component below, try inputting different keywords and see if that a specific keyword is being used more / less by a particular news source. We recommend trying words such as "antibody" and "N95".
          <br/>
          <br/>
        </Typography>
        <KeywordHypothesisTest type="hypothesis1"/>
      </Box>

      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Hypothesis 2</Typography>
        <Typography variant="h6" >
          Question: "Is there a difference between how people reply to divisive CNN COVID tweets vs. divisive Fox COVID tweets?"
          <br/>
          <br/>
          Null Hypothesis: "For news tweets that contain at least one of the divisive keywords, replies to Fox tweets will, on average, have more of a negative sentiment compared to replies to CNN tweets that contain at least one of the divisive keywords."
          <br/>
          <br/>
          We define a tweet as divisive if it contains any of the following keywords, which we assume to be polarizing based on personal observation: Trump, Biden, Fauci, Democrat, Republican, CDC, WHO, Moderna, Pfizer, Lockdown, Quarantine, Social Distancing, Masks, Vaccines. Note that we could have chosen more/different terms, but we chose this subset as we think there are clear, polarizing opinions on the different terms just mentioned. We can analyze this by using two sample T-Test. We want to determine whether the average sentiment score (a numerical value) is statistically different between the two independent samples of replies.
          <br/>
          <br/>
          Our results was tstats = 2.36514 and p value = 0.018029. Because the p-value is less than our chosen significance level of .05, we reject the null hypothesis that claims that there is no difference between the average sentiment scores for CNN vs. Fox divisive news tweets. This means that certain keywords may play a certain role sentiment of the replies. 
          <br/>
          <br/>
          We used sentiment analysis for this hypothesis testing. The model we used is trained using roBERTa and Tweets as its dataset. Enter a sentence of your choice in the interactive component below to play around with the model. 
          <br/>
          <br/>
        </Typography>
        <SentimentGraph/>
      </Box>

      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Hypothesis 3</Typography>
        <Typography variant="h6">
          Question: Do certain COVID related Keywords make the tweet more viral?"
          <br/>
          <br/>
          Null Hypothesis: "There is no significant difference between a particular keyword vs whether the content is viral or not."
          <br/>
          <br/>
          We want to test whether there is a relationship between a tweet containing a certain covid keyword and whether the tweet goes viral. We define the virality of the tweet as the following: tweet_virality = reply_count + retweet_count + like_count + quote_count. We have arbitrarily chosen tweet_virality = 800 as a threshold for measuring viral content. Tweets that have virality over 800 will be considered viral, and tweets that have virality under 800 are considered not viral. We can use Chi-square test to determine this.
          <br/>
          <br/>
          In the interactive component below, try inputting different keywords and see if that a specific keyword could influence virality of a tweet. We recommend trying words such as "booster", "pfizer", and "emergency".
          <br/>
          <br/>
        </Typography>
        <KeywordHypothesisTest type="hypothesis3"/>
      </Box>
      <Divider/>
      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Visualization 1: Monthly frequency of Keywords</Typography>
        <Typography variant="h6">
          In the interactive components below, View how CNN and FOX uses each keyword per month by toggling the graph below.
          <br/>
          <br/>
        </Typography>
        <FrequencyGraph type="CNN"/>
      </Box>
      <Box sx={{my:5}}>
        <FrequencyGraph type="FOX"/>
      </Box>

      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Visualization 2: Sentiment Breakdown</Typography>
        <Typography variant="h6">
          The two pie charts below shows a breakdown of posts from CNN and FOX in terms of Sentiment categories - positive, negative, and neutral. 
          <br/>
          <br/>
        </Typography>
        <SentimentClass type="CNN"/>
      </Box>
      <Box sx={{my:5}}>
        <SentimentClass type="FOX"/>
      </Box>
      <Divider/>
      <Box sx={{my:5}}>
        <Typography variant="h4" sx={{fontWeight: 700, marginBottom:"12px"}}>Create Your Own COVID Tweet</Typography>
        <Typography variant="h6">
          Time to make your own Covid related Tweet! This fun interactive component allows you to create a component and allows you to predict how viral your tweet will be. Just write out a text, choose hashtags, and check your virality score.
          <br/>
          <br/>
          The virality score is determined by the keywords / hashtags that you choose, as well as the sentiment of your sentence.
          <br/>
          <br/>
        </Typography>
        
      </Box>
    </Box>
    
  )
}

export default Main