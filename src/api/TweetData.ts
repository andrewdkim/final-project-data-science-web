import { Point } from "../types";
const cnn_replies = require("../cnn_replies_clean.json")

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

  export const parseTweets = () => {
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

  // export const getKVPData = (key: string, type: typeOfData) => {
  //   const KVPKey = key + type;
  //   return cachedTable[KVPKey];
  // };

  // export const getAnnotatedKVPData = () => {
  //   const data: AnnotatedKVPTable[] = [];
  //   Object.keys(json).forEach((name) => {
  //     const inputsKey = name + "inputs";
  //     const outputsKey = name + "outputs";
  //     data.push({
  //       name,
  //       inputs: cachedTable[inputsKey],
  //       outputs: cachedTable[outputsKey],
  //     });
  //   });
  //   return data;
  // };

  // export const getSelections = (type: typeOfData) => {
  //   if (type === "inputs") {
  //     return inputKeys;
  //   }
  //   return outputKeys;
  // };

  // export const getInputOutputPoints = (inputKey: string, outputKey: string) => {
  //   if (cachedGraph[inputKey + outputKey]) {
  //     return cachedGraph[inputKey + outputKey];
  //   }
  //   const points: Point[] = [];
  //   Object.keys(json).forEach((val) => {
  //     const entry = json[val];
  //     if (
  //       entry.inputs &&
  //       entry.outputs &&
  //       entry.inputs[inputKey] &&
  //       entry.outputs[outputKey]
  //     ) {
  //       points.push({
  //         x: entry.inputs[inputKey],
  //         y: entry.outputs[outputKey],
  //       });
  //     }
  //   });
  //   cachedGraph[inputKey + outputKey] = points;
  //   return points;
  // };
}