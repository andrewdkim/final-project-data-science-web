import { Point } from "../types";
import axios from 'axios';
const cnn_replies = require("../cnn_replies_clean.json")
const hypothesis1Data = require("../hypothesis1.json")
const hypothesis3Data = require("../hypothesis3.json")
const foxKeywordFreq = require("../fox_keyword_freq.json")
const cnnKeywordFreq = require("../cnn_keyword_freq.json")
const keywordAverageVirality = require("../keyword_average_virality.json")
export type typeOfData = "inputs" | "outputs";

interface Tweet { 
  url: string,
  date: string,
  id: string,
  lang: string,
  outlinks: string[],
  hashtags: string[] | null,
  news_outlet: string,
  authorid: number,
  conversationid: number,
  text: string,
  replyCount: number
  retweetCount: number,
  likeCount: number,
  quoteCount: number
  month: string,
  keywords: string[]

  // "url": "https://twitter.com/CNN/status/1223028844300554248",
  //       "date": "2020-01-30T23:42:53+00:00",
  //       "id": "1223028844300554248",
  //       "lang": "en",
  //       "outlinks": [
  //           "https://cnn.it/2RGIenx"
  //       ],
  //       "hashtags": null,
  //       "news_outlet": "CNN",
  //       "author_id": "759251",
  //       "conversation_id": "1223028844300554248",
  //       "text": "The death toll in mainland China from the Wuhan coronavirus stands at 213 https://t.co/GmiLdxMhpt",
  //       "reply_count": 31,
  //       "retweet_count": 174,
  //       "like_count": 247,
  //       "quote_count": 26,
  //       "month": "January 2020",
  //       "keywords": [
  //           "death toll",
  //           "death",
  //           "wuhan",
  //           "china"
  //       ]
}

interface KVP {
  key: string;
  value: string | number | number[] | string[];
}

interface CacheGraph {
  [key: string]: Point[];
}

interface CacheTable {
  [key: string]: KVP[];
}

interface AnnotatedKVPTable {
  name: string;
  data: KVP[];
}

export namespace TweetData {

  export const getAllKeywords = () => {
    return Object.keys(keywordAverageVirality)
  }

  export const getAverageViralities = (keywords: string[]) => {
    const result:any = {}
    keywords.forEach(keyword => {
      result[keyword] = keywordAverageVirality[keyword]
    })
    return result;
  }


  export const getHypothesisKeywords = (type: "hypothesis1" | "hypothesis3") => {
    switch (type) {
      case "hypothesis1":
        return Object.keys(hypothesis1Data)
      case "hypothesis3":
        return Object.keys(hypothesis3Data)
    }
  }

  export const getHypothesisKeywordStats = (type: "hypothesis1" | "hypothesis3", keyword: string) => {
    switch (type) {
      case "hypothesis1":
        return hypothesis1Data[keyword]
      case "hypothesis3":
        return hypothesis3Data[keyword]
    }
  }

  export const getSentiment = async (sentence: string) => {
    const res = await axios({
      url: "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
      method: "POST", 
      headers: { Authorization: `Bearer ${process.env.REACT_APP_HUGGINGFACE_API}` },
      data: sentence
    })
    if (res.data) {
      const data = res.data[0]
      return [
        {label: 'Negative', score: data[0]["score"] as number},
        {label: 'Neutral', score: data[1]["score"] as number},
        {label: 'Positive', score: data[2]["score"] as number}
      ]
    } 
    return undefined;
  }

  export const getAllFrequencyKeywords = (type: "CNN" | "FOX") => {
    const keywords = type === "CNN" ? cnnKeywordFreq[0]["CNN"] : foxKeywordFreq[0]["Fox News"]
    const uniqueKeywords:string[] = []
    Object.keys(keywords).forEach(key => {
      const month = keywords[key]
      Object.keys(month).forEach(keyword => {
        if (keyword !== "num_news_tweets_this_month" && keyword !== "num_news_tweets_contain_keyword") {
          if (!uniqueKeywords.includes(keyword)) {
            uniqueKeywords.push(keyword)
          }
        }
      })
    })
    return uniqueKeywords
  }

  export const getFrequencyPerKeyword = (type: "CNN" | "FOX", keywords: string[]) => {
    const data = type === "CNN" ? cnnKeywordFreq[0]["CNN"] : foxKeywordFreq[0]["Fox News"]
    const output:any = {}
    Object.keys(data).forEach(key => {
      const frequencies = data[key]; 
      const freqPerMonth:any = {}

      keywords.forEach(keyword => {
        if (keyword in frequencies) { 
          freqPerMonth[keyword] =  frequencies[keyword]
        } else {
          freqPerMonth[keyword] = 0;
        }
      })
      output[key] = freqPerMonth;
    })
    return output
  }

  export const parseTweets = () => {
    return cnn_replies.map((tweet: any) => {
      return {
        url: tweet["url"],
        date: tweet["date"],
        id: tweet["url"],
        lang: tweet["lang"],
        outlinks: tweet["outlinks"],
        hashtags: tweet["hashtags"],
        news_outlet: tweet["news_outlet"],
        authorid: tweet["author_id"],
        conversationid: tweet["conversation_id"],
        text: tweet["text"],
        replyCount: tweet["reply_count"],
        retweetCount: tweet["retweet_count"],
        likeCount: tweet["like_count"],
        quoteCount: tweet["quote_count"],
        month: tweet["month"],
        keywords: tweet["keywords"]
      } as Tweet
    }) as Tweet[]
  }

  export const getAnnotatedTweets = () => {
    const tweets = parseTweets()
    const data: AnnotatedKVPTable[] = [];
    return tweets.map(tweet => {
      const {id, ...rest} = tweet
      const data = (Object.keys(rest) as Array<keyof typeof rest>).map(key => {
        return (
          {key, value: rest[key]}
        )
      })
      return {name: id, data}
    }) as AnnotatedKVPTable[]
  }
}