import { Box } from "@mui/material";
import { FC } from "react";
import KVPTable, { KVPTableProps } from "../molecules/KVPTable";

export interface DataTableProps {
  inputTable: KVPTableProps;
  outputTable: KVPTableProps;
}

const DataTable: FC<DataTableProps> = (props) => {
  const { inputTable, outputTable } = props;
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <KVPTable {...inputTable} />
      <KVPTable {...outputTable} />
    </Box>
  );
};

export default DataTable;
