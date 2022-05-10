import { Assignment, Timeline } from "@mui/icons-material";
import { AppBar, Container, Drawer, Toolbar } from "@mui/material";
import { FC, useState } from "react";
import MenuLink from "../molecules/MenuLink";

export interface MenuProps {}

const Menu: FC<MenuProps> = (props) => {
  const drawerWidth = 300;
  const [mobileOpen, setMobileOpen] = useState(false);
  const container = window !== undefined ? () => window.document.body : undefined;
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  return (
    <>
      <Drawer
        container={container}
        variant="persistent"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box" },
        }}
      >
        <img src="logo.png"/>
        <MenuLink to="/" label="Graph" icon={<Timeline fontSize="large" />} />
        <MenuLink to="/data" label="Data" icon={<Assignment />} />
      </Drawer>
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", padding: "10px", position: "relative" },
        }}
        open
      >
        <img src="logo.png" style={{width: "200px", padding: "10px"}}/>
        <MenuLink to="/" label="Graph" icon={<Timeline style={{fontSize: "30px"}}/>}/>
        <MenuLink to="/data" label="Data" icon={<Assignment style={{fontSize: "30px"}}/>} />
      </Drawer>
    </>
    // <AppBar position="static" color="inherit">
    //   <Container maxWidth="xl">
    //     <Toolbar disableGutters>
    //       <MenuLink to="/" label="Graph" icon={<Timeline />} />
    //       <MenuLink to="/data" label="Data" icon={<Assignment />} />
    //     </Toolbar>
    //   </Container>
    // </AppBar>
  );
};

export default Menu;
