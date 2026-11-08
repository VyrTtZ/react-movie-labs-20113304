import { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Switch from "@mui/material/Switch";
import { MoviesContext } from "../../contexts/moviesContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Spacer the same height as the toolbar, so page content isn't hidden behind the fixed AppBar
const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  // Element the mobile menu is anchored to; null means the menu is closed
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  // Current media type and setter, shared app-wide via context
  const { media, setMedia} = useContext(MoviesContext);
  // True on screens smaller than the "md" breakpoint
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const navigate = useNavigate();

  // Navigation links shown as buttons (desktop) or menu items (mobile)
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favorites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Hated", path: "/movies/hated" },
    { label: "Now Playing", path: "/movies/now_playing" },
    { label: "Top Rated", path: "/movies/top_rated" },
  ];

  // Close the menu and go to the selected page
  const handleMenuSelect = (pageURL) => {
    setAnchorEl(null);
    navigate(pageURL);
  };

  // Open the mobile menu, anchored to the clicked icon
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar>
        <Toolbar sx={{flexGrow: 1, textAlign: "center"}}>
          {/* Browser-style back button */}
          <IconButton aria-label="go back" onClick={() => navigate(-1)}>
            <ArrowBackIcon color="primary" fontSize="large" />
              </IconButton>
                {/* Site title and tagline */}
                <Typography sx={{ fontSize: "60px", fontWeight: 600, color: "secondary", mr: "80px" }}>
                  TMDB Client
                </Typography>
                <Typography sx={{ fontSize: "30px", fontWeight: 400, color: "secondary" }}>
                  All you ever wanted to know about Movies!
                </Typography>
                {/* Mobile: hamburger icon with dropdown menu. Desktop: row of buttons */}
                {isMobile ? (
                <>
                  <IconButton
                    aria-label="menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "top", horizontal: "right"}}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <>
                {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </>
            )}
          {/* Toggle between movies (off) and TV shows (on) */}
          <Switch 
            checked={media === "tv"}
            onChange={(e) => setMedia(e.target.checked ? "tv" : "movie")}
          />
        {/* Browser-style forward button */}
        <IconButton aria-label="go forward" onClick={() => navigate(1)}>
      <ArrowForwardIcon color="primary" fontSize="large" />
    </IconButton>
  </Toolbar>
</AppBar>
<Offset />
  </>
);
};

export default SiteHeader;