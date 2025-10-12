export default async function handler(req, res) {
	try {
		const response = await fetch("https://frontendtest.pleasecheck.me/wp-json/wp/v2/posts?_embed");
		if (!response.ok) {
			return res.status(response.status).json({ error: "Failed to fetch posts" });
		}
		const data = await response.json();
		res.status(200).json(data);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}