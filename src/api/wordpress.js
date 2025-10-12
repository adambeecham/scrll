const API_BASE = import.meta.env.PROD ? "https://frontendtest.pleasecheck.me" : "";

const API_URL = `${API_BASE}/wp-json/wp/v2`;

export async function getPosts() {
	const res = await fetch(`${API_URL}/posts?_embed`);
	if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
	return res.json();
}

export async function getPost(slug) {
	const res = await fetch(`${API_URL}/posts?slug=${slug}&_embed`);
	if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
	const data = await res.json();
	return data[0];
}