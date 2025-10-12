import { useEffect, useState, useRef } from "react";
import useLenis from "../hooks/useLenis";
import { getPosts } from "../api/wordpress";
import Statement from "./Statement";
import "./Statements.scss";

export default function Statements() {

	const { lenisRef, ready } = useLenis();

	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [velocity, setVelocity] = useState(0);

	useEffect(() => {

		if (!ready) return;

		const lenis = lenisRef.current;

		const onScroll = ({ velocity }) => {
			setVelocity(velocity);
		};

		lenis.on("scroll", onScroll);

		return () => lenis.off("scroll", onScroll);

	}, [ready]);

	useEffect(() => {

		getPosts().then(setPosts).finally(() => setLoading(false));

	}, []);

	if (loading) return <p>Loading posts...</p>;
	if (!posts.length) return <p>No posts found.</p>;

	const groups = Array.from({ length: 2 }, (_, groupIdx) => (
		<div key={`group-${groupIdx}`} className="statements-group">
			{posts.map((post, idx) => (
				<Statement
					key={`${post.id}-${idx}-${groupIdx}`}
					post={post}
					index={idx}
					groupIndex={groupIdx}
					velocity={velocity}
				/>
			))}
		</div>
	));

	return (
		<div>
			{groups}
		</div>
	);
}