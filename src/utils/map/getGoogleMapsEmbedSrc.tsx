export function getGoogleMapsEmbedSrc(input: string) {
  if (!input) return "";

  try {
    // If user pastes a full Google Maps URL
    if (input.includes("google.com/maps")) {
      const decoded = decodeURIComponent(input);

      // 1️⃣ Try to extract @lat,lng
      const match = decoded.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) {
        return `https://www.google.com/maps?q=${match[1]},${match[2]}&output=embed`;
      }

      // 2️⃣ Fallback: extract place name from /place/
      const placeMatch = decoded.match(/\/place\/([^/]+)/);
      if (placeMatch) {
        const place = placeMatch[1].replace(/\+/g, " ");
        return `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`;
      }
    }

    // 3️⃣ Plain text address
    return `https://www.google.com/maps?q=${encodeURIComponent(input)}&output=embed`;
  } catch {
    return "";
  }
}
