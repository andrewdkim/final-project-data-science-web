import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import Description from "../molecules/Description";

export interface SelectionBoxProps {
  sections: SelectionBoxSection[];
  onChange: (event: SelectChangeEvent<any>, type: string) => void;
}

export interface SelectionBoxSection {
  title: string;
  description: string;
  defaultValue?: string;
  groupName: string;
  variables: SelectionBoxVariables[];
}

export interface SelectionBoxVariables {
  label: string;
  value: string;
}

const SelectionBox: FC<SelectionBoxProps> = (props) => {
  const { sections, onChange } = props;

  return (
    <Paper sx={{ px: 3, py: 3, display: "flex", flexDirection: "column" }}>
      <Description
        title="Graph Toggle"
        description="Toggle input and output to compare each variables on a graph"
      />
      {sections.map((section) => {
        const { title, description, defaultValue, groupName, variables } =
          section;
        return (
          <Box
            key={groupName}
            sx={{ py: 1, display: "flex", flexDirection: "column" }}
          >
            <FormControl component="fieldset">
              <Description title={title} description={description} />
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={defaultValue ?? ""}
                onChange={(e) => {
                  onChange(e, groupName);
                }}
              >
                {variables.map((variable) => {
                  const { label, value } = variable;
                  return (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        );
      })}
    </Paper>
  );
};

export default SelectionBox;
