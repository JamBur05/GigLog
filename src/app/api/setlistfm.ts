const API_BASE_URL = "https://api.setlist.fm/rest/1.0";
const API_KEY = process.env.SETLIST_FM_API_KEY!;
const USER_AGENT = process.env.USER_AGENT!;

export async function fetchSetlistsByArtist(artistName: string) {
  const url = `${API_BASE_URL}/search/setlists?artistName=${encodeURIComponent(
    artistName
  )}`;

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "x-api-key": API_KEY,
      "User-Agent": USER_AGENT,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch setlists: ${res.statusText}`);
  }

  const data = await res.json();

  return data.setlist || [];
}
