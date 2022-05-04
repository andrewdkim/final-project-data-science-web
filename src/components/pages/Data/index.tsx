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
import { UncountableData } from "../../../api/UncountableData";
import Description from "../../molecules/Description";
import DataTable from "../../organisms/DataTable";

const Data: FC = () => {
  const data = UncountableData.getAnnotatedKVPData();

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      sx={{ px: 3, py: 3 }}
      maxWidth="md"
    >
      <Box sx={{mb: 2}}>
        <Description
          title="Data"
          titleSize="md"
          description="JSON file entries into table format"
        />
      </Box>
      {data.map((datum) => {
        const { name, inputs, outputs } = datum;
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
              <DataTable
                inputTable={{ title: "Inputs", data: inputs }}
                outputTable={{ title: "Outputs", data: outputs }}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Container>
  );
};

export default Data;
