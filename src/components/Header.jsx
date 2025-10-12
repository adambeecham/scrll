import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Logo from "../assets/brand.svg?react";
import useLenis from "../hooks/useLenis";
import "./Header.scss";

export default function Header() {
	const logoRef = useRef(null);
	const { lenisRef, ready } = useLenis();

	useEffect(() => {
		if (!logoRef.current) return;

		logoRef.current.style.opacity = 1

		let chars = logoRef.current.querySelectorAll('[data-el="character"]'),
			circle = logoRef.current.querySelector('[data-el="circle"]');

		let tl = gsap.timeline()

		tl.fromTo(circle, {
			opacity: 1,
		}, {
			opacity: 0,
			duration: 0.5,
		}, 1.25);

		tl.fromTo(circle, {
			opacity: 0,
		}, {
			opacity: 1,
			duration: 1,
		}, 0);

		tl.fromTo(circle, {
			strokeDashoffset: 100,
		}, {
			strokeDashoffset: 0,
			duration: 1.5,
			ease: 'power2.inOut',
		}, 0);

		tl.fromTo(chars, {
			yPercent: 100,
			xPercent: 50,
		}, {
			delay: 0.2,
			yPercent: 0,
			xPercent: 0,
			stagger: 0.15,
			duration: 0.75,
			ease: "power2.out",
		}, 1);

	}, []);

	useEffect(() => {

		if (!ready || !logoRef.current) return;

		const lenis = lenisRef.current;
		let currentRotation = 0;

		const onScroll = () => {
			currentRotation += lenis.velocity * 0.005;

			gsap.to(logoRef.current, {
				rotation: currentRotation,
				duration: 0.1,
				ease: "none",
			});
		};

		lenis.on("scroll", onScroll);

		return () => {
			lenis.off("scroll", onScroll);
		};
	}, [ready]);

	return (
		<header>
			<div className="inner">
				<Logo className="brand" ref={logoRef} />
			</div>
		</header>
	);
}