import { Box, useTheme } from "@mui/material";
import React, { FC } from "react";
import { useMatch, Link } from "react-router-dom";
import Button from "../atoms/Button";


export interface MenuLinkProps {
    to: any,
    label: string,
    icon?: React.ReactNode,
    line?: boolean,
}


const MenuLink:FC<MenuLinkProps> = (props) => {
    const {to, label, icon, line = false} = props;
	const match = useMatch({ path: to, extact: true });
    const theme = useTheme();
	return (
        <Box>
            <Button
                component={Link}
                size="large"
                key={label}
                to={to}
                startIcon={icon}
                bold = {match ? true : false}
                style={{
                    color: theme.palette.primary.main, 
                    margin: "10px",
                    fontSize: "17px",
                    borderRadius: "25px",
                    padding: "10px 20px 10px 20px",
                }}
            >
                <Box pl={2}></Box>
                {label}
            </Button>
            {line && match ? <Box sx={{swidth: "100%", height: "2px", bgcolor: 'primary.light'}} /> : undefined }
        </Box>
		
	);
};

export default MenuLink;