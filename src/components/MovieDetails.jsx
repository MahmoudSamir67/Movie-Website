"use client";

import { useEffect, useState } from "react";

import MovieCard from "@/components/MovieCard";
import "@/styles/movieDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import { getWishlist, saveWishlist } from "@/utils/localWishlist";

function MovieDetails({ movie, recommendations }) {
  const [wish, setWish] = useState(false);

  useEffect(() => {
    const list = getWishlist();
    setWish(list.includes(movie.id));
  }, [movie.id]);

  const toggleWish = () => {
    let list = getWishlist();
    list = wish ? list.filter((id) => id !== movie.id) : [...list, movie.id];
    saveWishlist(list);
    setWish(!wish);
  };

  return (
    <div className="container-fluid moviee px-5 py-3">
      <div className="row mb-5">
        <div className="col-12 col-md-6 col-lg-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="img-fluid rounded rounded-5"
          />
        </div>
        <div className="col-12 col-md-6 col-lg-8 d-flex flex-column justify-content-between  pt-4 pb-3 ps-4">
          <div className=" d-flex justify-content-between align-items-start">
            <div>
              <h2>{movie.title}</h2>
              <p className="date">
                {new Date(movie.release_date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>
                {[...Array(4)].map((e, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={fullStar}
                    className="star fullStar "
                  />
                ))}
                <FontAwesomeIcon icon={emptyStar} className="star emptyStar " />
                &nbsp; {movie.vote_average}
              </p>
            </div>
            <div>
              <button
                onClick={toggleWish}
                className="bg-transparent border-0 p-0"
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  className={`heart-icon ${wish ? "active" : ""}`}
                />
              </button>
            </div>
          </div>
          <p className="overview">{movie.overview}</p>
          <div className="d-flex gap-3">
            <span className="movie-badge ">Action</span>
            <span className="movie-badge ">Crime</span>
            <span className="movie-badge">Thriller</span>
          </div>
          <div className=" d-flex gap-5 ">
            <p>
              <span className="duration me-3">Duration:</span>{" "}
              {movie.vote_count} Min.
            </p>
            <p>
              <span className="duration me-3">Languages:</span> English
            </p>
          </div>
          <Image
            src="/assets/marvel.png"
            alt="Marvel Logo"
            width={200}
            height={50}
          />

          <div className=" pt-3">
            <a href="#" className="redirect-btn">
              Website{" "}
              <FontAwesomeIcon icon={faLink} style={{ color: "gray" }} />
            </a>
          </div>
        </div>
      </div>

      <hr />

      {/* Recommendations */}
      <h2 className="mb-4 ms-3 py-3">Recommendations</h2>
      <div className="row">
        {recommendations
          .filter((movie) => movie.poster_path)
          .slice(0, 6)
          .map((movie) => (
            <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <MovieCard movie={movie} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default MovieDetails;
