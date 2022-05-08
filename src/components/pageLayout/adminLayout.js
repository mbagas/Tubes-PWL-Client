import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
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
const ListMenu = [
  {
    text: "Beranda",
    icon: <Home />,
    path: "/",
  },
  {
    text: "Produk",
    icon: <RestaurantMenu />,
    path: "/produk",
  },
  {
    text: "Transaksi",
    icon: <ShoppingCart />,
    path: "/transaksi",
  },
  {
    text: "Data Pegawai",
    icon: <Group />,
    path: "/user",
  },
  {
    text: "Logout",
    icon: <Logout />,
    path: "/logout",
  },
];

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

  // ITEM ICONS SEBELAH KANAN
  // const [anchorel, setanchorel] = React.useState(null);
  // const [mobileMoreanchorel, setMobileMoreanchorel] = React.useState(null);

  // const isMenuOpen = Boolean(anchorel);
  // const isMobileMenuOpen = Boolean(mobileMoreanchorel);

  // const handleProfileMenuOpen = (event) => {
  //   setanchorel(event.currentTarget);
  // };

  // const handleMobileMenuClose = () => {
  //   setMobileMoreanchorel(null);
  // };

  // const handleMenuClose = () => {
  //   setanchorel(null);
  //   handleMobileMenuClose();
  // };

  // const handleMobileMenuOpen = (event) => {
  //   setMobileMoreanchorel(event.currentTarget);
  // };

  // const menuId = "primary-search-account-menu";
  // const renderMenu = (
  //   <Menu
  //     anchorel={anchorel}
  //     anchororigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={menuId}
  //     keepmounted="true"
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMenuOpen}
  //     onClose={handleMenuClose}
  //   >
  //     <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
  //     <MenuItem onClick={handleMenuClose}>Keluar</MenuItem>
  //   </Menu>
  // );

  // const mobileMenuId = "primary-search-account-menu-mobile";
  // const renderMobileMenu = (
  //   <Menu
  //     anchorel={mobileMoreanchorel}
  //     anchororigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     id={mobileMenuId}
  //     keepmounted
  //     transformOrigin={{
  //       vertical: "top",
  //       horizontal: "right",
  //     }}
  //     open={isMobileMenuOpen}
  //     onClose={handleMobileMenuClose}
  //   >
  //     <MenuItem>
  //       <IconButton
  //         size="large"
  //         aria-label="show 17 new notifications"
  //         color="inherit"
  //       >
  //         <Badge badgeContent={5} color="error">
  //           <Notifications />
  //         </Badge>
  //       </IconButton>
  //       <p>Notifikasi</p>
  //     </MenuItem>
  //     <MenuItem onClick={handleProfileMenuOpen}>
  //       <IconButton
  //         size="large"
  //         aria-label="account of current user"
  //         aria-controls="primary-search-account-menu"
  //         aria-haspopup="true"
  //         color="inherit"
  //       >
  //         <AccountCircle />
  //       </IconButton>
  //       <p>Profile</p>
  //     </MenuItem>
  //   </Menu>
  // );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* TOPBAR BOX */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
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
            WAROENG MAKAN
          </Typography>

          {/* ITEM ICON KANAN */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="error">
                <Notifications />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              // onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
