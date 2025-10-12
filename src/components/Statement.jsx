import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Statement.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Statement({ post, index, velocity = 0, ...rest }) {
	const el = useRef(null);

	useEffect(() => {
		if (!el.current) return;

		el.current.style.opacity = 1

		let juis = gsap.fromTo(el.current, {
			yPercent: 102,
		}, {
			yPercent: 0,
			duration: 1,
			delay: 1,
		});

	}, []);

	useLayoutEffect(() => {
		if (!el.current) return;

		const direction = index % 2 === 0 ? 1 : -1;

		const ctx = gsap.context(() => {
			gsap.fromTo(el.current, {
				x: window.innerWidth * 0.5 * direction
			}, {
				x: window.innerWidth * 0.5 * direction * -1,
				ease: "none",
				scrollTrigger: {
					trigger: el.current.parentElement.parentElement,
					start: "-180% bottom",
					end: "180% top",
					scrub: true,
					// markers: true,
				},
			});
		}, el);

		return () => ctx.revert();
	}, [index]);

	return (
		<div className="statement" data-index={index} {...rest}>
			<div className="translate">
				<div className="rotate">
					<span
						ref={el}
						data-index={index}
						dangerouslySetInnerHTML={{
							__html: post.title.rendered.replace(/\uFFFC/g, "").trim(),
						}}
					/>
				</div>
			</div>
		</div>
	);
}