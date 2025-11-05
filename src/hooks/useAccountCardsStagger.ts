import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { RefObject } from "react";

export const useAccountCardsStagger = (
	containerRef: RefObject<HTMLElement>
) => {
	useGSAP(
		() => {
			// const cards = containerRef.current?.querySelectorAll(".account-card");
			const allCards = containerRef.current?.querySelectorAll(".account-card");

			if (!allCards || allCards.length === 0) return;

			// Uzmi sve osim prvog iz NodeList-a
			const cards = Array.from(allCards).slice(1);

			// Prvo odmah postavi poziciju
			gsap.set(cards, {
				yPercent: -100,
				y: -32,
			});

			// Pa onda animiraj
			gsap.to(cards, {
				y: 0,
				yPercent: 0,
				duration: 0.8,
				ease: "power2.out",
				stagger: -0.2,
			});
		},
		{ scope: containerRef }
	);
};
