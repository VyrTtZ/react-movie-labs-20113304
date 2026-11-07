import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router";
//-------------------------------------------------------------------------------------------IMPORTS
const WriteReviewIcon = ({ movie }) => {

//-------------------------------------------------------------------------------------------RETURN IN HTML LINKING TO REVIEW WRITING
  return (
    <Link to={`/reviews/form`} state={{ movieId: movie.id}}>
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
