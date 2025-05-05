import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router";
import DescriptionIcon from "@mui/icons-material/Description";

const Layout = (props: any) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <>
      <Toolbar>
        <Avatar sx={{ backgroundColor: "blueviolet", mr: 1 }}>logo</Avatar>
        <Divider orientation="vertical" flexItem />

        <Box sx={{ display: "flex", flexDirection: "column", pl: 1 }}>
          <Typography variant="body2">NestjsApp</Typography>
        </Box>
      </Toolbar>

      <Divider />
      <Toolbar sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "column", pl: 1 }}>
          <Typography variant="body2">user1@prisma.io</Typography>
        </Box>
      </Toolbar>
      <List>
        <Link to={"/invoices"}>
          <ListItemButton>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={"Invoices"} />
          </ListItemButton>
        </Link>
      </List>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          alignItems: "flex-end",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Typography variant="caption">©All rights reserved </Typography>
      </Box>
    </>
  );

  return (
    <Box display="flex">
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - 240px)` },
          ml: { md: "240px" },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" noWrap component="div">
              Invoices - (BETA)
            </Typography>
            <Typography variant="caption">...</Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: "240px" }, flexShrink: { md: 0 }, height: "100%" }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            height: "100%",
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: "240px" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: { xs: "100vh", md: "calc(100vh - 60px)" },
          p: 3,
          width: `calc(100% - "240px")`,
        }}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export default Layout;
