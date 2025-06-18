// pages/index.jsx
import AppNavbar from "../components/Navbar";
import Hero from "../components/Hero";
import MovieCard from "../components/MovieCard";
import AppPagination from "../components/Pagination";
import { fetchMovies } from "../lib/tmdb";

export default async function Home({ searchParams }) {
  const sParams = await searchParams;
  const isSearchPage = sParams.query;

  const page = parseInt(sParams.page) || 1;
  const query = sParams.query;

  const data = await fetchMovies(page, query);
  const movies = data.results.filter((m) => m.poster_path);
  const currentPage = data.total_pages;
  const totalPages = page;

  return (
    <>
      <main className="container-fluid px-4">
        <Hero showOnlySearch={isSearchPage} />

        {!isSearchPage && <h2 className="mb-5 ps-3 fw-bold">Now Playing</h2>}

        <div className="row g-3">
          {movies
            .filter((movie) => movie.poster_path)
            .slice(0, 12)
            .map((movie) => (
              <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                <MovieCard movie={movie} />
              </div>
            ))}
        </div>

        <AppPagination currentPage={currentPage} totalPages={totalPages} />
      </main>
    </>
  );
}
