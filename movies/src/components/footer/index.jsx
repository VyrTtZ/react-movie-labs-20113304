import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";

const Footer = ({ page, totalPages, onChange }) => {
  
  if (totalPages <= 1) return null;

  return (
    <Paper
      square
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => {
          onChange(value);
          window.scrollTo({ top: 0});
        }}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1} 
      />
    </Paper>
  );
};

export default Footer;