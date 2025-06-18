"use client";

import { useEffect, useState } from "react";
import { getWishlist, saveWishlist } from "../utils/localWishlist";
import { useRouter } from "next/navigation";

export default function MovieCard({ movie, onWishToggle }) {
  const router = useRouter();
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
  if (onWishToggle) {
    onWishToggle();
  }

  const score = Math.round(movie.vote_average * 10);
  let color;

  if (score >= 75) color = "#00ff00"; // Green
  else if (score >= 50) color = "#ffc107"; // Yellow
  else color = "#ff4444"; // Red

  return (
    <div className="movie-card">
      <div className="poster-wrapper" style={{ position: "relative" }}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="poster"
        />
        <button
          className="more-btn newest"
          onClick={() => router.push(`/movies/${movie.id}`)}
        >
          ⋯<div className="tooltip">Read more</div>
        </button>

        <div
          className="rating-wrapper"
          style={{
            "--circle-color": color,
            "--circle-percent": `${score}%`,
          }}
        >
          <div className="rating-badge">{score}%</div>
        </div>
      </div>

      <div className="card-info">
        <div>
          <h6 className="title">{movie.title}</h6>
          <span className="date">
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
        <button className="wish-btn" onClick={toggleWish}>
          <span style={{ color: wish ? "#ffe353" : "#ddd" }}>♥</span>
        </button>
      </div>
    </div>
  );
}
