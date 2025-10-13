// /api/posts.js
export default async function handler(req, res) {
	const API_URL = "https://frontendtest.pleasecheck.me/wp-json/wp/v2/posts?_embed";

	try {
		const wpRes = await fetch(API_URL);
		if (!wpRes.ok) {
			return res.status(wpRes.status).json({ error: "Failed to fetch from WordPress" });
		}

		const data = await wpRes.json();
		return res.status(200).json(data);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
}