<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // State management for showcase display (placeholder for future implementation)
  let activeImageStep = $state(0);
  
  // Image steps for Dune Spice Wars Wiki showcase (placeholder)
  const imageSteps = [
    { title: 'placeholder-wiki-landing', image: 'placeholder__image.png' },
    { title: 'placeholder-wiki-page', image: 'placeholder__image.png' }
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
  <title>Dune Spice Wars Interactive Wikipedia - Joshua McDonald</title>
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
            Dune Spice Wars Interactive Wikipedia
          </h1>
          <p class="text-[#2D2D2D] text-lg font-inter text-center max-w-[650px]">
            Dune Spice Wars unofficial interactive Wikipedia. Built using React & Next.js deployed with GitHub Pages, this site serves as an interactive wiki for players to be able to visualize all mechanics of the Dune Spice Wars RTS game.
          </p>
        </div>

        <!-- Single Image Display -->
        <div class="w-full flex justify-center mb-16">
          <div class="w-[850px] flex flex-col">
            <!-- Title Card Header -->
            <div class="w-[850px] h-[20px] bg-[#2D2D2D] rounded-tl-md rounded-tr-md relative">
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
              <div class="w-[318px] h-[10px] flex justify-center items-center flex-row bg-[#1E1E1E] absolute top-[25%] bottom-[25%] left-[31.25%] right-[31.25%]">
                <div class="text-[#9CA3AF] text-[8px] font-inter text-center">
                  {currentImageStep?.title || 'Loading...'}
                </div>
              </div>
            </div>
            
            <!-- Image Container -->
            <div class="w-[850px] h-[500px] flex justify-center items-center bg-[#1E1E1E] border-solid border-[#2D2D2D] border-b-[6px] border-x-[6px] rounded-br-md rounded-bl-md shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]">
              <div class="w-[838px] h-[494px] flex justify-center items-center">
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
        <div class="w-full flex justify-center mt-16">
          <div class="grid py-[25px] px-[57px] bg-[#F3F4F6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] grid-cols-4 grid-rows-3 gap-x-4 gap-y-3">
            <!-- Title - positioned in grid -->
            <div class="text-[#2D2D2D] text-[26px] font-inter text-center font-semibold col-span-1 row-span-1">
              Technology Stack
            </div>
            
            <!-- Row 2 Tech Cards -->
            <!-- React -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[139px] pl-[15px] bg-[#F9FAFB] rounded-lg col-start-1 row-start-2">
              <div>
                <img src="/tech-stack__react-icon.svg" alt="React" class="w-[28px] h-[29px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">React</div>
            </div>
            
            <!-- Next.js -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[130px] pl-[13px] bg-[#F9FAFB] rounded-lg col-start-2 row-start-2">
              <div>
                <img src="/tech-stack__nextjs-icon.svg" alt="Next.js" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Next.js</div>
            </div>
            
            <!-- GitHub Pages -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-3 pr-[77px] pl-[13px] bg-[#F9FAFB] rounded-lg col-start-3 row-start-2">
              <div>
                <img src="/tech-stack__githubpages-icon.svg" alt="GitHub Pages" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">GitHub Pages</div>
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