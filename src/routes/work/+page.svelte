<script lang="ts">
	import Header from '$lib/Header.svelte';
	import Footer from '$lib/Footer.svelte';
	import { fly } from 'svelte/transition';

	// Project data
	const allProjects = [
		{
			id: 'ai-menu-chatbot',
			name: 'Chipotle AI Menu',
			href: '/work/ai-menu-chatbot',
			categories: ['Chatbots', 'Websites', 'Python', 'Database', 'Machine Learning', 'NLP', 'Scripting', 'JavaScript', 'MongoDB'],
			imageQuery: 'AI chatbot interface with menu items',
			previewImage: '/project-previews/ai-menu-chatbot.png'
		},
		{
			id: 'poe-market-analyzer',
			name: 'PoE Market Analyzer',
			href: '/work/poe-market-analyzer',
			categories: ['Websites', 'Python', 'Database', 'Machine Learning', 'Automation', 'Scripting', 'JavaScript', 'TypeScript', 'Rust', 'FastAPI'],
			imageQuery: 'Market analysis dashboard with charts',
			previewImage: '/project-previews/poe-market-analyzer.png'
		},
		{
			id: 'ecommerce-price-tracker',
			name: 'E-Commerce Price Tracker',
			href: '/work/ecommerce-price-tracker',
			categories: ['Python', 'Database', 'Machine Learning', 'Automation', 'Scripting', 'TypeScript', 'Postgres'],
			imageQuery: 'E-commerce price tracking interface',
			previewImage: '/project-previews/ecommerce-price-tracker.png'
		},
		{
			id: 'creative-writing-assistant',
			name: 'Creative Writing AI Assistant',
			href: '/work/creative-writing-assistant',
			categories: ['Chatbots', 'Websites', 'Python', 'Database', 'Machine Learning', 'NLP', 'JavaScript', 'TypeScript', 'Postgres', 'FastAPI', 'Agentic'],
			imageQuery: 'AI writing assistant interface',
			previewImage: '/project-previews/creative-writing-assistant.png'
		},
		{
			id: 'portfolio-site',
			name: 'Personal Site',
			href: '/work/portfolio-site',
			categories: ['Websites', 'JavaScript', 'TypeScript', 'Rust'],
			imageQuery: 'Personal portfolio website design',
			previewImage: '/project-previews/portfolio-site.png'
		},
		{
			id: 'dune-spice-wars-wiki',
			name: 'Dune Spice Wars Interactive Wiki',
			href: '/work/dune-spice-wars-wiki',
			categories: ['Websites', 'JavaScript'],
			imageQuery: 'Interactive wiki interface with game data',
			previewImage: '/project-previews/dune-spice-wars-wiki.png'
		}
	];

	const allCategories = [
		['All', 'Chatbots', 'Websites', 'Python', 'Database', 'Machine Learning', 'NLP'],
		['Automation', 'Scripting', 'JavaScript', 'TypeScript', 'Rust', 'MongoDB', 'Postgres', 'FastAPI', 'Agentic']
	];

	let activeCategory = 'All';

	// Reactive statement for filtered projects
	$: filteredProjects = activeCategory === 'All' 
		? allProjects 
		: allProjects.filter(project => project.categories.includes(activeCategory));

	function selectCategory(category: string) {
		activeCategory = category;
	}

	function handleImageError(event: Event) {
		const target = event.target as HTMLImageElement;
		target.style.display = 'none';
		if (target.nextElementSibling) {
			(target.nextElementSibling as HTMLElement).style.display = 'flex';
		}
	}
</script>

<svelte:head>
	<title>Work - Joshua McDonald</title>
	<meta name="description" content="Explore snippets of the work I've done over my development career." />
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">
	<header class="w-full bg-[#111111] flex justify-center">
		<Header />
	</header>

	<main class="flex-grow flex flex-col">
		<!-- Hero Section -->
		<div class="w-full bg-[#FFFFFF] flex justify-center py-[40px] lg:py-[80px]">
			<section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
				<div class="flex flex-col items-center gap-4 mb-[40px] lg:mb-[60px]">
					<h1 class="text-[#2D2D2D] text-[36px] lg:text-[64px] font-inter font-bold tracking-[-1.28px] text-center leading-tight">
						My Work
					</h1>
					<p class="text-[#2D2D2D] text-base lg:text-lg font-inter text-center max-w-[600px] px-4">
						A curated collection of my projects. From web applications to machine learning models, here's what I've been building.
					</p>
				</div>
			</section>
		</div>

		<div class="w-full h-[4px] gradient-divider"></div>

		<!-- Projects Section -->
		<div class="w-full bg-[#FAFAFA] flex justify-center flex-grow py-[40px] lg:py-[80px]">
			<section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
				<!-- Filter Navigation -->
				<div class="flex justify-center mb-[40px] lg:mb-[60px]">
					<div class="flex flex-col gap-3 max-w-full">
						{#each allCategories as categoryRow}
							<div class="flex justify-center gap-2 overflow-x-auto scrollbar-hide">
								{#each categoryRow as category}
									<button
										class="px-4 py-2 rounded-full font-inter font-medium text-sm whitespace-nowrap transition-all duration-200 {activeCategory === category 
											? 'bg-[#4A90E2] text-[#FFFFFF] shadow-lg' 
											: 'bg-[#FFFFFF] text-[#2D2D2D] border border-[#EAEAEA] hover:bg-[#F0F0F0] hover:border-[#4A90E2]'}"
										onclick={() => selectCategory(category)}
									>
										{category}
									</button>
								{/each}
							</div>
						{/each}
					</div>
				</div>

				<!-- Projects Grid -->
				<div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 mb-[40px] lg:mb-[60px]">
					{#each filteredProjects as project, i (project.id)}
						<div in:fly={{ y: 20, duration: 400, delay: i * 50 }} out:fly={{ y: -10, duration: 200 }}>
							<a
								href={project.href}
								class="group block bg-[#FFFFFF] border border-[#EAEAEA] rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-[#4A90E2]"
							>
								<div class="aspect-video overflow-hidden bg-[#F8F9FA]">
									<img
										src={project.previewImage}
										alt={project.name}
										class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										onerror={handleImageError}
									/>
									<div class="w-full h-full bg-[#F8F9FA] flex items-center justify-center text-[#666666] font-inter text-sm" style="display: none;">
										{project.imageQuery}
									</div>
								</div>
								<div class="p-6">
									<div class="flex flex-wrap gap-2">
										{#each project.categories.slice(0, 3) as cat}
											<span class="px-3 py-1 bg-[#F0F0F0] text-[#666666] text-sm font-inter rounded-full">
												{cat}
											</span>
										{/each}
										{#if project.categories.length > 3}
											<span class="px-3 py-1 bg-[#F0F0F0] text-[#666666] text-sm font-inter rounded-full">
												+{project.categories.length - 3}
											</span>
										{/if}
									</div>
								</div>
							</a>
						</div>
					{/each}
				</div>

				{#if filteredProjects.length === 0}
					<div class="text-center py-16">
						<p class="text-[#666666] font-inter text-lg">No projects found in this category.</p>
					</div>
				{/if}
			</section>
		</div>

		<div class="w-full h-[4px] gradient-divider"></div>
	</main>

	<footer class="w-full bg-[#F5F5F5] flex justify-center">
		<Footer />
	</footer>
</div>