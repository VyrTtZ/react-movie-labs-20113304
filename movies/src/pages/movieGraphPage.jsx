import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getMovie, getRecommendations } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";
import GraphView from "../components/movieGraph";
import Spinner from "../components/spinner";

const MovieGraphPage = () => {
	const { id } = useParams();
	const movieQ = useQuery({ queryKey: ["movie", { id }],
		queryFn: getMovie});
	const recsQ = useQuery({
		queryKey: ["recommendations", { id }],
		queryFn: gerRecommendations,
	});

	if (movieQ.isPending || recsQ.isPending) return <Spinner />;
  	if (movieQ.isError) return <h1>{movieQ.error.message}</h1>;
  	if (recsQ.isError) return <h1>{recsQ.error.message}</h1>;

	const movie = movieQ.data;
	const recs = recsQ.data.resuts;

	const graph = {
		nodes: [
			{ id: movie.id, title: movie.title, center : true},
			...recs.map)((m) => ({ id: m.id, title: m.title})),
		],
		links: recs.map((m) => (source: movie.id, target: m.id})),
};

return(
	<PageTemplate movie={movie}>
	<GraphView graph={graph} />
	</PageTemplate>
);
};

export default MovieGraphPage;
