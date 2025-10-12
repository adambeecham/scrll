const API_URL = "/wp-json/wp/v2";

export async function getPosts() {
  const res = await fetch(`${API_URL}/posts?_embed`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function getPost(slug) {
  const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  return data[0];
}