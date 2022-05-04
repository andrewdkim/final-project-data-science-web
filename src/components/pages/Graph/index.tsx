import { Box, Container, Grid } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UncountableData } from "../../../api/UncountableData";
import { GraphActionTypes, GraphState } from "../../../store/graph/types";
import SelectionBox, {
  SelectionBoxSection,
  SelectionBoxVariables,
} from "../../organisms/SelectionBox";
import { useSelector } from "react-redux";
import { AppState } from "../../../store";
import { Point } from "../../../types";
import GraphView from "../../organisms/GraphView";
import Description from "../../molecules/Description";

const parseVariables = (set: Set<string>) => {
  const variables: SelectionBoxVariables[] = [];
  set.forEach((item) => {
    variables.push({
      label: item,
      value: item,
    });
  });
  return variables;
};

const Graph: FC = () => {
  const graph = useSelector<AppState>((state) => state.graph) as GraphState;
  const [data, setData] = useState<Point[]>([]);

  const sections: SelectionBoxSection[] = [
    {
      title: "Inputs",
      description: "Input represents X Axis",
      groupName: "inputs",
      variables: parseVariables(UncountableData.getSelections("inputs")),
      defaultValue: graph.input,
    },
    {
      title: "Outputs",
      description: "Output represents Y Axis",
      groupName: "outputs",
      variables: parseVariables(UncountableData.getSelections("outputs")),
      defaultValue: graph.output,
    },
  ];

  useEffect(() => {
    if (graph.input && graph.output) {
      const data: Point[] = UncountableData.getInputOutputPoints(
        graph.input,
        graph.output
      ).sort((a, b) => a.x - b.x);
      setData(data);
    } else {
      setData([]);
    }
  }, [graph]);

  const dispatch = useDispatch();
  const onSelectionChange = (e: any, type: string) => {
    if (type === "inputs") {
      dispatch({ type: GraphActionTypes.SET_INPUTS, payload: e.target.value });
    } else {
      dispatch({ type: GraphActionTypes.SET_OUTPUTS, payload: e.target.value });
    }
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
      sx={{ px: 3, py: 3 }}
      maxWidth="xl"
    >
      <Box sx={{mb: 2}}>
        <Description
          title="Graph"
          titleSize="md"
          description="Visualize relationship between inputs and outputs of the data through linear regression and scatterplots"
        />
      </Box>
      <Grid container spacing={2}>
        <Grid  item md={12} xs={12}>
          <SelectionBox onChange={onSelectionChange} sections={sections} />
        </Grid>
        <Grid style={{height: "100%"}} item md={12} xs={12}>
          <GraphView
            data={data}
            xAxisLabel={graph.input ?? ""}
            yAxisLabel={graph.output ?? ""}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Graph;
