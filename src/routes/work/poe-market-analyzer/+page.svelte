<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // State management for showcase display (placeholder for future implementation)
  let activeImageStep = $state(0);
  
  // Placeholder image steps (to be filled in later)
  const imageSteps = [
    { title: 'Market Analysis', image: 'placeholder__image.png' },
    { title: 'Data Processing', image: 'placeholder__image2.png' },
    { title: 'Report Generation', image: 'placeholder__image3.png' }
  ];
  
  function previousImage() {
    activeImageStep = activeImageStep > 0 ? activeImageStep - 1 : imageSteps.length - 1;
  }

  function nextImage() {
    activeImageStep = activeImageStep < imageSteps.length - 1 ? activeImageStep + 1 : 0;
  }
  
  // Derived reactive value
  const currentImageStep = $derived(imageSteps[activeImageStep]);
</script>

<svelte:head>
  <title>Path of Exile Market Analyzer - Joshua McDonald</title>
</svelte:head>

<div class="flex flex-col min-h-screen w-full bg-[#FFFFFF] overflow-x-hidden">
  <header class="w-full bg-[#111111] flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <!-- Hero Section -->
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[80px] flex-grow">
      <section class="w-full max-w-[1440px] px-[5%] md:px-[180px]">
        <!-- Title and Description -->
        <div class="flex flex-col items-center gap-4 mb-[60px]">
          <h1 class="text-[#2D2D2D] text-[64px] font-inter font-bold tracking-[-1.28px] text-center leading-tight">
            Path of Exile Market Analyzer
          </h1>
          <p class="text-[#2D2D2D] text-lg font-inter text-center max-w-[650px]">
            In progress development of companion web app for the game Path of Exile. Uses Svelte, Supabase, Python, and Rust to generate customized newsletters showing specific market trends via pathofexile.com API calls using FastAPI PoE.
          </p>
        </div>

        <!-- Single Image Display -->
        <div class="w-full flex justify-center mb-16">
          <div class="w-full max-w-[580px]">
            <!-- Image Container -->
            <div class="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
              <div class="h-[400px] bg-[#FAFAFA] flex items-center justify-center">
                {#if currentImageStep}
                  <img src="/{currentImageStep.image}" alt="{currentImageStep.title}" class="max-w-full max-h-full object-contain" />
                {:else}
                  <div class="text-gray-400 text-sm">Image Loading...</div>
                {/if}
              </div>
              
              <!-- Navigation Footer -->
              <div class="h-[60px] bg-white border-t border-[#E5E7EB] flex items-center justify-between px-4">
                <button class="p-2 hover:bg-gray-50 rounded flex-shrink-0" onclick={previousImage} aria-label="Previous step">
                  <svg class="w-4 h-4 text-gray-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                <span class="text-sm font-medium text-[#2D2D2D] text-center flex-1 px-4">{currentImageStep?.title || 'Loading...'}</span>
                <button class="p-2 hover:bg-gray-50 rounded flex-shrink-0" onclick={nextImage} aria-label="Next step">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tech Stack Showcase -->
        <div class="w-full flex justify-center mt-16">
          <div class="grid py-[25px] px-[57px] bg-[#F3F4F6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] grid-cols-4 grid-rows-3 gap-x-4 gap-y-3">
            <!-- Title - positioned in grid -->
            <div class="text-[#2D2D2D] text-[26px] font-inter text-center font-semibold col-span-1 row-span-1">
              Technology Stack
            </div>
            
            <!-- Row 2 Tech Cards -->
            <!-- SvelteKit -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 pt-3 pb-3 pr-[114px] pl-4 bg-[#F9FAFB] rounded-lg col-start-1 row-start-2">
              <div>
                <img src="/tech-stack__sveltekit-icon.svg" alt="SvelteKit" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">SvelteKit</div>
            </div>
            
            <!-- Vercel -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[135px] pl-[9px] bg-[#F9FAFB] rounded-lg col-start-2 row-start-2">
              <div>
                <img src="/tech-stack__vercel-icon.svg" alt="Vercel" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Vercel</div>
            </div>
            
            <!-- Python -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3.5 pr-[128px] pl-[15px] bg-[#F9FAFB] rounded-lg col-start-3 row-start-2">
              <div>
                <img src="/tech-stack__python-icon.svg" alt="Python" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Python</div>
            </div>
            
            <!-- Supabase -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 pt-3 pb-3 pr-[107px] pl-[11px] bg-[#F9FAFB] rounded-lg col-start-4 row-start-2">
              <div>
                <img src="/tech-stack__supabase-icon.svg" alt="Supabase" class="w-[31px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Supabase</div>
            </div>
            
            <!-- Row 3 Tech Cards -->
            <!-- TypeScript -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[120px] pl-[17px] bg-[#F9FAFB] rounded-lg col-start-1 row-start-3">
              <div>
                <img src="/tech-stack__typescript-icon.svg" alt="TypeScript" class="w-[29px] h-[29px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">TypeScript</div>
            </div>
            
            <!-- FastAPI -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[124px] pl-[13px] bg-[#F9FAFB] rounded-lg col-start-2 row-start-3">
              <div>
                <img src="/tech-stack__fastapi-icon.svg" alt="FastAPI" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">FastAPI</div>
            </div>
            
            <!-- Tauri -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[148px] pl-[11px] bg-[#F9FAFB] rounded-lg col-start-4 row-start-3">
              <div>
                <img src="/tech-stack__tauri-icon.svg" alt="Tauri" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Tauri</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>