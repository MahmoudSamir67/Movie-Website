export function getWishlist() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("wishlist");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveWishlist(list) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("wishlist", JSON.stringify(list));
    window.dispatchEvent(new Event("wishlistUpdated"));
  } catch {}
}
