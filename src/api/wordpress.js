const API_URL = "/api";

export async function getPosts() {
	const res = await fetch(`${API_URL}/posts`);
	if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
	return res.json();
}