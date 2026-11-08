import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Header = (props ) => {
  const title = props.title
    const navigate = useNavigate();

  return (
    <Paper 
      component="div" 
      >
            <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>


     <Typography >
        {title}
      </Typography>
            <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon />
      </IconButton>

    </Paper>
  );
};

export default Header;

