import {
  Box,
  Table,
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { FC } from "react";
import Description from "./Description";

export interface KVPTableProps {
  title: string;
  description?: string;
  data: KVP[];
}

interface KVP {
  key: string;
  value: string | number | number[]  | string[];
}

const KVPTable: FC<KVPTableProps> = (props) => {
  const { title, description, data } = props;
  return (
    <Box>
      <Description title={title} description={description} />
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {data.map((datum) => (
              <TableRow
                key={datum.key}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {datum.key}
                </TableCell>
                <TableCell align="right">{datum.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default KVPTable;
