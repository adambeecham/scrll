import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import MouseFollower from "mouse-follower";
import "./MouseFollower.scss";

export default function CursorFollower() {

	const cursorRef = useRef(null);
	const followerRef = useRef(null);

	useEffect(() => {

		if (!window.gsap) window.gsap = gsap;

		const cursor = new MouseFollower({
			el: cursorRef.current,
			speed: 0.1,
			ease: "none",
			visibleTimeout: 300,
		});

		const follower = new MouseFollower({
			el: followerRef.current,
			speed: 0.8,
			ease: "power2.out",
			visibleTimeout: 300,
		});

		const brand = document.querySelector('.brand');

		brand.addEventListener('mouseenter', () => {
			follower.addState('grow');
			follower.setStick(brand);
		});

		brand.addEventListener('mouseleave', () => {
			follower.removeState('grow')
			follower.removeStick();
		});

		return () => {
			// stop animation and listeners, but do NOT destroy the element
			if (follower.stop) follower.stop();
		};
	}, []);

	return (
		<div>
			<div className="mouse cursor" ref={cursorRef}></div>
			<div className="mouse follower" ref={followerRef}></div>
		</div>
	);
}