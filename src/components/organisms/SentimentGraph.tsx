import {
  Box,
  FormControl,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { maxWidth } from "@mui/system";
import { FC, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { TweetData } from "../../api/TweetData";
import Button from "../atoms/Button";
import InteractiveComponentWrapper from "../molecules/InteractiveComponentWrapper";

interface IData {
  label: string;
  score: number;
}

const SentimentGraph: FC = () => {
  const colors = {
    negative: "#F65247",
    neutral: "#808080",
    positive: "#A5CB43",
  };

  const [data, setData] = useState<IData[]>();
  const [sentence, setSentence] = useState<string>("");

  const getSentimentCategory = () => {
    let maxScore = -Infinity;
    let category = "";
    data?.forEach((item) => {
      if (item.score > maxScore) {
        maxScore = item.score;
        category = item.label;
      }
    });
    if (maxScore > 0.75) {
      return { value: category.toLowerCase(), label: "Very " + category };
    } else if (maxScore < 0.45) {
      return { value: category.toLowerCase(), label: "Somewhat " + category };
    }
    return { value: category.toLowerCase(), label: category };
  };

  const comment = () => {
    return (
      "Your sentence seems to be " +
      getSentimentCategory().label.toLowerCase() +
      "."
    );
  };

  const onTextChange = (e: any) => {
    setSentence(e.target.value as string);
  };

  const analyze = (e: any) => {
    if (sentence.length !== 0) {
      TweetData.getSentiment(sentence)
        .then((data) => {
          if (data) {
            setData(data);
          }
        })
        .catch((e) => {
        });
    }
  };

  const getGifURL = () => {
    const val = getSentimentCategory().value;
    if (val === "positive") {
      return "https://media.giphy.com/media/SQ1nUXwCpki4g/giphy.gif";
    } else if (val === "negative") {
      return "https://media.giphy.com/media/Ti77ZY8Ivj4PVFl6em/giphy.gif";
    }
    return "https://media.giphy.com/media/2jKdye2KWy3XiDUq2E/giphy.gif";
  };

  return (
    <InteractiveComponentWrapper>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, display: "flex", alignItems: "center" }}
        >
          Sentimental Analysis
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          Try out the sentiment analysis model, which has been pretrained using
          Twitter-Roberta from HugginFace API. Write a sentence to see how
          positive, negative, or neutral your sentence is!
        </Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          variant="outlined"
          onChange={onTextChange}
          multiline
          fullWidth
          placeholder="Write your sentence here!"
        />
        <Button variant="contained" onClick={analyze}>
          Analyze
        </Button>
      </Box>
      {data && (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart height={250} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis type="number" ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]} />
              <XAxis type="category" dataKey={"label"} />
              <Tooltip />
              <Bar dataKey="score" fill="#8884d8">
                {data?.map((row) => {
                  return (
                    <Cell
                      key={`cell-${row["label"]}`}
                      //@ts-ignore
                      fill={colors[row["label"].toLowerCase()]}
                    />
                  );
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <Box mt={5}>
            <Box sx={{display: "flex", flexWrap:"wrap"}}>

            <Typography
              variant="h5"
              sx={{ display: "flex", alignItems: "center" }}
            >
              Result: &nbsp;
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                // @ts-ignore
                color: colors[getSentimentCategory().value],
              }}
            >
                {getSentimentCategory().label}
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
          </Box>
        </>
      )}
    </InteractiveComponentWrapper>
  );
};

export default SentimentGraph;
