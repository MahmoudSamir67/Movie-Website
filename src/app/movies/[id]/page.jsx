import { fetchMovieDetails } from "@/lib/tmdb";

import MovieDetails from "@/components/MovieDetails";

async function FilmDetails({ params }) {
  const { id } = await params;

  const { details, recommendations } = await fetchMovieDetails(id);

  return <MovieDetails movie={details} recommendations={recommendations} />;
}

export default FilmDetails;
