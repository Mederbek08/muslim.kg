const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchData() {
  const res = await fetch(`${apiUrl}/data?key=${apiKey}`);
  const data = await res.json();
  return data;
}
