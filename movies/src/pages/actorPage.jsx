import { useParams } from 'react-router';
import ActorDetails from "../components/actorDetails/";
import { getActor } from '../api/tmdb-api'
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner'


const ActorPage = () => {
  const { id } = useParams();

  const { data: actor, error, isPending, isError } = useQuery({
    queryKey: ["actor", { id }],
    queryFn: getActor,
  });

  if (isPending) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return <ActorDetails actor={actor} />;
};

export default ActorPage;
