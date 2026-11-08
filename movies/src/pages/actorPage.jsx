import { useParams } from 'react-router';
import ActorDetails from "../components/actorDetails/";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import { getMovie, getActor } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'
import { useContext } from "react";
import { MoviesContext } from "../contexts/moviesContext";
// import useMovie from "../hooks/useMovie";   Redundant

const ActorPage = () => {
  const { id } = useParams();

  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActor,
  });

  if (isPending) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return <ActorDetails actor={actor} />;
};

export default ActorPage;
