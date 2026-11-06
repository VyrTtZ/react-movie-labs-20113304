import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";

const Footer = ({ page, totalPages, onChange, sticky = false }) => {
  if (totalPages <= 1) return null;

  return (
    <Paper
      elevation={sticky ? 3 : 0}
      square
      sx={{
        display: "flex",
        justifyContent: "center",
        py: 2,
        ...(sticky && {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }),
      }}
    >
      <Pagination
        count={totalPages}
        page={page}
        onChange={(event, value) => {
          onChange(value);
          window.scrollTo({ top: 0, behavior: "smooth" });
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