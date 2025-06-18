"use client";

import WishlistCard from "@/components/WishlistCard";
import { getWishlist } from "@/utils/localWishlist";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "@/lib/tmdb";
import Link from "next/link";
import heartImage from "@/assets/heart.png";
import Image from "next/image";

export default function Wishlist() {
  const [movies, setMovies] = useState([]);

  const fetchAll = async () => {
    const ids = getWishlist();
    try {
      const results = await Promise.all(
        ids.map(async (id) => {
          const { details } = await fetchMovieDetails(id);
          return details;
        })
      );
      setMovies(results);
    } catch (error) {
      console.error("Failed to fetch wishlist movies:", error);
    }
  };

  useEffect(() => {
    fetchAll();

    window.addEventListener("wishlistUpdated", fetchAll);
    return () => window.removeEventListener("wishlistUpdated", fetchAll);
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">Watch list</h2>

      {movies.length === 0 ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: "70vh" }}
        >
          <div>
            <Image
              src={heartImage}
              alt="Heart Icon"
              width={200}
              height={200}
              style={{ filter: "grayscale(70%) opacity(100%)" }}
            />
          </div>
          <p className="mt-3 fs-4">No Movies in watch list</p>
          <Link href="/">
            <button
              className="btn mt-3 px-4 py-2 w-100"
              style={{ backgroundColor: "#FFE353" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#FDD835")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#FFE353")
              }
            >
              Back to home
            </button>
          </Link>
        </div>
      ) : (
        <div className="row g-3">
          {movies.map((movie) => (
            <div className="col-md-6" key={movie.id}>
              <WishlistCard movie={movie} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
