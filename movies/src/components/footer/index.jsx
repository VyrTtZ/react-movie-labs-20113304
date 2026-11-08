import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";

// Pagination bar shown at the bottom of list pages
const Footer = ({ page, totalPages, onChange }) => {
  
  // Nothing to paginate if there's only one page
  if (totalPages <= 1) return null;

  return (
    // Full-width bar with the pagination centred
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
        // Pass the new page number up, then scroll back to the top
        onChange={(event, value) => {
          onChange(value);
          window.scrollTo({ top: 0});
        }}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1} // pages shown either side of the current one
        boundaryCount={1} // pages always shown at the start and end
      />
    </Paper>
  );
};

export default Footer;