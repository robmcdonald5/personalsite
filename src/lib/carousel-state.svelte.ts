export interface CarouselItem {
	id: string;
	title: string;
	language: string;
	projectTitle: string;
	projectLink?: string;
	description?: string;
	code: string;
}

export class CarouselState {
	currentIndex = $state<number>(0);
	items = $state<CarouselItem[]>([]);
	isAutoPlaying = $state<boolean>(true);
	isPaused = $state<boolean>(false);
	isTransitioning = $state<boolean>(false);
	touchStartX = $state<number | null>(null);
	touchStartTime = $state<number | null>(null);

	activeItem = $derived(this.items[this.currentIndex] || null);
	hasNext = $derived(this.currentIndex < this.items.length - 1);
	hasPrev = $derived(this.currentIndex > 0);
	totalSlides = $derived(this.items.length);

	next() {
		if (this.isTransitioning) return;

		this.isTransitioning = true;
		if (this.currentIndex < this.items.length - 1) {
			this.currentIndex++;
		} else {
			this.currentIndex = 0;
		}
		setTimeout(() => this.isTransitioning = false, 300);
	}

	prev() {
		if (this.isTransitioning) return;

		this.isTransitioning = true;
		if (this.currentIndex > 0) {
			this.currentIndex--;
		} else {
			this.currentIndex = this.items.length - 1;
		}
		setTimeout(() => this.isTransitioning = false, 300);
	}

	goTo(index: number) {
		if (this.isTransitioning) return;

		if (index >= 0 && index < this.items.length && index !== this.currentIndex) {
			this.isTransitioning = true;
			this.currentIndex = index;
			setTimeout(() => this.isTransitioning = false, 300);
		}
	}

	pause() {
		this.isPaused = true;
	}

	resume() {
		this.isPaused = false;
	}

	startAutoPlay() {
		this.isAutoPlaying = true;
		this.isPaused = false;
	}

	stopAutoPlay() {
		this.isAutoPlaying = false;
		this.isPaused = false;
	}

	handleTouchStart(x: number) {
		this.touchStartX = x;
		this.touchStartTime = Date.now();
		this.pause();
	}

	handleTouchMove(currentX: number): number {
		if (this.touchStartX === null) return 0;
		return currentX - this.touchStartX;
	}

	handleTouchEnd(endX: number) {
		if (this.touchStartX === null || this.touchStartTime === null) {
			this.resume();
			return;
		}

		const deltaX = endX - this.touchStartX;
		const deltaTime = Date.now() - this.touchStartTime;
		const velocity = Math.abs(deltaX) / deltaTime;

		const swipeThreshold = 50;
		const velocityThreshold = 0.2;

		if (Math.abs(deltaX) > swipeThreshold || velocity > velocityThreshold) {
			if (deltaX > 0) {
				this.prev();
			} else {
				this.next();
			}
		}

		this.touchStartX = null;
		this.touchStartTime = null;
		this.resume();
	}

	handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowLeft':
				event.preventDefault();
				this.prev();
				break;
			case 'ArrowRight':
				event.preventDefault();
				this.next();
				break;
			case 'Home':
				event.preventDefault();
				this.goTo(0);
				break;
			case 'End':
				event.preventDefault();
				this.goTo(this.totalSlides - 1);
				break;
			case ' ':
				event.preventDefault();
				this.isAutoPlaying ? this.stopAutoPlay() : this.startAutoPlay();
				break;
		}
	}
}