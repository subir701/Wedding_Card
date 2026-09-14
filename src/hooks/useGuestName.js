import { useEffect, useState } from "react";

/**
 * Reads the `?guest=Name` query param so the invitation can be personalized.
 * Returns null if not present so callers can show the generic "Dear Guest" copy.
 */
export default function useGuestName() {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("guest");
    if (name) setGuest(decodeURIComponent(name));
  }, []);

  return guest;
}
