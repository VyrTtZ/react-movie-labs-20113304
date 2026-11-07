import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getRecommendations } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";
import GraphView from "../components/movieGraph";
import Spinner from "../components/spinner";

const MovieGraphPage = () => {
	console.log("graph page")
	return(
		<p>Testing</p>
	);
};

export default MovieGraphPage;
