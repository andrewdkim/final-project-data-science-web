import { ExpandMore } from "@mui/icons-material";
import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
} from "@mui/material";
import { FC } from "react";
import { TweetData } from "../../../api/TweetData";
import { UncountableData } from "../../../api/UncountableData";
import Description from "../../molecules/Description";
import KVPTable from "../../molecules/KVPTable";
import DataTable from "../../organisms/DataTable";

const Data: FC = () => {
  const data = TweetData.getAnnotatedTweets();

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      sx={{ px: 3, py: 3 }}
      maxWidth="md"
    >
      <Box sx={{mb: 2}}>
        <Description
          title="CNN Tweets"
          titleSize="md"
          description="CNN Tweet JSON file entries into table format"
        />
      </Box>
      {data.map((datum) => {
        const { name, data} = datum;
        return (
          <Accordion key={name}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6" fontWeight="bold">
                {name}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <KVPTable title={name} data={data}/>
              {/* <DataTable
                inputTable={{ title: "Inputs", data: inputs }}
                outputTable={{ title: "Outputs", data: outputs }}
              /> */}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default Data;
