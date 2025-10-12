import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPost } from "../api/wordpress";

export default function Post() {
	const { slug } = useParams();
	const [post, setPost] = useState(null);

	useEffect(() => {
		getPost(slug).then(setPost);
	}, [slug]);

	if (!post) return <p>Loading...</p>;

	return (
		<article className="p-6 max-w-3xl mx-auto">
			<h1
				className="text-3xl font-bold mb-4"
				dangerouslySetInnerHTML={{ __html: post.title.rendered }}
			/>
			<div
				className="prose"
				dangerouslySetInnerHTML={{ __html: post.content.rendered }}
			/>
		</article>
	);
}