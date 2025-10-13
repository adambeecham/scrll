import { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";

export default function useLenis() {

	const lenisRef = useRef(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {

		const isMobile = /Mobi|Android/i.test(navigator.userAgent);

		const lenis = new Lenis({
			duration: 2,
			smooth: true,
			infinite: !isMobile,
		});

		lenisRef.current = lenis;

		setReady(true);

		function raf(time) {
			lenis.raf(time);
			requestAnimationFrame(raf);
		}
		requestAnimationFrame(raf);

		return () => lenis.destroy();

	}, []);

	return { lenisRef, ready };
}