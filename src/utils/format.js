/* Small formatting helper shared across pages/components. */

export const rupiah = (n) => "Rp " + Math.round(n).toLocaleString("id-ID");

/* ================================================================== */
/* SMALL HELPERS                                                       */
/* ================================================================== */

// Wraps a page so it always re-plays its entrance animation when mounted.
