const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchMovies(page = 1, query = "") {
  const endpoint = query
    ? `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        query
      )}&page=${page}`
    : `https://api.themoviedb.org/3/movie/now_playing?page=${page}`;

  const res = await fetch(`${endpoint}&api_key=${API_KEY}`);

  if (!res.ok) {
    throw new Error(`TMDB fetch error: ${res.status}`);
  }

  return await res.json();
}

export async function fetchMovieDetails(id) {
  const [detailRes, recRes] = await Promise.all([
    fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}`),
  ]);

  if (!detailRes.ok || !recRes.ok) {
    throw new Error("TMDB details fetch error");
  }

  const details = await detailRes.json();
  const { results: recommendations } = await recRes.json();

  return { details, recommendations };
}
