import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { TweetData } from "../../api/TweetData";
import InteractiveComponentWrapper from "../molecules/InteractiveComponentWrapper";

export interface HypothesisTest {
  type: "hypothesis4" | "hypothesis3";
}

const KeywordHypothesisTest: FC<HypothesisTest> = (props) => {
  const { type } = props;
  const variables = TweetData.getHypothesisKeywords(type);
  const [currentKeyword, setCurrentKeyword] = useState<string>(type == "hypothesis4" ? "emergency use authorization" : "booster");
  const onChange = (e: any) => {
    setCurrentKeyword(e.target.value);
  };

  const getPValue = (keyword: string) => {
    return TweetData.getHypothesisKeywordStats(type, keyword)["p-value"];
  };

  const getTStats = (keyword: string) => {
    return TweetData.getHypothesisKeywordStats(type, keyword)["tstats"];
  };

  const expo = (x: string, f: number) => {
    return Number.parseFloat(x).toExponential(f);
  };

  const isSignificant = (pval: number) => {
    if (pval < 0.05) {
      return true;
    }
    return false;
  };

  const CustomTooltip = (props: any) => {
    const { active, payload, label } = props;
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ padding: "5px 5px" }}>
          <Typography>{`${"P-value"} : ${expo(
            getPValue(currentKeyword),
            2
          )}`}</Typography>
        </Paper>
      );
    }
    return null;
  };

  const comment = () => {
    const significant = isSignificant(getPValue(currentKeyword));
    if (type === "hypothesis4") {
      return significant
        ? "P-value is lower than 0.05 so we reject the null hypothesis. It's likelly that CNN uses this keyword more/less frequently than Fox."
        : "P-value is higher than 0.05 so we fail to reject the null hypothesis. There seems to be no difference in frequency of this keyword being used between CNN and Fox";
    } else if (type === "hypothesis3") {
      return significant ? "" : "";
    }
  };

  return (
    <InteractiveComponentWrapper>
      <Box sx={{mb: 5}}>
        <Typography variant="h4"  sx={{fontWeight: 700, display:"flex", alignItems:"center" }}>
          {type === "hypothesis4" ? "Keyword Frequency Analysis" : "Virality Analysis"}
        </Typography>
        <Typography variant="body1" color="secondary"  sx={{display:"flex", alignItems:"center" }}>
          {type === "hypothesis4" ? "Select a keyword to see if using that keyword is being used more/less frequently between CNN and Fox! Alpha value used is 0.05." 
          : "Select a keyword to see if using that keyword has correlation with virality of a tweet! Alpha value used is 0.05."}
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
            {variables.map((variable) => {
              return (
                <MenuItem key={variable} value={variable}>
                  {variable}
                </MenuItem>
              );
            })}
          </Select>
        </Box>
      </FormControl>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart
          height={120}
          layout="vertical"
          data={[
            {
              name: "P-Value",
              label: getPValue(currentKeyword),
              pvalue: [1, getPValue(currentKeyword)],
            },
          ]}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" reversed ticks={[0, 0.2, 0.4, 0.6, 0.8, 1]} />
          <YAxis type="category" dataKey="name" />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="pvalue"
            fill={
              isSignificant(getPValue(currentKeyword)) ? "#A5CB43" : "#808080"
            }
          />
        </BarChart>
      </ResponsiveContainer>
      
      <Typography variant="body1">
        P-Value: {expo(getPValue(currentKeyword), 2)}, T-stats:{" "}
        {expo(getTStats(currentKeyword), 2)}
      </Typography>

      <Box mt={5}>
        <Box sx={{display: "flex", flexWrap: "wrap"}}>
          <Typography variant="h5" sx={{ display: "flex", alignItems: "center"}}>
            Result: &nbsp;{" "}
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,

              color: isSignificant(getPValue(currentKeyword))
                ? "#A5CB43"
                : "#808080",
            }}
          >
            {isSignificant(getPValue(currentKeyword))
              ? type == "hypothesis4" ? "Different" : "Viral"
              : type == "hypothesis4" ? "Not different": "Not Viral"}
          </Typography>
        </Box>
      <Typography variant="h6">{comment()}</Typography>
      </Box>
    </InteractiveComponentWrapper>
  );
};
export default KeywordHypothesisTest;
