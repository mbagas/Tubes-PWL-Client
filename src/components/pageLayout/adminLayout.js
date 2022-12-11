import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import {
  AccountCircle,
  ChevronLeft,
  ChevronRight,
  Group,
  Home,
  Menu,
  Notifications,
  RestaurantMenu,
  ShoppingCart,
  Logout,
  HomeOutlined,
  FastfoodOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import {
  Badge,
  Box,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

// THEME STYLE
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: "#311C82",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
// END THEME STYLE

// LIST ITEM MENU KIRI
let role = "";
if (localStorage.getItem("token")) {
  if (localStorage.getItem("role")) {
    role = localStorage.getItem("role");
  }
}
let ListMenu = [];
if (role == 1) {
  ListMenu = [
    {
      text: "Beranda",
      icon: <HomeOutlined />,
      path: "/",
    },
    {
      text: "Produk",
      icon: <FastfoodOutlined />,
      path: "/produk",
    },
    {
      text: "Transaksi",
      icon: <ShoppingCartOutlined />,
      path: "/transaksi",
    },
   
    {
      text: "Logout",
      icon: <Logout />,
      path: "/logout",
    },
  ];
} else {
  ListMenu = [
    {
      text: "Beranda",
      icon: <HomeOutlined />,
      path: "/",
    },
    {
      text: "Produk",
      icon: <FastfoodOutlined />,
      path: "/produk",
    },
    {
      text: "Transaksi",
      icon: <ShoppingCartOutlined />,
      path: "/transaksi",
    },
    {
      text: "Logout",
      icon: <Logout />,
      path: "/logout",
    },
  ];
}

// MAIN
export default function Navbar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* TOPBAR BOX */}
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{bgcolor:'maroon'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            KOPI HITADO
          </Typography>

          {/* ITEM ICON KANAN */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            
            <IconButton sx={{width:'10%', height:'10%'}  } >
            
            </IconButton>
            <Avatar
                 alt=""
                 src="/hitado.png"
                 sx={{marginLeft:'60%', width: '15%', height: '15%' }}
                  />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              // aria-controls={mobileMenuId}
              aria-haspopup="true"
              // onClick={handleMobileMenuOpen}
              color="inherit"
            ></IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* {renderMobileMenu}
      {renderMenu} */}

      {/* LEFTBAR */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </DrawerHeader>

        {/* LIST ITEM MENU */}
        <Divider />
        <List>
          {ListMenu.map((item) => (
            <a href={item.path} style={{ textDecoration: "none" }}>
              <ListItemButton
                key={item.text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                href={item.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    opacity: open ? 1 : 0,
                    color: "text.primary",
                  }}
                />
              </ListItemButton>
            </a>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* KONTEN DISINI */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
}
