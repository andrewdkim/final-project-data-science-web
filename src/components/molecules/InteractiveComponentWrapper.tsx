import { Box, Paper, Typography } from "@mui/material";
import { FC } from "react";
import InfoIcon from '@mui/icons-material/Info';




const InteractiveComponentWrapper:FC = (props) => {
  return (
    <Paper elevation={3} sx={{ px: 3, py: 3,  bgcolor: "white" }}>
      <Box sx={{mb: 2}}>
        <Typography variant="subtitle1"  sx={{fontWeight: 700, color: "#F0AD28", display:"flex", alignItems:"center" }}> <InfoIcon/> &nbsp; Interactive Component</Typography>
      </Box>
      {props.children}
    </Paper>
  )
}

export default InteractiveComponentWrapper