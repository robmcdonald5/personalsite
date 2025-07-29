<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // State management for showcase display (placeholder for future implementation)
  let activeImageStep = $state(0);
  
  // Image steps for PoE Market Analyzer showcase
  const imageSteps = [
    { title: 'poe-digest.com/market', image: 'landingpage__image.png' },
    { title: 'poe-digest.com/track', image: 'trackingpage__image.png' }
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
    <div class="w-full bg-[#FFFFFF] flex justify-center py-[40px] lg:py-[80px] flex-grow">
      <section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
        <!-- Title and Description -->
        <div class="flex flex-col items-center gap-3 mb-[40px] lg:mb-[60px]">
          <h1 class="text-[#2D2D2D] text-[28px] lg:text-[64px] font-inter font-bold tracking-[-1.28px] text-center leading-tight">
            Path of Exile Market Analyzer
          </h1>
          <p class="text-[#2D2D2D] text-sm lg:text-lg font-inter text-center max-w-[650px] px-4 lg:px-0">
            In progress development of companion web app for the game Path of Exile. Uses Svelte, Supabase, Python, and Rust to generate customized newsletters showing specific market trends via pathofexile.com API calls using FastAPI PoE.
          </p>
        </div>

        <!-- Single Image Display -->
        <div class="w-full flex justify-center mb-8 lg:mb-16 px-4 lg:px-0">
          <div class="w-full max-w-[850px] flex flex-col">
            <!-- Title Card Header -->
            <div class="w-full h-[20px] bg-[#2D2D2D] rounded-tl-md rounded-tr-md relative">
              <!-- Previous Button -->
              <button onclick={previousImage} aria-label="Previous step" class="absolute top-[2px] right-[56px] w-[16px] h-[16px] flex items-center justify-center">
                <svg class="w-3 h-3 text-white rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              <!-- Next Button -->
              <button onclick={nextImage} aria-label="Next step" class="absolute top-[2px] right-[24px] w-[16px] h-[16px] flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
              
              <!-- URL Display -->
              <div class="w-[60%] lg:w-[318px] h-[10px] flex justify-center items-center flex-row bg-[#1E1E1E] absolute top-[25%] bottom-[25%] left-[20%] lg:left-[31.25%] right-[20%] lg:right-[31.25%]">
                <div class="text-[#9CA3AF] text-[6px] lg:text-[8px] font-inter text-center">
                  {currentImageStep?.title || 'Loading...'}
                </div>
              </div>
            </div>
            
            <!-- Image Container -->
            <div class="w-full h-[300px] lg:h-[500px] flex justify-center items-center bg-[#1E1E1E] border-solid border-[#2D2D2D] border-b-[6px] border-x-[6px] rounded-br-md rounded-bl-md shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]">
              <div class="w-full h-full flex justify-center items-center p-2 lg:p-3">
                {#if currentImageStep}
                  <img 
                    src="/{currentImageStep.image}" 
                    alt="{currentImageStep.title}" 
                    class="max-w-full max-h-full object-contain"
                    onerror={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const errorDiv = e.currentTarget.nextElementSibling as HTMLElement;
                      if (errorDiv) errorDiv.style.display = 'block';
                    }}
                  />
                  <div class="text-gray-400 text-sm hidden">
                    Image not found: {currentImageStep.image}
                  </div>
                {:else}
                  <div class="text-gray-400 text-sm">Image Loading...</div>
                {/if}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tech Stack Showcase -->
        <div class="w-full flex justify-center mt-8 lg:mt-16 px-4 lg:px-0">
          <div class="grid py-[20px] lg:py-[25px] px-[20px] lg:px-[57px] bg-[#F3F4F6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] grid-cols-1 lg:grid-cols-4 grid-rows-auto lg:grid-rows-3 gap-x-2 lg:gap-x-4 gap-y-3">
            <!-- Title - positioned in grid -->
            <div class="text-[#2D2D2D] text-[20px] lg:text-[26px] font-inter text-center font-semibold col-span-1 lg:col-span-4 row-span-1 mb-2 lg:mb-0">
              Technology Stack
            </div>
            
            <!-- Row 2 Tech Cards -->
            <!-- SvelteKit -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 pt-3 pb-3 px-4 lg:pr-[114px] lg:pl-4 bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__sveltekit-icon.svg" alt="SvelteKit" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">SvelteKit</div>
            </div>
            
            <!-- Vercel -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[135px] lg:pl-[9px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__vercel-icon.svg" alt="Vercel" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Vercel</div>
            </div>
            
            <!-- Python -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3.5 px-4 lg:pr-[128px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__python-icon.svg" alt="Python" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Python</div>
            </div>
            
            <!-- Supabase -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 pt-3 pb-3 px-4 lg:pr-[107px] lg:pl-[11px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__supabase-icon.svg" alt="Supabase" class="w-[31px] h-[32px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Supabase</div>
            </div>
            
            <!-- Row 3 Tech Cards -->
            <!-- Rust -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[148px] lg:pl-[17px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__rust-icon.svg" alt="Rust" class="w-[29px] h-[29px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Rust</div>
            </div>
            
            <!-- FastAPI -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[124px] lg:pl-[13px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__fastapi-icon.svg" alt="FastAPI" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">FastAPI</div>
            </div>
            
            <!-- TypeScript -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[110px] lg:pl-[13px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__typescript-icon.svg" alt="TypeScript" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">TypeScript</div>
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