import { useEffect, useState } from "react";
import { getWishlist, saveWishlist } from "@/utils/localWishlist";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function WishlistCard({ movie }) {
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

    const event = new Event("wishlistUpdated");
    window.dispatchEvent(event);
  };

  return (
    <div
      className="d-flex rounded-4 shadow-sm p-3 mb-3"
      style={{
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={100}
        height={140}
        className="rounded-3"
        style={{ objectFit: "cover", cursor: "pointer" }}
        onClick={() => router.push(`/movies/${movie.id}`)}
      />

      <div className="flex-grow-1 ps-3 d-flex flex-column justify-content-between">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="fw-bold mb-1">{movie.title}</h5>
            <small className="text-secondary">
              {new Date(movie.release_date).toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </small>
          </div>

          <button
            className="btn p-0 border-0"
            onClick={toggleWish}
            style={{ background: "none" }}
          >
            <span
              style={{ color: wish ? "#ffe353" : "#ddd", fontSize: "50px" }}
            >
              ♥
            </span>
          </button>
        </div>

        <div className="d-flex align-items-center mt-2">
          <span className="me-1">⭐</span>
          <span className="me-2">{movie.vote_average.toFixed(1)}</span>
          <small className="text-muted">({movie.vote_count})</small>
        </div>

        <p
          className="mt-2 mb-0 text-light-emphasis"
          style={{ fontSize: "14px" }}
        >
          {movie.overview.length > 120
            ? movie.overview.slice(0, 120) + "..."
            : movie.overview}
        </p>
      </div>
    </div>
  );
}
