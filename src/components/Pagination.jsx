"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function AppPagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = searchParams.get("query");
  const makePageLink = (p) =>
    router.push(`/?page=${p}${searchText ? `&query=${searchText}` : ""}`);

  const renderPages = () => {
    const items = [];

    // Show up to 5 pages only
    for (let p = 1; p <= Math.min(totalPages, 5); p++) {
      items.push(
        <li
          key={p}
          className={p === currentPage ? "active" : ""}
          onClick={() => makePageLink(p)}
        >
          {p}
        </li>
      );
    }

    // Add ellipsis if there are more pages
    if (totalPages > 5) {
      items.push(
        <li key="dots" className="dots">
          ....
        </li>
      );
    }

    return items;
  };

  return (
    <ul className="custom-pagination">
      <li
        className="arrow"
        onClick={() => currentPage > 1 && makePageLink(currentPage - 1)}
      >
        &lt;
      </li>
      {renderPages()}
      <li
        className="arrow"
        onClick={() =>
          currentPage < totalPages && makePageLink(currentPage + 1)
        }
      >
        &gt;
      </li>
    </ul>
  );
}
