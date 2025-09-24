<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import CodeBlock from './CodeBlock.svelte';
	import { codeSnippets } from './code-snippets.js';

	let carouselElement: HTMLElement;
	let trackElement: HTMLElement;
	let autoPlayTimer: number | null = null;
	let prefersReducedMotion = $state(false);
	let touchStartX = $state<number | null>(null);
	let touchOffset = $state(0);

	const autoPlayInterval = 10000;
	const originalItems = codeSnippets;

	// Create infinite array with enough duplicates
	const items = [...originalItems, ...originalItems, ...originalItems];
	let currentIndex = $state(originalItems.length); // Start in middle set
	let isTransitioning = $state(true);

	let slideWidth = $state(320);
	let slideGap = $state(24);

	function next() {
		isTransitioning = true;
		currentIndex++;

		// After transition completes, check if we need to reset
		setTimeout(() => {
			if (currentIndex >= originalItems.length * 2) {
				// Instantly reset to equivalent position in first set without transition
				isTransitioning = false;
				currentIndex = currentIndex - originalItems.length;
				// Force reflow to ensure instant position change
				if (trackElement) {
					trackElement.offsetHeight;
				}
				// Re-enable transitions after position reset
				setTimeout(() => {
					isTransitioning = true;
				}, 10);
			}
		}, 400);
	}

	function prev() {
		isTransitioning = true;
		currentIndex--;

		// After transition completes, check if we need to reset
		setTimeout(() => {
			if (currentIndex < originalItems.length) {
				// Instantly reset to equivalent position in last set without transition
				isTransitioning = false;
				currentIndex = currentIndex + originalItems.length;
				// Force reflow to ensure instant position change
				if (trackElement) {
					trackElement.offsetHeight;
				}
				// Re-enable transitions after position reset
				setTimeout(() => {
					isTransitioning = true;
				}, 10);
			}
		}, 400);
	}

	function startAutoPlay() {
		if (prefersReducedMotion) return;
		stopAutoPlay();
		autoPlayTimer = window.setInterval(() => {
			next();
		}, autoPlayInterval);
	}

	function stopAutoPlay() {
		if (autoPlayTimer) {
			clearInterval(autoPlayTimer);
			autoPlayTimer = null;
		}
	}

	function handleMouseEnter() {
		stopAutoPlay();
	}

	function handleMouseLeave() {
		startAutoPlay();
	}

	function handleFocus() {
		stopAutoPlay();
	}

	function handleBlur() {
		startAutoPlay();
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				prev();
				break;
			case 'ArrowRight':
				event.preventDefault();
				next();
				break;
		}
	}

	function handleTouchStart(event: TouchEvent) {
		touchStartX = event.touches[0].clientX;
		stopAutoPlay();
	}

	function handleTouchMove(event: TouchEvent) {
		event.preventDefault();
		if (touchStartX === null) return;
		touchOffset = event.touches[0].clientX - touchStartX;
	}

	function handleTouchEnd(event: TouchEvent) {
		if (touchStartX === null) {
			startAutoPlay();
			return;
		}

		const deltaX = event.changedTouches[0].clientX - touchStartX;
		const swipeThreshold = 50;

		if (Math.abs(deltaX) > swipeThreshold) {
			if (deltaX > 0) {
				prev();
			} else {
				next();
			}
		}

		touchStartX = null;
		touchOffset = 0;
		startAutoPlay();
	}

	onMount(() => {
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			prefersReducedMotion = e.matches;
			if (e.matches) {
				stopAutoPlay();
			}
		});

		// Enable transitions after initial mount
		setTimeout(() => {
			isTransitioning = true;
		}, 100);

		if (!prefersReducedMotion) {
			startAutoPlay();
		}

		return () => {
			stopAutoPlay();
		};
	});

	onDestroy(() => {
		stopAutoPlay();
	});

	$effect(() => {
		if (typeof window !== 'undefined') {
			const updateDimensions = () => {
				if (window.innerWidth >= 1024) {
					slideWidth = 280;
					slideGap = 120;
				} else {
					slideWidth = 320;
					slideGap = 24;
				}
			};
			updateDimensions();
			window.addEventListener('resize', updateDimensions);
			return () => window.removeEventListener('resize', updateDimensions);
		}
	});
</script>

<div
	class="carousel-container relative w-full px-20 lg:px-24"
	bind:this={carouselElement}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	onfocus={handleFocus}
	onblur={handleBlur}
	onkeydown={handleKeydown}
	ontouchstart={handleTouchStart}
	ontouchmove={handleTouchMove}
	ontouchend={handleTouchEnd}
	role="region"
	aria-label="Code samples carousel"
	aria-roledescription="carousel"
	aria-live="polite"
	tabindex="0"
>

	<div class="carousel-wrapper w-full flex justify-center">
		<div class="carousel-viewport relative overflow-visible lg:overflow-hidden w-full max-w-[320px] lg:max-w-[1080px]">
			<div
				bind:this={trackElement}
				class="carousel-track flex gap-6 lg:gap-[120px]"
				class:transition-transform={isTransitioning}
				class:duration-[400ms]={isTransitioning}
				class:ease-out={isTransitioning}
				style="transform: translateX(calc({-currentIndex * (slideWidth + slideGap)}px + {touchOffset}px))"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				{#each items as snippet, i (i)}
					<div class="carousel-slide flex-shrink-0">
						<CodeBlock {snippet} />
					</div>
				{/each}
			</div>
		</div>
	</div>

	<button
		onclick={() => prev()}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		class="carousel-nav prev absolute left-4 lg:left-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-800/60 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-gray-900/50 z-10 group"
		aria-label="Previous slide"
	>
		<svg class="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
		</svg>
	</button>

	<button
		onclick={() => next()}
		onmouseenter={handleMouseEnter}
		onmouseleave={handleMouseLeave}
		class="carousel-nav next absolute right-4 lg:right-4 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gray-800/60 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-gray-900/50 z-10 group"
		aria-label="Next slide"
	>
		<svg class="w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
		</svg>
	</button>

</div>

<style>
	.carousel-container {
		touch-action: pan-y pinch-zoom;
	}

	.carousel-container:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
	}

	.carousel-container:focus-visible {
		outline: 2px solid #60a5fa;
		border-radius: 0.5rem;
	}

	.carousel-track {
		will-change: transform;
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-track {
			transition: none !important;
		}
	}

	.carousel-nav {
		touch-action: manipulation;
	}
</style>