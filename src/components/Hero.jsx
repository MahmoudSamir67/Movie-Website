"use client";

// components/Hero.jsx
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero({ showOnlySearch = false }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get("query");
  const router = useRouter();
  const [query, setQuery] = useState(searchText || "");

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/?query=${query}`);
    }
  };

  return (
    <div
      className={` ${showOnlySearch ? "" : "backG"} p-5 mb-5 ${
        showOnlySearch ? "text-center" : ""
      }`}
    >
      {!showOnlySearch && (
        <>
          <h1 className="display-6 fw-bold headerrs">
            Welcome to our movie app
          </h1>
          <p className="text-dark mb-4 parag">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </>
      )}

      <div className="d-flex justify-content-center searchDiv">
        <input
          type="text"
          className="form-control form-control-lg me-2 searchInput"
          placeholder="Search and explore…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="btn btn-lg custom-search-btn searchBut"
        >
          Search
        </button>
      </div>

      {showOnlySearch && searchText && (
        <h5 className="mt-4 text-start">
          <span className="fw-bold">Search Results for:</span> {searchText}
        </h5>
      )}
    </div>
  );
}
