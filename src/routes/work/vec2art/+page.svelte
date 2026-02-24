<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';

  // State management for showcase display
  let activeSection = $state('Core Vectorization Engine');
  let activeLanguage = $state('Rust');
  let activeImageStep = $state(0); // For cycling through images within each section
  let activeCodeStep = $state(0); // For cycling through code images within each language

  // Navigation sections with their corresponding icons
  const sections = [
    { name: 'Core Vectorization Engine', icon: 'core-vectorization-engine-nav-icon.svg' },
    { name: 'GPU-Accelerated Algorithms', icon: 'gpu-accelerated-algorithms-nav-icon.svg' },
    { name: 'Frontend User Experience', icon: 'frontend-user-experience-nav-icon.svg' },
    { name: 'Performance & Optimization', icon: 'performance-and-optimizations-nav-icon.svg' }
  ];

  // Image steps configuration for each section
  const imageSteps: Record<string, { title: string; image: string }[]> = {
    'Core Vectorization Engine': [
      { title: 'Algorithm Pipeline', image: 'vec2art__algorithm-pipeline.png' },
      { title: 'Converter Process', image: 'vec2art__converter-process.png' },
      { title: 'Before/After Example', image: 'vec2art__before-and-after-example.png' }
    ],
    'GPU-Accelerated Algorithms': [
      { title: 'Landing Page Overview', image: 'vec2art__landingpage.png' },
      { title: 'Framework Architecture', image: 'vec2art__contact-framework.png' },
      { title: 'Algorithm Pipeline', image: 'vec2art__algorithm-pipeline.png' }
    ],
    'Frontend User Experience': [
      { title: 'Converter Interface', image: 'vec2art__converter-example.png' },
      { title: 'Configuration Panel', image: 'vec2art__config-example.png' },
      { title: 'Results Gallery', image: 'vec2art__gallery-example.png' }
    ],
    'Performance & Optimization': [
      { title: 'Converter Process', image: 'vec2art__converter-process.png' },
      { title: 'Before/After Comparison', image: 'vec2art__before-and-after-example.png' },
      { title: 'Framework Architecture', image: 'vec2art__contact-framework.png' }
    ]
  };

  // Code configuration for each section and language
  const codeConfiguration: Record<string, Record<string, { titles: string[] }>> = {
    'Core Vectorization Engine': {
      'Rust': {
        titles: ['Core Vectorizer', 'Trace Low RGBA', 'Backend Selector']
      },
      'Config': {
        titles: ['Configuration System', 'CLI Interface', 'Path Utilities', 'Error Handler']
      }
    },
    'GPU-Accelerated Algorithms': {
      'Rust': {
        titles: ['WebGPU Canny Shader', 'GPU Canny Accelerator', 'GPU SLIC Accelerator']
      },
      'Image Processing': {
        titles: ['Distance Transform', 'Render SVG to Image', 'SSIM Calculation', 'Window Extraction Stats']
      }
    },
    'Frontend User Experience': {
      'Svelte': {
        titles: ['Converter Page', 'Settings Panel', 'Auto-Animate Slider', 'GPU Status Component', 'Portal Component']
      },
      'TypeScript': {
        titles: ['Vectorizer Service', 'Converter State Store', 'Optimized Image Helpers']
      }
    },
    'Performance & Optimization': {
      'TypeScript': {
        titles: ['Performance Utils', 'Memoization Helper', 'Debounce & Throttle']
      },
      'Build Tools': {
        titles: ['WASM Rebuild', 'WASM Loader', 'Vercel Build', 'Type Generation']
      }
    }
  };

  function setActiveSection(section: string) {
    activeSection = section;
    activeImageStep = 0; // Reset to first image when switching sections
    activeCodeStep = 0; // Reset to first code image when switching sections

    // Define preferred language order (left to right)
    const preferredOrder = ['Rust', 'TypeScript', 'Svelte', 'Config', 'Image Processing', 'Build Tools'];
    const availableLangs = Object.keys(codeConfiguration[section] || {});

    if (availableLangs.length > 0 && !availableLangs.includes(activeLanguage)) {
      // Find the first language from preferred order that's available in this section
      const defaultLang = preferredOrder.find(lang => availableLangs.includes(lang)) || availableLangs[0];
      activeLanguage = defaultLang;
    }
  }

  function setActiveLanguage(language: string) {
    activeLanguage = language;
    activeCodeStep = 0; // Reset to first code image when switching languages
  }

  function previousCode() {
    const currentCodeConfig = codeConfiguration[activeSection]?.[activeLanguage];
    if (currentCodeConfig && activeCodeStep > 0) {
      activeCodeStep--;
    }
  }

  function nextCode() {
    const currentCodeConfig = codeConfiguration[activeSection]?.[activeLanguage];
    if (currentCodeConfig && activeCodeStep < currentCodeConfig.titles.length - 1) {
      activeCodeStep++;
    }
  }

  function previousImage() {
    const currentImageSteps = imageSteps[activeSection];
    if (currentImageSteps && activeImageStep > 0) {
      activeImageStep--;
    }
  }

  function nextImage() {
    const currentImageSteps = imageSteps[activeSection];
    if (currentImageSteps && activeImageStep < currentImageSteps.length - 1) {
      activeImageStep++;
    }
  }

  // Derived values for UI state
  const currentImageConfig = $derived(imageSteps[activeSection]);
  const currentImageTitle = $derived(currentImageConfig?.[activeImageStep]?.title || '');
  const currentImageSrc = $derived(currentImageConfig?.[activeImageStep]?.image || '');

  const currentCodeConfig = $derived(codeConfiguration[activeSection]?.[activeLanguage]);
  const currentCodeTitle = $derived(currentCodeConfig?.titles[activeCodeStep] || '');

  const availableLanguages = $derived(Object.keys(codeConfiguration[activeSection] || {}));
  const hasMultipleCodeImages = $derived(currentCodeConfig && currentCodeConfig.titles.length > 1);

  const canGoPrevious = $derived(activeCodeStep > 0);
  const canGoNext = $derived(currentCodeConfig && activeCodeStep < currentCodeConfig.titles.length - 1);
</script>

<div class="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
  <header class="w-full bg-bg-dark flex justify-center">
    <Header />
  </header>

  <main class="flex-grow flex flex-col">
    <!-- Hero Section -->
    <div class="w-full bg-white flex justify-center py-[40px] lg:py-[80px] flex-grow">
      <section class="w-full max-w-[1440px] px-[5%] lg:px-[180px]">
        <!-- Title and Description -->
        <div class="flex flex-col items-center gap-3 lg:gap-4 mb-[40px] lg:mb-[60px]">
          <div class="flex flex-col lg:flex-row items-center justify-center gap-3 lg:gap-6">
            <h1 class="text-text-heading text-[28px] lg:text-[64px] font-inter font-bold tracking-[-1.28px] text-center leading-tight">
              <a
                href="https://vec2art.com"
                target="_blank"
                rel="noopener noreferrer"
                class="text-text-heading hover:text-[#4D4D4D] transition-colors duration-200 hover:underline"
              >
                vec2art SVG Converter
              </a>
            </h1>
            <a
              href="https://github.com/robmcdonald5/vec2art"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-text-heading hover:bg-[#4D4D4D] transition-colors duration-200 text-white flex-shrink-0"
              aria-label="View vec2art on GitHub"
            >
              <svg class="w-4 h-4 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <p class="text-text-heading text-sm lg:text-lg font-inter text-center max-w-[650px] lg:max-w-[900px] px-4 lg:px-0">
            Transforms raster images into expressive line-art SVG illustrations in under 1.5 seconds. Built with Rust for ultra-fast processing, featuring 4 specialized vectorization backends, GPU acceleration, and an artistic enhancement pipeline for hand-drawn aesthetics.
          </p>
        </div>

        <!-- Navigation Tabs -->
        <div class="w-full flex justify-center mb-6 lg:mb-8 px-4 lg:px-0">
          <div class="flex flex-wrap justify-center gap-2 lg:gap-8">
            {#each sections as section}
              <button
                class="flex items-center gap-2 px-4 lg:px-6 py-2 lg:py-3 rounded-lg border transition-all duration-200 hover:shadow-md {activeSection === section.name ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white text-text-heading border-[#E5E7EB] hover:border-primary hover:text-primary'}"
                onclick={() => setActiveSection(section.name)}
                role="tab"
                aria-selected={activeSection === section.name}
                tabindex="0"
              >
                <!-- Section icon -->
                <img
                  src="/{section.icon}"
                  alt="{section.name} icon"
                  class="w-5 h-5 {activeSection === section.name ? 'brightness-0 invert' : 'opacity-60'}"
                  onerror={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <span class="text-xs lg:text-sm font-medium whitespace-nowrap">{section.name}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Interactive Showcase -->
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <!-- Left Side - Image Display -->
          <div class="w-full lg:flex-1 lg:max-w-[560px]">
            <div class="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
              <!-- Image Title Bar -->
              <div class="h-[45px] lg:h-[50px] bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-center px-4 lg:px-6">
                <span class="text-xs lg:text-sm font-medium text-text-heading">{currentImageTitle || 'Loading...'}</span>
              </div>

              <!-- Image Display Area -->
              <div class="h-[280px] lg:h-[350px] bg-bg-lighter flex items-center justify-center">
                {#if currentImageSrc}
                  <img
                    src="/vec2art/{currentImageSrc}"
                    alt={currentImageTitle}
                    class="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                    loading="lazy"
                    onerror={(e) => { const target = e.target as HTMLImageElement; target.style.display='none'; if (target.nextElementSibling) (target.nextElementSibling as HTMLElement).style.display='flex'; }}
                  />
                  <div class="hidden items-center justify-center h-full text-gray-500">
                    <span class="text-sm">Image loading...</span>
                  </div>
                {:else}
                  <div class="text-gray-500 text-sm">Loading image...</div>
                {/if}
              </div>

              <!-- Navigation Footer -->
              <div class="h-[50px] lg:h-[60px] bg-white border-t border-[#E5E7EB] flex items-center justify-between px-3 lg:px-4">
                <button class="p-2 hover:bg-gray-50 rounded flex-shrink-0" onclick={previousImage} aria-label="Previous step">
                  <svg class="w-4 h-4 text-gray-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                <div class="flex items-center gap-1 lg:gap-2 flex-1 justify-center">
                  {#each imageSteps[activeSection] || [] as _, index}
                    <button
                      class="w-2 h-2 lg:w-3 lg:h-3 rounded-full transition-all duration-200 {index === activeImageStep ? 'bg-primary scale-110' : 'bg-gray-300 hover:bg-gray-400'}"
                      onclick={() => activeImageStep = index}
                      aria-label="Go to step {index + 1}"
                    ></button>
                  {/each}
                </div>
                <button class="p-2 hover:bg-gray-50 rounded flex-shrink-0" onclick={nextImage} aria-label="Next step">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Side - Code Showcase -->
          <div class="w-full lg:flex-1 lg:max-w-[480px]">
            <div class="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
              <!-- Code Title Bar -->
              <div class="h-[45px] lg:h-[50px] bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center justify-between px-4 lg:px-6">
                <span class="text-xs lg:text-sm font-medium text-text-heading">{currentCodeTitle || 'Loading...'}</span>
                {#if hasMultipleCodeImages}
                  <div class="flex items-center gap-2">
                    <button
                      class="p-1 hover:bg-gray-200 rounded {!canGoPrevious ? 'opacity-50 cursor-not-allowed' : ''}"
                      onclick={previousCode}
                      disabled={!canGoPrevious}
                      aria-label="Previous code"
                    >
                      <svg class="w-3 h-3 text-gray-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                    <span class="text-xs text-gray-500">{activeCodeStep + 1}/{currentCodeConfig?.titles.length}</span>
                    <button
                      class="p-1 hover:bg-gray-200 rounded {!canGoNext ? 'opacity-50 cursor-not-allowed' : ''}"
                      onclick={nextCode}
                      disabled={!canGoNext}
                      aria-label="Next code"
                    >
                      <svg class="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                {/if}
              </div>

              <!-- Language Tabs -->
              <div class="bg-[#F3F4F6] border-b border-[#E5E7EB] px-4 lg:px-6 pt-3 lg:pt-4">
                <div class="flex gap-1">
                  {#each availableLanguages as language}
                    <button
                      class="px-3 lg:px-6 py-1.5 lg:py-2 text-xs lg:text-sm font-medium rounded-t-md transition-all {activeLanguage === language ? 'bg-white text-[#1F2937] border-b-2 border-primary' : 'text-[#6B7280] hover:text-[#1F2937]'}"
                      onclick={() => setActiveLanguage(language)}
                    >
                      {language}
                    </button>
                  {/each}
                </div>
              </div>

              <!-- Code Display Area -->
              <div class="h-[280px] lg:h-[350px] bg-white p-3 lg:p-6">
                <div class="w-full h-full bg-[#1E1E1E] rounded-lg flex items-center justify-center">
                  {#if activeSection === 'Core Vectorization Engine' && activeLanguage === 'Rust' && activeCodeStep === 0}
                    <!-- Core Vectorizer -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">vectorizer.rs</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div><span class="text-[#c586c0]">#[wasm_bindgen]</span></div>
                        <div><span class="text-[#c586c0]">pub</span> <span class="text-[#c586c0]">fn</span> <span class="text-[#dcdcaa]">vectorize</span>(&<span class="text-[#c586c0]">self</span>, <span class="text-[#9cdcfe]">image_data</span>: &<span class="text-[#4ec9b0]">ImageData</span>) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">String</span>, <span class="text-[#4ec9b0]">JsValue</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">log</span>::<span class="text-[#dcdcaa]">info!</span>(<span class="text-[#ce9178]">"🖼️ Starting vectorization"</span>);</div>
                        <div class="pl-4 text-[#6a9955]">// Convert ImageData into an ImageBuffer</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">width</span> = <span class="text-[#9cdcfe]">image_data</span>.<span class="text-[#dcdcaa]">width</span>();</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">height</span> = <span class="text-[#9cdcfe]">image_data</span>.<span class="text-[#dcdcaa]">height</span>();</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">data_vec</span>: <span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">u8</span>&gt; = <span class="text-[#9cdcfe]">image_data</span>.<span class="text-[#dcdcaa]">data</span>().<span class="text-[#dcdcaa]">to_vec</span>();</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">img_buffer</span> = <span class="text-[#4ec9b0]">ImageBuffer</span>::<span class="text-[#dcdcaa]">from_raw</span>(<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>, <span class="text-[#9cdcfe]">data_vec</span>)</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">ok_or_else</span>(|| <span class="text-[#4ec9b0]">JsValue</span>::<span class="text-[#dcdcaa]">from_str</span>(<span class="text-[#ce9178]">"Failed to create image buffer"</span>))?;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">// Build internal configuration</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> (<span class="text-[#9cdcfe]">config</span>, <span class="text-[#9cdcfe]">hand_drawn_cfg</span>) = <span class="text-[#c586c0]">self</span>.<span class="text-[#9cdcfe]">config_manager</span>.<span class="text-[#dcdcaa]">build_internal</span>()</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">map_err</span>(|<span class="text-[#9cdcfe]">e</span>| <span class="text-[#4ec9b0]">JsValue</span>::<span class="text-[#dcdcaa]">from_str</span>(<span class="text-[#569cd6]">&amp;</span><span class="text-[#dcdcaa]">format!</span>(<span class="text-[#ce9178]">"Configuration error: &#123;&#125;"</span>, <span class="text-[#9cdcfe]">e</span>)))?;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">// Perform vectorization using the core algorithm</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">result</span> = <span class="text-[#dcdcaa]">vectorize_trace_low_rgba</span>(&<span class="text-[#9cdcfe]">img_buffer</span>, &<span class="text-[#9cdcfe]">config</span>, <span class="text-[#9cdcfe]">hand_drawn_cfg</span>.<span class="text-[#dcdcaa]">as_ref</span>())</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">map_err</span>(|<span class="text-[#9cdcfe]">e</span>| <span class="text-[#4ec9b0]">JsValue</span>::<span class="text-[#dcdcaa]">from_str</span>(<span class="text-[#569cd6]">&amp;</span><span class="text-[#dcdcaa]">format!</span>(<span class="text-[#ce9178]">"Vectorization failed: &#123;&#125;"</span>, <span class="text-[#9cdcfe]">e</span>)))?;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">log</span>::<span class="text-[#dcdcaa]">info!</span>(<span class="text-[#ce9178]">"✅ Generated &#123;&#125; bytes of SVG"</span>, <span class="text-[#9cdcfe]">result</span>.<span class="text-[#dcdcaa]">len</span>());</div>
                        <div class="pl-4"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#9cdcfe]">result</span>)</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                      </div>
                    </div>
                  {:else if activeSection === 'Core Vectorization Engine' && activeLanguage === 'Rust' && activeCodeStep === 1}
                    <!-- Trace Low RGBA -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">vectorize_trace_low_rgba.rs</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div><span class="text-[#c586c0]">pub</span> <span class="text-[#c586c0]">fn</span> <span class="text-[#dcdcaa]">vectorize_trace_low_rgba</span>(</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">image</span>: &<span class="text-[#4ec9b0]">ImageBuffer</span>&lt;<span class="text-[#4ec9b0]">Rgba</span>&lt;<span class="text-[#4ec9b0]">u8</span>&gt;, <span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">u8</span>&gt;&gt;,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">config</span>: &<span class="text-[#4ec9b0]">TraceLowConfig</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">hand_drawn_config</span>: <span class="text-[#4ec9b0]">Option</span>&lt;&<span class="text-[#9cdcfe]">crate</span>::<span class="text-[#9cdcfe]">algorithms</span>::<span class="text-[#9cdcfe]">visual</span>::<span class="text-[#9cdcfe]">hand_drawn</span>::<span class="text-[#4ec9b0]">HandDrawnConfig</span>&gt;,</div>
                        <div>) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">String</span>, <span class="text-[#4ec9b0]">VectorizeError</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">use</span> <span class="text-[#9cdcfe]">input_validation</span>::<span class="text-[#dcdcaa]">validate_image_input</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">use</span> <span class="text-[#9cdcfe]">preprocessing</span>::&#123;</div>
                        <div class="pl-8"><span class="text-[#dcdcaa]">adjust_trace_low_config</span>, <span class="text-[#dcdcaa]">analyze_resolution_requirements</span>,</div>
                        <div class="pl-8"><span class="text-[#dcdcaa]">apply_background_removal</span>, <span class="text-[#dcdcaa]">apply_resolution_processing</span>,</div>
                        <div class="pl-8"><span class="text-[#4ec9b0]">BackgroundRemovalConfig</span>, <span class="text-[#4ec9b0]">ResolutionConfig</span>,</div>
                        <div class="pl-4">&#125;;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">log</span>::<span class="text-[#dcdcaa]">info!</span>(<span class="text-[#ce9178]">"Starting trace-low vectorization"</span>);</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">// Validate inputs and configuration</div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">validate_image_input</span>(<span class="text-[#9cdcfe]">image</span>)?;</div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">validate_trace_low_config</span>(<span class="text-[#9cdcfe]">config</span>)?;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">// Detect single-color or empty images</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> <span class="text-[#dcdcaa]">is_empty_or_single_color_image</span>(<span class="text-[#9cdcfe]">image</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">log</span>::<span class="text-[#dcdcaa]">warn!</span>(<span class="text-[#ce9178]">"Image appears empty, generating minimal SVG"</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">Ok</span>(<span class="text-[#dcdcaa]">generate_minimal_svg</span>(<span class="text-[#9cdcfe]">image</span>.<span class="text-[#dcdcaa]">width</span>(), <span class="text-[#9cdcfe]">image</span>.<span class="text-[#dcdcaa]">height</span>(), <span class="text-[#ce9178]">"trace-low"</span>));</div>
                        <div class="pl-4">&#125;</div>
                        <div class="mb-2"></div>
                      </div>
                    </div>
                  {:else if activeSection === 'Core Vectorization Engine' && activeLanguage === 'Rust' && activeCodeStep === 2}
                    <!-- Backend Selector -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">set_backend.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#569cd6]">#[wasm_bindgen]</span></div>
                        <div><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">set_backend</span>(<span class="text-[#569cd6]">&mut</span> <span class="text-[#9cdcfe]">self</span>, <span class="text-[#9cdcfe]">backend</span>: <span class="text-[#569cd6]">&str</span>) <span class="text-[#569cd6]">-></span> <span class="text-[#4ec9b0]">Result</span>&lt;(), <span class="text-[#4ec9b0]">JsValue</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">backend</span> = <span class="text-[#c586c0]">match</span> <span class="text-[#9cdcfe]">backend</span>.<span class="text-[#dcdcaa]">to_lowercase</span>().<span class="text-[#dcdcaa]">as_str</span>() &#123;</div>
                        <div class="pl-8"><span class="text-[#ce9178]">"edge"</span>       =&gt; <span class="text-[#4ec9b0]">TraceBackend</span>::<span class="text-[#4ec9b0]">Edge</span>,</div>
                        <div class="pl-8"><span class="text-[#ce9178]">"centerline"</span> =&gt; <span class="text-[#4ec9b0]">TraceBackend</span>::<span class="text-[#4ec9b0]">Centerline</span>,</div>
                        <div class="pl-8"><span class="text-[#ce9178]">"superpixel"</span> =&gt; <span class="text-[#4ec9b0]">TraceBackend</span>::<span class="text-[#4ec9b0]">Superpixel</span>,</div>
                        <div class="pl-8"><span class="text-[#ce9178]">"dots"</span>       =&gt; <span class="text-[#4ec9b0]">TraceBackend</span>::<span class="text-[#4ec9b0]">Dots</span>,</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">_</span> =&gt; &#123;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">Err</span>(<span class="text-[#4ec9b0]">JsValue</span>::<span class="text-[#dcdcaa]">from_str</span>(<span class="text-[#569cd6]">&amp;</span><span class="text-[#dcdcaa]">format!</span>(<span class="text-[#ce9178]">"Unknown backend: &#123;&#125;"</span>, <span class="text-[#9cdcfe]">backend</span>)));</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-4">&#125;;</div>
                        <div class="mb-2"></div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">backend</span> = <span class="text-[#9cdcfe]">backend</span>;</div>
                        <div class="mb-2"></div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Preserve user settings when changing backend</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">match</span> <span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">config_builder</span>.<span class="text-[#dcdcaa]">clone</span>().<span class="text-[#dcdcaa]">backend</span>(<span class="text-[#9cdcfe]">backend</span>).<span class="text-[#dcdcaa]">build</span>() &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#9cdcfe]">_</span>) =&gt; &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">config_builder</span> = <span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">config_builder</span>.<span class="text-[#dcdcaa]">clone</span>().<span class="text-[#dcdcaa]">backend</span>(<span class="text-[#9cdcfe]">backend</span>);</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">Err</span>(<span class="text-[#9cdcfe]">e</span>) =&gt; &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">config_builder</span> = <span class="text-[#4ec9b0]">ConfigBuilder</span>::<span class="text-[#dcdcaa]">new</span>().<span class="text-[#dcdcaa]">backend</span>(<span class="text-[#9cdcfe]">backend</span>);</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-4">&#125;</div>
                        <div class="mb-2"></div>
                        <div class="pl-4"><span class="text-[#c586c0]">Ok</span>(())</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Core Vectorization Engine' && activeLanguage === 'Config' && activeCodeStep === 0}
                    <!-- Configuration System -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">config.rs</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div><span class="text-[#c586c0]">#[derive(Debug, Clone, Serialize, Deserialize, Default)]</span></div>
                        <div><span class="text-[#c586c0]">pub</span> <span class="text-[#c586c0]">struct</span> <span class="text-[#4ec9b0]">TraceDefaultConfig</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">pub</span> <span class="text-[#9cdcfe]">min_grad</span>: <span class="text-[#4ec9b0]">f32</span>,       <span class="text-[#6a9955]">// Minimum gradient magnitude (0.08)</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">pub</span> <span class="text-[#9cdcfe]">min_coherency</span>: <span class="text-[#4ec9b0]">f32</span>,  <span class="text-[#6a9955]">// Minimum coherency threshold (0.15)</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">pub</span> <span class="text-[#9cdcfe]">max_gap</span>: <span class="text-[#4ec9b0]">u32</span>,        <span class="text-[#6a9955]">// Maximum gap size in pixels (4)</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">pub</span> <span class="text-[#9cdcfe]">max_len</span>: <span class="text-[#4ec9b0]">usize</span>,      <span class="text-[#6a9955]">// Max polyline length (10_000)</span></div>
                        <div>&#125;</div>
                        <div class="mt-1"></div>
                        <div><span class="text-[#c586c0]">pub</span> <span class="text-[#c586c0]">mod</span> <span class="text-[#9cdcfe]">validation</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">use</span> <span class="text-[#9cdcfe]">crate</span>::<span class="text-[#9cdcfe]">error</span>::<span class="text-[#4ec9b0]">VectorizeError</span>;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">/// Ensure image dimensions are valid and within limits.</div>
                        <div class="pl-4"><span class="text-[#c586c0]">pub</span> <span class="text-[#c586c0]">fn</span> <span class="text-[#dcdcaa]">validate_image_dimensions</span>(<span class="text-[#9cdcfe]">width</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">height</span>: <span class="text-[#4ec9b0]">u32</span>) -> <span class="text-[#4ec9b0]">Result</span>&lt;(), <span class="text-[#4ec9b0]">VectorizeError</span>&gt; &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">width</span> == <span class="text-[#b5cea8]">0</span> || <span class="text-[#9cdcfe]">height</span> == <span class="text-[#b5cea8]">0</span> &#123;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">Err</span>(<span class="text-[#4ec9b0]">VectorizeError</span>::<span class="text-[#dcdcaa]">invalid_dimensions</span>(<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>, <span class="text-[#ce9178]">"Must be > 0"</span>));</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">width</span> > <span class="text-[#b5cea8]">16384</span> || <span class="text-[#9cdcfe]">height</span> > <span class="text-[#b5cea8]">16384</span> &#123;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">Err</span>(<span class="text-[#4ec9b0]">VectorizeError</span>::<span class="text-[#dcdcaa]">invalid_dimensions</span>(<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>, <span class="text-[#ce9178]">"Too large"</span>));</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">Ok</span>(())</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                      </div>
                    </div>
                  {:else if activeSection === 'Core Vectorization Engine' && activeLanguage === 'Config' && activeCodeStep === 1}
                    <!-- CLI Interface -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">clap_cli_call.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#569cd6]">#[derive(Subcommand)]</span></div>
                        <div><span class="text-[#c586c0]">enum</span> <span class="text-[#4ec9b0]">Commands</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">/// Vectorize using low-detail line tracing algorithm.</span></div>
                        <div class="pl-4"><span class="text-[#608b4e]">/// Examples:</span></div>
                        <div class="pl-4"><span class="text-[#608b4e]">///   vectorize-cli trace-low input.png output.svg</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">TraceLow</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#608b4e]">/// Input image file</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">input</span>: <span class="text-[#4ec9b0]">PathBuf</span>,</div>
                        <div class="pl-8"><span class="text-[#608b4e]">/// Output SVG file</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">output</span>: <span class="text-[#4ec9b0]">PathBuf</span>,</div>
                        <div class="pl-8"><span class="text-[#608b4e]">/// Tracing backend to use (edge, centerline, superpixel, dots)</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">#[arg(long, default_value = "edge")]</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">backend</span>: <span class="text-[#4ec9b0]">String</span>,</div>
                        <div class="pl-8"><span class="text-[#608b4e]">/// Detail level (0.0 = very sparse, 1.0 = more detail)</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">#[arg(long, default_value = "0.3")]</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">detail</span>: <span class="text-[#4ec9b0]">f32</span>,</div>
                        <div class="pl-8"><span class="text-[#608b4e]">/// Stroke width at 1080p reference resolution</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">#[arg(long, default_value = "1.2")]</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">stroke_width</span>: <span class="text-[#4ec9b0]">f32</span>,</div>
                        <div class="pl-8"><span class="text-[#608b4e]">/// Random seed for reproducible results</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">#[arg(long, default_value = "0")]</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">seed</span>: <span class="text-[#4ec9b0]">u64</span>,</div>
                        <div class="pl-8"><span class="text-[#608b4e]">/// Hand-drawn aesthetic preset</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">#[arg(long, default_value = "none")]</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">hand_drawn</span>: <span class="text-[#4ec9b0]">String</span>,</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Core Vectorization Engine' && activeLanguage === 'Config' && activeCodeStep === 2}
                    <!-- Path Utilities -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">path_utils.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#608b4e]">/// Compute a Douglas–Peucker tolerance scaled by image diagonal (0.3–0.7%)</span></div>
                        <div><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">calculate_douglas_peucker_epsilon</span>(<span class="text-[#9cdcfe]">image_width</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">image_height</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">simplification_factor</span>: <span class="text-[#4ec9b0]">f64</span>) -> <span class="text-[#4ec9b0]">f64</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">diagonal</span> = ((<span class="text-[#9cdcfe]">image_width</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f64</span>).<span class="text-[#dcdcaa]">powi</span>(<span class="text-[#b5cea8]">2</span>) + (<span class="text-[#9cdcfe]">image_height</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f64</span>).<span class="text-[#dcdcaa]">powi</span>(<span class="text-[#b5cea8]">2</span>)).<span class="text-[#dcdcaa]">sqrt</span>();</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">factor</span> = <span class="text-[#9cdcfe]">simplification_factor</span>.<span class="text-[#dcdcaa]">clamp</span>(<span class="text-[#b5cea8]">0.003</span>, <span class="text-[#b5cea8]">0.007</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">diagonal</span> * <span class="text-[#9cdcfe]">factor</span></div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#608b4e]">/// Perform Douglas–Peucker simplification on a polyline.</span></div>
                        <div><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">douglas_peucker_simplify</span>(<span class="text-[#9cdcfe]">points</span>: <span class="text-[#569cd6]">&</span>[<span class="text-[#4ec9b0]">Point</span>], <span class="text-[#9cdcfe]">tolerance</span>: <span class="text-[#4ec9b0]">f64</span>) -> <span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">Point</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">points</span>.<span class="text-[#dcdcaa]">len</span>() &lt;= <span class="text-[#b5cea8]">2</span> &#123; <span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">points</span>.<span class="text-[#dcdcaa]">to_vec</span>(); &#125;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">tolerance_sq</span> = <span class="text-[#9cdcfe]">tolerance</span> * <span class="text-[#9cdcfe]">tolerance</span>;</div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">simplify_recursive</span>(<span class="text-[#9cdcfe]">points</span>, <span class="text-[#b5cea8]">0</span>, <span class="text-[#9cdcfe]">points</span>.<span class="text-[#dcdcaa]">len</span>() - <span class="text-[#b5cea8]">1</span>, <span class="text-[#9cdcfe]">tolerance_sq</span>)</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#608b4e]">/// Visvalingam–Whyatt simplification removes points with the smallest effective area.</span></div>
                        <div><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">visvalingam_whyatt_simplify</span>(<span class="text-[#9cdcfe]">points</span>: <span class="text-[#569cd6]">&</span>[<span class="text-[#4ec9b0]">Point</span>], <span class="text-[#9cdcfe]">min_area</span>: <span class="text-[#4ec9b0]">f64</span>) -> <span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">Point</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">simplified</span> = <span class="text-[#9cdcfe]">points</span>.<span class="text-[#dcdcaa]">to_vec</span>();</div>
                        <div class="pl-4"><span class="text-[#c586c0]">loop</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">simplified</span>.<span class="text-[#dcdcaa]">len</span>() &lt;= <span class="text-[#b5cea8]">2</span> &#123; <span class="text-[#c586c0]">break</span>; &#125;</div>
                        <div class="pl-8"><span class="text-[#608b4e]">// Find point with smallest triangle area and remove it if below min_area</span></div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">simplified</span></div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Core Vectorization Engine' && activeLanguage === 'Config' && activeCodeStep === 3}
                    <!-- Error Handler -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">error_handler.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#569cd6]">#[derive(Error, Debug)]</span></div>
                        <div><span class="text-[#569cd6]">pub enum</span> <span class="text-[#4ec9b0]">VectorizeError</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">#[error("Image processing error: {0}")]</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">ImageError</span>(#[from] <span class="text-[#4ec9b0]">image</span>::<span class="text-[#4ec9b0]">ImageError</span>),</div>
                        <div class="pl-4"><span class="text-[#569cd6]">#[error("Invalid configuration: &#123;message&#125;")]</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">ConfigError</span> &#123; <span class="text-[#9cdcfe]">message</span>: <span class="text-[#4ec9b0]">String</span> &#125;,</div>
                        <div class="pl-4"><span class="text-[#569cd6]">#[error("Algorithm error: &#123;message&#125;")]</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">AlgorithmError</span> &#123; <span class="text-[#9cdcfe]">message</span>: <span class="text-[#4ec9b0]">String</span> &#125;,</div>
                        <div class="pl-4"><span class="text-[#569cd6]">#[error("SVG generation error: &#123;message&#125;")]</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">SvgError</span> &#123; <span class="text-[#9cdcfe]">message</span>: <span class="text-[#4ec9b0]">String</span> &#125;,</div>
                        <div class="pl-4"><span class="text-[#569cd6]">#[error("Invalid image dimensions: width=&#123;width&#125;, height=&#123;height&#125;. &#123;details&#125;")]</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">InvalidDimensions</span> &#123; <span class="text-[#9cdcfe]">width</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">height</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">details</span>: <span class="text-[#4ec9b0]">String</span> &#125;,</div>
                        <div class="pl-4"><span class="text-[#569cd6]">#[error("Image too large: &#123;width&#125;x&#123;height&#125; exceeds maximum dimension &#123;max_dimension&#125;")]</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">ImageTooLarge</span> &#123; <span class="text-[#9cdcfe]">width</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">height</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">max_dimension</span>: <span class="text-[#4ec9b0]">u32</span> &#125;,</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// ...more variants omitted for brevity...</span></div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#c586c0]">impl</span> <span class="text-[#4ec9b0]">VectorizeError</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">/// Construct specific error variants for easy use</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">invalid_dimensions</span>(<span class="text-[#9cdcfe]">width</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">height</span>: <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">details</span>: <span class="text-[#c586c0]">impl</span> <span class="text-[#4ec9b0]">Into</span>&lt;<span class="text-[#4ec9b0]">String</span>&gt;) -> <span class="text-[#4ec9b0]">Self</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#4ec9b0]">Self</span>::<span class="text-[#4ec9b0]">InvalidDimensions</span> &#123; <span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>, <span class="text-[#9cdcfe]">details</span>: <span class="text-[#9cdcfe]">details</span>.<span class="text-[#dcdcaa]">into</span>() &#125;</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'GPU-Accelerated Algorithms' && activeLanguage === 'Rust' && activeCodeStep === 0}
                    <!-- WebGPU Canny Shader -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">webgpu-canny-shader.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#608b4e]">// WebGPU compute shader for Canny edge detection</span></div>
                        <div><span class="text-[#ce9178]">r#"</span></div>
                        <div><span class="text-[#569cd6]">@group</span>(<span class="text-[#b5cea8]">0</span>) <span class="text-[#569cd6]">@binding</span>(<span class="text-[#b5cea8]">0</span>) <span class="text-[#569cd6]">var</span>&lt;<span class="text-[#4ec9b0]">storage</span>, <span class="text-[#4ec9b0]">read</span>&gt; <span class="text-[#9cdcfe]">input_image</span>: <span class="text-[#4ec9b0]">array</span>&lt;<span class="text-[#4ec9b0]">f32</span>&gt;;</div>
                        <div><span class="text-[#569cd6]">@group</span>(<span class="text-[#b5cea8]">0</span>) <span class="text-[#569cd6]">@binding</span>(<span class="text-[#b5cea8]">1</span>) <span class="text-[#569cd6]">var</span>&lt;<span class="text-[#4ec9b0]">storage</span>, <span class="text-[#4ec9b0]">read_write</span>&gt; <span class="text-[#9cdcfe]">output_edges</span>: <span class="text-[#4ec9b0]">array</span>&lt;<span class="text-[#4ec9b0]">f32</span>&gt;;</div>
                        <div><span class="text-[#569cd6]">@group</span>(<span class="text-[#b5cea8]">0</span>) <span class="text-[#569cd6]">@binding</span>(<span class="text-[#b5cea8]">2</span>) <span class="text-[#569cd6]">var</span>&lt;<span class="text-[#4ec9b0]">uniform</span>&gt; <span class="text-[#9cdcfe]">params</span>: <span class="text-[#4ec9b0]">CannyParams</span>;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#569cd6]">struct</span> <span class="text-[#4ec9b0]">CannyParams</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">width</span>: <span class="text-[#4ec9b0]">u32</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">height</span>: <span class="text-[#4ec9b0]">u32</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">low_threshold</span>: <span class="text-[#4ec9b0]">f32</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">high_threshold</span>: <span class="text-[#4ec9b0]">f32</span>,</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#569cd6]">@compute</span> <span class="text-[#569cd6]">@workgroup_size</span>(<span class="text-[#b5cea8]">8</span>, <span class="text-[#b5cea8]">8</span>)</div>
                        <div><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">canny_edge_detection</span>(<span class="text-[#569cd6]">@builtin</span>(<span class="text-[#9cdcfe]">global_invocation_id</span>) <span class="text-[#9cdcfe]">global_id</span>: <span class="text-[#4ec9b0]">vec3</span>&lt;<span class="text-[#4ec9b0]">u32</span>&gt;) &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">x</span> = <span class="text-[#9cdcfe]">global_id</span>.<span class="text-[#9cdcfe]">x</span>;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">y</span> = <span class="text-[#9cdcfe]">global_id</span>.<span class="text-[#9cdcfe]">y</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">x</span> &gt;= <span class="text-[#9cdcfe]">params</span>.<span class="text-[#9cdcfe]">width</span> || <span class="text-[#9cdcfe]">y</span> &gt;= <span class="text-[#9cdcfe]">params</span>.<span class="text-[#9cdcfe]">height</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">return</span>;</div>
                        <div class="pl-4">&#125;</div>
                        <div class="mb-2"></div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Apply Sobel operators for gradient calculation</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">gx</span> = <span class="text-[#dcdcaa]">sobel_x</span>(<span class="text-[#9cdcfe]">x</span>, <span class="text-[#9cdcfe]">y</span>);</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">gy</span> = <span class="text-[#dcdcaa]">sobel_y</span>(<span class="text-[#9cdcfe]">x</span>, <span class="text-[#9cdcfe]">y</span>);</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">magnitude</span> = <span class="text-[#dcdcaa]">sqrt</span>(<span class="text-[#9cdcfe]">gx</span> * <span class="text-[#9cdcfe]">gx</span> + <span class="text-[#9cdcfe]">gy</span> * <span class="text-[#9cdcfe]">gy</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">output_edges</span>[<span class="text-[#9cdcfe]">y</span> * <span class="text-[#9cdcfe]">params</span>.<span class="text-[#9cdcfe]">width</span> + <span class="text-[#9cdcfe]">x</span>] = <span class="text-[#9cdcfe]">magnitude</span>;</div>
                        <div>&#125;</div>
                        <div><span class="text-[#ce9178]">"#</span></div>
                      </div>
                    </div>
                  {:else if activeSection === 'GPU-Accelerated Algorithms' && activeLanguage === 'Rust' && activeCodeStep === 1}
                    <!-- GPU Canny Accelerator -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">gpu_canny-accelerator.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">compute_etf</span>(<span class="text-[#9cdcfe]">gray</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">GrayImage</span>, <span class="text-[#9cdcfe]">cfg</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">EtfConfig</span>) -> <span class="text-[#4ec9b0]">EtfField</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">width</span> = <span class="text-[#9cdcfe]">gray</span>.<span class="text-[#dcdcaa]">width</span>();</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">height</span> = <span class="text-[#9cdcfe]">gray</span>.<span class="text-[#dcdcaa]">height</span>();</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Step 1: compute image gradients with a Sobel operator</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> (<span class="text-[#9cdcfe]">grad_x</span>, <span class="text-[#9cdcfe]">grad_y</span>) = <span class="text-[#dcdcaa]">compute_gradients</span>(<span class="text-[#9cdcfe]">gray</span>);</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Step 2: build a structure tensor for each pixel and apply Gaussian smoothing</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">tensor_field</span> = <span class="text-[#dcdcaa]">compute_structure_tensor</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">grad_x</span>, <span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">grad_y</span>, <span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>, <span class="text-[#9cdcfe]">cfg</span>.<span class="text-[#9cdcfe]">sigma</span>);</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Step 3: extract initial tangent directions and coherency values</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">etf_field</span> = <span class="text-[#dcdcaa]">extract_initial_tangents</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">tensor_field</span>, <span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>, <span class="text-[#9cdcfe]">cfg</span>.<span class="text-[#9cdcfe]">coherency_tau</span>);</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Step 4: iteratively refine the ETF for smoother, more coherent flow</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">refine_etf_field</span>(<span class="text-[#569cd6]">&mut</span> <span class="text-[#9cdcfe]">etf_field</span>, <span class="text-[#9cdcfe]">cfg</span>.<span class="text-[#9cdcfe]">radius</span>, <span class="text-[#9cdcfe]">cfg</span>.<span class="text-[#9cdcfe]">iters</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">etf_field</span></div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'GPU-Accelerated Algorithms' && activeLanguage === 'Rust' && activeCodeStep === 2}
                    <!-- GPU SLIC Accelerator -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">gpu_slic_accelerator.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#569cd6]">pub struct</span> <span class="text-[#4ec9b0]">GpuSlicSegmentation</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">device</span>: <span class="text-[#4ec9b0]">Arc</span>&lt;<span class="text-[#4ec9b0]">GpuDevice</span>&gt;,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">init_pipeline</span>: <span class="text-[#4ec9b0]">wgpu</span>::<span class="text-[#4ec9b0]">ComputePipeline</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">assign_pipeline</span>: <span class="text-[#4ec9b0]">wgpu</span>::<span class="text-[#4ec9b0]">ComputePipeline</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">accumulate_pipeline</span>: <span class="text-[#4ec9b0]">wgpu</span>::<span class="text-[#4ec9b0]">ComputePipeline</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">update_pipeline</span>: <span class="text-[#4ec9b0]">wgpu</span>::<span class="text-[#4ec9b0]">ComputePipeline</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">perturb_pipeline</span>: <span class="text-[#4ec9b0]">wgpu</span>::<span class="text-[#4ec9b0]">ComputePipeline</span>,</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#c586c0]">impl</span> <span class="text-[#4ec9b0]">GpuSlicSegmentation</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">/// Perform SLIC segmentation on the GPU.</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">pub async fn</span> <span class="text-[#dcdcaa]">segment</span>(</div>
                        <div class="pl-8"><span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">self</span>,</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">image</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">ImageBuffer</span>&lt;<span class="text-[#4ec9b0]">Rgba</span>&lt;<span class="text-[#4ec9b0]">u8</span>&gt;, <span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">u8</span>&gt;&gt;,</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">num_segments</span>: <span class="text-[#4ec9b0]">u32</span>,</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">compactness</span>: <span class="text-[#4ec9b0]">f32</span>,</div>
                        <div class="pl-4">) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">u32</span>&gt;, <span class="text-[#4ec9b0]">GpuSlicError</span>&gt; &#123;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> (<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>) = <span class="text-[#9cdcfe]">image</span>.<span class="text-[#dcdcaa]">dimensions</span>();</div>
                        <div class="pl-8"><span class="text-[#608b4e]">// Convert image to f32 RGBA and allocate GPU buffers</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">image_f32</span>: <span class="text-[#4ec9b0]">Vec</span>&lt;[<span class="text-[#4ec9b0]">f32</span>; <span class="text-[#b5cea8]">4</span>]&gt; = <span class="text-[#9cdcfe]">image</span>.<span class="text-[#dcdcaa]">as_raw</span>().<span class="text-[#dcdcaa]">chunks</span>(<span class="text-[#b5cea8]">4</span>)</div>
                        <div class="pl-12">.<span class="text-[#dcdcaa]">map</span>(|<span class="text-[#9cdcfe]">px</span>| [<span class="text-[#9cdcfe]">px</span>[<span class="text-[#b5cea8]">0</span>] <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f32</span> / <span class="text-[#b5cea8]">255.0</span>, <span class="text-[#9cdcfe]">px</span>[<span class="text-[#b5cea8]">1</span>] <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f32</span> / <span class="text-[#b5cea8]">255.0</span>, <span class="text-[#9cdcfe]">px</span>[<span class="text-[#b5cea8]">2</span>] <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f32</span> / <span class="text-[#b5cea8]">255.0</span>, <span class="text-[#9cdcfe]">px</span>[<span class="text-[#b5cea8]">3</span>] <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f32</span> / <span class="text-[#b5cea8]">255.0</span>])</div>
                        <div class="pl-12">.<span class="text-[#dcdcaa]">collect</span>();</div>
                        <div class="pl-8"><span class="text-[#608b4e]">// Create cluster, assignment and distance buffers</span></div>
                        <div class="pl-8"><span class="text-[#608b4e]">// Iterate multiple times: initialize/perturb centers, assign pixels, accumulate updates, update centers</span></div>
                        <div class="pl-8"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">iteration</span> <span class="text-[#c586c0]">in</span> <span class="text-[#b5cea8]">0</span>..<span class="text-[#b5cea8]">10</span> {`{`}</div>
                        <div class="pl-12"><span class="text-[#608b4e]">// Dispatch the init and perturb passes on the first iteration</span></div>
                        <div class="pl-8">{`}`}</div>
                        <div class="pl-8"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#9cdcfe]">assignments</span>)</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'GPU-Accelerated Algorithms' && activeLanguage === 'Image Processing' && activeCodeStep === 0}
                    <!-- Distance Transform -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">distance_transform.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#608b4e]">/// Strategy trait for distance transform algorithms.</span></div>
                        <div><span class="text-[#569cd6]">pub trait</span> <span class="text-[#4ec9b0]">DistanceTransformStrategy</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">compute_distance_transform</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">self</span>, <span class="text-[#9cdcfe]">binary</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">GrayImage</span>) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">f32</span>&gt;&gt;, <span class="text-[#4ec9b0]">VectorizeError</span>&gt;;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">name</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">self</span>) -> <span class="text-[#569cd6]">&'static</span> <span class="text-[#4ec9b0]">str</span>;</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#608b4e]">/// Centerline extractor using distance fields</span></div>
                        <div><span class="text-[#569cd6]">pub struct</span> <span class="text-[#4ec9b0]">DistanceFieldCenterlineExtractor</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">distance_transform</span>: <span class="text-[#4ec9b0]">Box</span>&lt;<span class="text-[#569cd6]">dyn</span> <span class="text-[#4ec9b0]">DistanceTransformStrategy</span>&gt;,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">ridge_threshold</span>: <span class="text-[#4ec9b0]">f32</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">min_ridge_strength</span>: <span class="text-[#4ec9b0]">f32</span>,</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#c586c0]">impl</span> <span class="text-[#4ec9b0]">DistanceFieldCenterlineExtractor</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">/// Extract centerlines from a binary image</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">extract_centerlines</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">self</span>, <span class="text-[#9cdcfe]">binary</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">GrayImage</span>) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">Point</span>&gt;&gt;, <span class="text-[#4ec9b0]">VectorizeError</span>&gt; &#123;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">dt</span> = <span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">distance_transform</span>.<span class="text-[#dcdcaa]">compute_distance_transform</span>(<span class="text-[#9cdcfe]">binary</span>)?;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">ridges</span> = <span class="text-[#9cdcfe]">self</span>.<span class="text-[#dcdcaa]">find_distance_ridges</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">dt</span>)?;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">polylines</span> = <span class="text-[#9cdcfe]">self</span>.<span class="text-[#dcdcaa]">trace_ridge_paths</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">ridges</span>, <span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">dt</span>)?;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#9cdcfe]">polylines</span>)</div>
                        <div class="pl-4">&#125;</div>
                        <div class="mb-2"></div>
                        <div class="pl-4"><span class="text-[#608b4e]">/// Identify ridge points where the distance field is locally maximal.</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">find_distance_ridges</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">self</span>, <span class="text-[#9cdcfe]">dt</span>: <span class="text-[#569cd6]">&</span>[<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">f32</span>&gt;]) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">bool</span>&gt;&gt;, <span class="text-[#4ec9b0]">VectorizeError</span>&gt; &#123;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">height</span> = <span class="text-[#9cdcfe]">dt</span>.<span class="text-[#dcdcaa]">len</span>();</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">width</span> = <span class="text-[#9cdcfe]">dt</span>[<span class="text-[#b5cea8]">0</span>].<span class="text-[#dcdcaa]">len</span>();</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">ridges</span> = <span class="text-[#dcdcaa]">vec!</span>[<span class="text-[#dcdcaa]">vec!</span>[<span class="text-[#569cd6]">false</span>; <span class="text-[#9cdcfe]">width</span>]; <span class="text-[#9cdcfe]">height</span>];</div>
                        <div class="pl-8"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">y</span> <span class="text-[#c586c0]">in</span> <span class="text-[#b5cea8]">1</span>..<span class="text-[#9cdcfe]">height</span> - <span class="text-[#b5cea8]">1</span> &#123;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">x</span> <span class="text-[#c586c0]">in</span> <span class="text-[#b5cea8]">1</span>..<span class="text-[#9cdcfe]">width</span> - <span class="text-[#b5cea8]">1</span> &#123;</div>
                        <div class="pl-16"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">center</span> = <span class="text-[#9cdcfe]">dt</span>[<span class="text-[#9cdcfe]">y</span>][<span class="text-[#9cdcfe]">x</span>];</div>
                        <div class="pl-16"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">center</span> &lt; <span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">ridge_threshold</span> &#123; <span class="text-[#c586c0]">continue</span>; &#125;</div>
                        <div class="pl-16"><span class="text-[#9cdcfe]">ridges</span>[<span class="text-[#9cdcfe]">y</span>][<span class="text-[#9cdcfe]">x</span>] = <span class="text-[#9cdcfe]">center</span> >= <span class="text-[#9cdcfe]">self</span>.<span class="text-[#9cdcfe]">min_ridge_strength</span>;</div>
                        <div class="pl-12">&#125;</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#9cdcfe]">ridges</span>)</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'GPU-Accelerated Algorithms' && activeLanguage === 'Image Processing' && activeCodeStep === 1}
                    <!-- Render SVG to Image -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">render-svg-to-image.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#608b4e]">/// Render SVG content to an RGBA image</span></div>
                        <div><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">render_svg_to_image</span>(<span class="text-[#9cdcfe]">svg_content</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">str</span>, <span class="text-[#9cdcfe]">dimensions</span>: (<span class="text-[#4ec9b0]">u32</span>, <span class="text-[#4ec9b0]">u32</span>)) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">RgbaImage</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> (<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>) = <span class="text-[#9cdcfe]">dimensions</span>;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Parse the SVG</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">options</span> = <span class="text-[#4ec9b0]">usvg</span>::<span class="text-[#4ec9b0]">Options</span>::<span class="text-[#dcdcaa]">default</span>();</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">tree</span> = <span class="text-[#4ec9b0]">usvg</span>::<span class="text-[#4ec9b0]">Tree</span>::<span class="text-[#dcdcaa]">from_str</span>(<span class="text-[#9cdcfe]">svg_content</span>, <span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">options</span>)</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">context</span>(<span class="text-[#ce9178]">"Failed to parse SVG"</span>)?;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Create a pixmap for rendering</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">pixmap</span> = <span class="text-[#4ec9b0]">tiny_skia</span>::<span class="text-[#4ec9b0]">Pixmap</span>::<span class="text-[#dcdcaa]">new</span>(<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>)</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">context</span>(<span class="text-[#ce9178]">"Failed to create pixmap for SVG rendering"</span>)?;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Render SVG to pixmap</span></div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">resvg</span>::<span class="text-[#dcdcaa]">render</span>(</div>
                        <div class="pl-8"><span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">tree</span>,</div>
                        <div class="pl-8"><span class="text-[#4ec9b0]">tiny_skia</span>::<span class="text-[#4ec9b0]">Transform</span>::<span class="text-[#dcdcaa]">identity</span>(),</div>
                        <div class="pl-8"><span class="text-[#569cd6]">&mut</span> <span class="text-[#9cdcfe]">pixmap</span>.<span class="text-[#dcdcaa]">as_mut</span>(),</div>
                        <div class="pl-4">);</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Convert the pixmap to an RgbaImage (swapping BGRA → RGBA channels)</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">img</span> = <span class="text-[#4ec9b0]">RgbaImage</span>::<span class="text-[#dcdcaa]">new</span>(<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">for</span> (<span class="text-[#9cdcfe]">i</span>, <span class="text-[#9cdcfe]">pixel</span>) <span class="text-[#c586c0]">in</span> <span class="text-[#9cdcfe]">pixmap</span>.<span class="text-[#dcdcaa]">data</span>().<span class="text-[#dcdcaa]">chunks_exact</span>(<span class="text-[#b5cea8]">4</span>).<span class="text-[#dcdcaa]">enumerate</span>() &#123;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">x</span> = <span class="text-[#9cdcfe]">i</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">u32</span> % <span class="text-[#9cdcfe]">width</span>;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">y</span> = <span class="text-[#9cdcfe]">i</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">u32</span> / <span class="text-[#9cdcfe]">width</span>;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">x</span> &lt; <span class="text-[#9cdcfe]">width</span> && <span class="text-[#9cdcfe]">y</span> &lt; <span class="text-[#9cdcfe]">height</span> &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">img</span>.<span class="text-[#dcdcaa]">put_pixel</span>(<span class="text-[#9cdcfe]">x</span>, <span class="text-[#9cdcfe]">y</span>, <span class="text-[#4ec9b0]">Rgba</span>([<span class="text-[#9cdcfe]">pixel</span>[<span class="text-[#b5cea8]">2</span>], <span class="text-[#9cdcfe]">pixel</span>[<span class="text-[#b5cea8]">1</span>], <span class="text-[#9cdcfe]">pixel</span>[<span class="text-[#b5cea8]">0</span>], <span class="text-[#9cdcfe]">pixel</span>[<span class="text-[#b5cea8]">3</span>]]));</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#9cdcfe]">img</span>)</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'GPU-Accelerated Algorithms' && activeLanguage === 'Image Processing' && activeCodeStep === 2}
                    <!-- SSIM Calculation -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">ssim-calculation.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#608b4e]">/// Calculate SSIM between two grayscale images</span></div>
                        <div><span class="text-[#569cd6]">pub fn</span> <span class="text-[#dcdcaa]">calculate_ssim</span>(<span class="text-[#9cdcfe]">img1</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">GrayImage</span>, <span class="text-[#9cdcfe]">img2</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">GrayImage</span>) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">SsimResult</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">img1</span>.<span class="text-[#dcdcaa]">dimensions</span>() != <span class="text-[#9cdcfe]">img2</span>.<span class="text-[#dcdcaa]">dimensions</span>() &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">Err</span>(<span class="text-[#dcdcaa]">anyhow!</span>(</div>
                        <div class="pl-12"><span class="text-[#ce9178]">"Images must have the same dimensions. Got &#123;:?&#125; and &#123;:?&#125;"</span>,</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">img1</span>.<span class="text-[#dcdcaa]">dimensions</span>(),</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">img2</span>.<span class="text-[#dcdcaa]">dimensions</span>()</div>
                        <div class="pl-8">));</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> (<span class="text-[#9cdcfe]">width</span>, <span class="text-[#9cdcfe]">height</span>) = <span class="text-[#9cdcfe]">img1</span>.<span class="text-[#dcdcaa]">dimensions</span>();</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">width</span> &lt; <span class="text-[#9cdcfe]">WINDOW_SIZE</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">u32</span> || <span class="text-[#9cdcfe]">height</span> &lt; <span class="text-[#9cdcfe]">WINDOW_SIZE</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">u32</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">Err</span>(<span class="text-[#dcdcaa]">anyhow!</span>(</div>
                        <div class="pl-12"><span class="text-[#ce9178]">"Images too small for SSIM calculation. Minimum &#123;&#125;x&#123;&#125;"</span>,</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">WINDOW_SIZE</span>, <span class="text-[#9cdcfe]">WINDOW_SIZE</span></div>
                        <div class="pl-8">));</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">ssim_sum</span> = <span class="text-[#b5cea8]">0.0</span>;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">window_count</span> = <span class="text-[#b5cea8]">0</span>;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">half_window</span> = <span class="text-[#9cdcfe]">WINDOW_SIZE</span> / <span class="text-[#b5cea8]">2</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">y</span> <span class="text-[#c586c0]">in</span> <span class="text-[#9cdcfe]">half_window</span>..(<span class="text-[#9cdcfe]">height</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">usize</span> - <span class="text-[#9cdcfe]">half_window</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">x</span> <span class="text-[#c586c0]">in</span> <span class="text-[#9cdcfe]">half_window</span>..(<span class="text-[#9cdcfe]">width</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">usize</span> - <span class="text-[#9cdcfe]">half_window</span>) &#123;</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">w1</span> = <span class="text-[#dcdcaa]">extract_window</span>(<span class="text-[#9cdcfe]">img1</span>, <span class="text-[#9cdcfe]">x</span>, <span class="text-[#9cdcfe]">y</span>, <span class="text-[#9cdcfe]">WINDOW_SIZE</span>)?;</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">w2</span> = <span class="text-[#dcdcaa]">extract_window</span>(<span class="text-[#9cdcfe]">img2</span>, <span class="text-[#9cdcfe]">x</span>, <span class="text-[#9cdcfe]">y</span>, <span class="text-[#9cdcfe]">WINDOW_SIZE</span>)?;</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">s1</span> = <span class="text-[#dcdcaa]">calculate_window_stats</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">w1</span>);</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">s2</span> = <span class="text-[#dcdcaa]">calculate_window_stats</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">w2</span>);</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">covariance</span> = <span class="text-[#dcdcaa]">calculate_covariance</span>(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">w1</span>, <span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">w2</span>, <span class="text-[#9cdcfe]">s1</span>.<span class="text-[#9cdcfe]">mean</span>, <span class="text-[#9cdcfe]">s2</span>.<span class="text-[#9cdcfe]">mean</span>);</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">luminance</span> = (<span class="text-[#b5cea8]">2.0</span> * <span class="text-[#9cdcfe]">s1</span>.<span class="text-[#9cdcfe]">mean</span> * <span class="text-[#9cdcfe]">s2</span>.<span class="text-[#9cdcfe]">mean</span> + <span class="text-[#9cdcfe]">C1</span>)</div>
                        <div class="pl-16">/ (<span class="text-[#9cdcfe]">s1</span>.<span class="text-[#9cdcfe]">mean</span>.<span class="text-[#dcdcaa]">powi</span>(<span class="text-[#b5cea8]">2</span>) + <span class="text-[#9cdcfe]">s2</span>.<span class="text-[#9cdcfe]">mean</span>.<span class="text-[#dcdcaa]">powi</span>(<span class="text-[#b5cea8]">2</span>) + <span class="text-[#9cdcfe]">C1</span>);</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">ssim</span> = <span class="text-[#9cdcfe]">luminance</span> * <span class="text-[#9cdcfe]">contrast</span> * <span class="text-[#9cdcfe]">structure</span>;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">ssim_sum</span> += <span class="text-[#9cdcfe]">ssim</span>;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">window_count</span> += <span class="text-[#b5cea8]">1</span>;</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#4ec9b0]">SsimResult</span> &#123; <span class="text-[#9cdcfe]">ssim</span>: <span class="text-[#9cdcfe]">ssim_sum</span> / <span class="text-[#9cdcfe]">window_count</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f64</span> &#125;)</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'GPU-Accelerated Algorithms' && activeLanguage === 'Image Processing' && activeCodeStep === 3}
                    <!-- Window Extraction Stats -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">window-extraction-stat-helper.rs</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#608b4e]">/// Extract a window from an image at the specified position</span></div>
                        <div><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">extract_window</span>(</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">img</span>: <span class="text-[#569cd6]">&</span><span class="text-[#4ec9b0]">GrayImage</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">center_x</span>: <span class="text-[#4ec9b0]">usize</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">center_y</span>: <span class="text-[#4ec9b0]">usize</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">window_size</span>: <span class="text-[#4ec9b0]">usize</span>,</div>
                        <div>) -> <span class="text-[#4ec9b0]">Result</span>&lt;<span class="text-[#4ec9b0]">Vec</span>&lt;<span class="text-[#4ec9b0]">f64</span>&gt;&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">half_window</span> = <span class="text-[#9cdcfe]">window_size</span> / <span class="text-[#b5cea8]">2</span>;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#569cd6]">mut</span> <span class="text-[#9cdcfe]">window</span> = <span class="text-[#4ec9b0]">Vec</span>::<span class="text-[#dcdcaa]">with_capacity</span>(<span class="text-[#9cdcfe]">window_size</span> * <span class="text-[#9cdcfe]">window_size</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">dy</span> <span class="text-[#c586c0]">in</span> <span class="text-[#b5cea8]">0</span>..<span class="text-[#9cdcfe]">window_size</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">dx</span> <span class="text-[#c586c0]">in</span> <span class="text-[#b5cea8]">0</span>..<span class="text-[#9cdcfe]">window_size</span> &#123;</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">x</span> = <span class="text-[#9cdcfe]">center_x</span> - <span class="text-[#9cdcfe]">half_window</span> + <span class="text-[#9cdcfe]">dx</span>;</div>
                        <div class="pl-12"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">y</span> = <span class="text-[#9cdcfe]">center_y</span> - <span class="text-[#9cdcfe]">half_window</span> + <span class="text-[#9cdcfe]">dy</span>;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">if</span> <span class="text-[#569cd6]">let</span> <span class="text-[#c586c0]">Some</span>(<span class="text-[#9cdcfe]">pixel</span>) = <span class="text-[#9cdcfe]">img</span>.<span class="text-[#dcdcaa]">get_pixel_checked</span>(<span class="text-[#9cdcfe]">x</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">u32</span>, <span class="text-[#9cdcfe]">y</span> <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">u32</span>) &#123;</div>
                        <div class="pl-16"><span class="text-[#9cdcfe]">window</span>.<span class="text-[#dcdcaa]">push</span>(<span class="text-[#9cdcfe]">pixel</span>[<span class="text-[#b5cea8]">0</span>] <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f64</span>);</div>
                        <div class="pl-12">&#125; <span class="text-[#c586c0]">else</span> &#123;</div>
                        <div class="pl-16"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">Err</span>(<span class="text-[#4ec9b0]">anyhow</span>::<span class="text-[#dcdcaa]">anyhow!</span>(<span class="text-[#ce9178]">"Window extends beyond image bounds"</span>));</div>
                        <div class="pl-12">&#125;</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">Ok</span>(<span class="text-[#9cdcfe]">window</span>)</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#608b4e]">/// Calculate statistics for a window</span></div>
                        <div><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">calculate_window_stats</span>(<span class="text-[#9cdcfe]">window</span>: <span class="text-[#569cd6]">&</span>[<span class="text-[#4ec9b0]">f64</span>]) -> <span class="text-[#4ec9b0]">WindowStats</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">mean</span> = <span class="text-[#9cdcfe]">window</span>.<span class="text-[#dcdcaa]">iter</span>().<span class="text-[#dcdcaa]">sum</span>::&lt;<span class="text-[#4ec9b0]">f64</span>&gt;() / <span class="text-[#9cdcfe]">window</span>.<span class="text-[#dcdcaa]">len</span>() <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f64</span>;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">variance</span> = <span class="text-[#9cdcfe]">window</span></div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">iter</span>()</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">map</span>(|<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">x</span>| (<span class="text-[#9cdcfe]">x</span> - <span class="text-[#9cdcfe]">mean</span>).<span class="text-[#dcdcaa]">powi</span>(<span class="text-[#b5cea8]">2</span>))</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">sum</span>::&lt;<span class="text-[#4ec9b0]">f64</span>&gt;() / <span class="text-[#9cdcfe]">window</span>.<span class="text-[#dcdcaa]">len</span>() <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f64</span>;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">std_dev</span> = <span class="text-[#9cdcfe]">variance</span>.<span class="text-[#dcdcaa]">sqrt</span>();</div>
                        <div class="pl-4"><span class="text-[#4ec9b0]">WindowStats</span> &#123; <span class="text-[#9cdcfe]">mean</span>, <span class="text-[#9cdcfe]">variance</span>, <span class="text-[#9cdcfe]">std_dev</span> &#125;</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#608b4e]">/// Calculate covariance between two windows</span></div>
                        <div><span class="text-[#569cd6]">fn</span> <span class="text-[#dcdcaa]">calculate_covariance</span>(<span class="text-[#9cdcfe]">window1</span>: <span class="text-[#569cd6]">&</span>[<span class="text-[#4ec9b0]">f64</span>], <span class="text-[#9cdcfe]">window2</span>: <span class="text-[#569cd6]">&</span>[<span class="text-[#4ec9b0]">f64</span>], <span class="text-[#9cdcfe]">mean1</span>: <span class="text-[#4ec9b0]">f64</span>, <span class="text-[#9cdcfe]">mean2</span>: <span class="text-[#4ec9b0]">f64</span>) -> <span class="text-[#4ec9b0]">f64</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">window1</span></div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">iter</span>()</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">zip</span>(<span class="text-[#9cdcfe]">window2</span>.<span class="text-[#dcdcaa]">iter</span>())</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">map</span>(|(<span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">x1</span>, <span class="text-[#569cd6]">&</span><span class="text-[#9cdcfe]">x2</span>)| (<span class="text-[#9cdcfe]">x1</span> - <span class="text-[#9cdcfe]">mean1</span>) * (<span class="text-[#9cdcfe]">x2</span> - <span class="text-[#9cdcfe]">mean2</span>))</div>
                        <div class="pl-8">.<span class="text-[#dcdcaa]">sum</span>::&lt;<span class="text-[#4ec9b0]">f64</span>&gt;() / <span class="text-[#9cdcfe]">window1</span>.<span class="text-[#dcdcaa]">len</span>() <span class="text-[#569cd6]">as</span> <span class="text-[#4ec9b0]">f64</span></div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'Svelte' && activeCodeStep === 0}
                    <!-- Converter Page -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">converter-page.svelte</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div>&lt;<span class="text-[#569cd6]">script</span> <span class="text-[#9cdcfe]">lang</span>=<span class="text-[#ce9178]">"ts"</span>&gt;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">import</span> &#123; <span class="text-[#9cdcfe]">onMount</span> &#125; <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'svelte'</span>;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">// Derived states to manage UI</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">uiState</span> = <span class="text-[#dcdcaa]">$derived</span>(<span class="text-[#9cdcfe]">files</span>.<span class="text-[#9cdcfe]">length</span> === <span class="text-[#b5cea8]">0</span> ? <span class="text-[#ce9178]">'EMPTY'</span> : <span class="text-[#ce9178]">'LOADED'</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">canConvert</span> = <span class="text-[#dcdcaa]">$derived</span>(<span class="text-[#9cdcfe]">hasFiles</span> && !<span class="text-[#9cdcfe]">isProcessing</span> && <span class="text-[#9cdcfe]">pageLoaded</span>);</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">// Initialize config store and restore saved images</div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">onMount</span>(<span class="text-[#c586c0]">async</span> () => &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">algorithmConfigStore</span>.<span class="text-[#dcdcaa]">initialize</span>();</div>
                        <div class="pl-8"><span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">wasmWorkerService</span>.<span class="text-[#dcdcaa]">initialize</span>(&#123;&#125;);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">hasRestoredImages</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">converterState</span>.<span class="text-[#dcdcaa]">loadSavedImageState</span>();</div>
                        <div class="pl-4">&#125;);</div>
                        <div class="mt-1"></div>
                        <div class="pl-4 text-[#6a9955]">// Handle conversion of all selected files</div>
                        <div class="pl-4"><span class="text-[#c586c0]">async</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">handleConvert</span>() &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (!<span class="text-[#9cdcfe]">canConvert</span>) <span class="text-[#c586c0]">return</span>;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">isProcessing</span> = <span class="text-[#569cd6]">true</span>;</div>
                        <div class="mt-1"></div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">config</span> = <span class="text-[#9cdcfe]">algorithmConfigStore</span>.<span class="text-[#dcdcaa]">getCurrentConfig</span>();</div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">result</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">wasmWorkerService</span>.<span class="text-[#dcdcaa]">processImage</span>(<span class="text-[#9cdcfe]">imageData</span>, <span class="text-[#9cdcfe]">config</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">isProcessing</span> = <span class="text-[#569cd6]">false</span>;</div>
                        <div class="pl-4">&#125;</div>
                        <div>&lt;/<span class="text-[#569cd6]">script</span>&gt;</div>
                        <div class="mb-2"></div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'Svelte' && activeCodeStep === 1}
                    <!-- Settings Panel -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">settings-panel.svelte</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div>&lt;<span class="text-[#569cd6]">script</span> <span class="text-[#9cdcfe]">lang</span>=<span class="text-[#ce9178]">"ts"</span>&gt;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">import</span> &#123; <span class="text-[#9cdcfe]">algorithmConfigStore</span> &#125; <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'$lib/stores/algorithm-config-store.svelte'</span>;</div>
                        <div class="mb-2"></div>
                        <div class="pl-4"><span class="text-[#608b4e]">// UI state for panel expansion with localStorage persistence</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">isQuickSettingsExpanded</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#dcdcaa]">loadPanelState</span>(<span class="text-[#ce9178]">'isQuickSettingsExpanded'</span>, <span class="text-[#569cd6]">true</span>));</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">isAdvancedSettingsExpanded</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#dcdcaa]">loadPanelState</span>(<span class="text-[#ce9178]">'isAdvancedSettingsExpanded'</span>, <span class="text-[#569cd6]">false</span>));</div>
                        <div class="mb-2"></div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Detect mobile view with debounced resize handler</span></div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">isMobile</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#569cd6]">false</span>);</div>
                        <div class="pl-4"><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">resizeTimer</span>: <span class="text-[#4ec9b0]">ReturnType</span>&lt;<span class="text-[#569cd6]">typeof</span> <span class="text-[#dcdcaa]">setTimeout</span>&gt; | <span class="text-[#569cd6]">null</span> = <span class="text-[#569cd6]">null</span>;</div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">$effect</span>(() => &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (<span class="text-[#569cd6]">typeof</span> <span class="text-[#9cdcfe]">window</span> === <span class="text-[#ce9178]">'undefined'</span>) <span class="text-[#c586c0]">return</span>;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">const</span> <span class="text-[#dcdcaa]">checkMobile</span> = () => &#123; <span class="text-[#9cdcfe]">isMobile</span> = <span class="text-[#9cdcfe]">window</span>.<span class="text-[#9cdcfe]">innerWidth</span> &lt;= <span class="text-[#b5cea8]">768</span>; &#125;;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">const</span> <span class="text-[#dcdcaa]">handleResize</span> = () => &#123;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">resizeTimer</span>) <span class="text-[#dcdcaa]">clearTimeout</span>(<span class="text-[#9cdcfe]">resizeTimer</span>);</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">resizeTimer</span> = <span class="text-[#dcdcaa]">setTimeout</span>(<span class="text-[#9cdcfe]">checkMobile</span>, <span class="text-[#b5cea8]">150</span>);</div>
                        <div class="pl-8">&#125;;</div>
                        <div class="pl-8"><span class="text-[#dcdcaa]">checkMobile</span>();</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">window</span>.<span class="text-[#dcdcaa]">addEventListener</span>(<span class="text-[#ce9178]">'resize'</span>, <span class="text-[#9cdcfe]">handleResize</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">return</span> () => &#123;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">resizeTimer</span>) <span class="text-[#dcdcaa]">clearTimeout</span>(<span class="text-[#9cdcfe]">resizeTimer</span>);</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">window</span>.<span class="text-[#dcdcaa]">removeEventListener</span>(<span class="text-[#ce9178]">'resize'</span>, <span class="text-[#9cdcfe]">handleResize</span>);</div>
                        <div class="pl-8">&#125;;</div>
                        <div class="pl-4">&#125;);</div>
                        <div>&lt;/<span class="text-[#569cd6]">script</span>&gt;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'Svelte' && activeCodeStep === 2}
                    <!-- Auto-Animate Slider -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">auto-animate-slider.svelte</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div>&lt;<span class="text-[#569cd6]">script</span> <span class="text-[#9cdcfe]">lang</span>=<span class="text-[#ce9178]">"ts"</span>&gt;</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">animationKey</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#b5cea8]">0</span>);</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">previousResetTrigger</span> = <span class="text-[#dcdcaa]">$state</span>(-<span class="text-[#b5cea8]">1</span>);</div>
                        <div><span class="text-[#dcdcaa]">$effect</span>(() => &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">resetTrigger</span> !== <span class="text-[#9cdcfe]">previousResetTrigger</span> && <span class="text-[#9cdcfe]">resetTrigger</span> !== -<span class="text-[#b5cea8]">1</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">previousResetTrigger</span> = <span class="text-[#9cdcfe]">resetTrigger</span>;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">animationKey</span> = <span class="text-[#4ec9b0]">Date</span>.<span class="text-[#dcdcaa]">now</span>(); <span class="text-[#608b4e]">// force re-render to restart animation</span></div>
                        <div class="pl-4">&#125; <span class="text-[#c586c0]">else if</span> (<span class="text-[#9cdcfe]">resetTrigger</span> === -<span class="text-[#b5cea8]">1</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">previousResetTrigger</span> = <span class="text-[#9cdcfe]">resetTrigger</span>; <span class="text-[#608b4e]">// stop animation</span></div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;);</div>
                        <div>&lt;/<span class="text-[#569cd6]">script</span>&gt;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'Svelte' && activeCodeStep === 3}
                    <!-- GPU Status Component -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">gpu-status-component.svelte</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div>&lt;<span class="text-[#569cd6]">script</span> <span class="text-[#9cdcfe]">lang</span>=<span class="text-[#ce9178]">"ts"</span>&gt;</div>
                        <div><span class="text-[#c586c0]">import</span> &#123; <span class="text-[#9cdcfe]">onMount</span> &#125; <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'svelte'</span>;</div>
                        <div><span class="text-[#c586c0]">import</span> &#123; <span class="text-[#9cdcfe]">gpuService</span>, <span class="text-[#569cd6]">type</span> <span class="text-[#4ec9b0]">GpuCapabilities</span> &#125; <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'$lib/services/gpu-service'</span>;</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">capabilities</span>: <span class="text-[#4ec9b0]">GpuCapabilities</span> | <span class="text-[#569cd6]">null</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#569cd6]">null</span>);</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">loading</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#569cd6]">true</span>);</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">error</span> = <span class="text-[#dcdcaa]">$state</span>&lt;<span class="text-[#4ec9b0]">string</span> | <span class="text-[#569cd6]">null</span>&gt;(<span class="text-[#569cd6]">null</span>);</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">performanceSummary</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#ce9178]">''</span>);</div>
                        <div><span class="text-[#dcdcaa]">onMount</span>(<span class="text-[#c586c0]">async</span> () => &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">try</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">gpuService</span>.<span class="text-[#dcdcaa]">initialize</span>();</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">capabilities</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">gpuService</span>.<span class="text-[#dcdcaa]">getCapabilities</span>();</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">performanceSummary</span> = <span class="text-[#9cdcfe]">gpuService</span>.<span class="text-[#dcdcaa]">getPerformanceSummary</span>();</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">loading</span> = <span class="text-[#569cd6]">false</span>;</div>
                        <div class="pl-4">&#125; <span class="text-[#c586c0]">catch</span> (<span class="text-[#9cdcfe]">e</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">error</span> = <span class="text-[#9cdcfe]">e</span> <span class="text-[#c586c0]">instanceof</span> <span class="text-[#4ec9b0]">Error</span> ? <span class="text-[#9cdcfe]">e</span>.<span class="text-[#9cdcfe]">message</span> : <span class="text-[#4ec9b0]">String</span>(<span class="text-[#9cdcfe]">e</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">loading</span> = <span class="text-[#569cd6]">false</span>;</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;);</div>
                        <div>&lt;/<span class="text-[#569cd6]">script</span>&gt;</div>
                        <div>&#123;#<span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">loading</span>&#125;</div>
                        <div class="pl-4"><span class="text-[#ce9178]">Loading GPU status...</span></div>
                        <div>&#123;:<span class="text-[#c586c0]">else if</span> <span class="text-[#9cdcfe]">error</span>&#125;</div>
                        <div class="pl-4"><span class="text-[#ce9178]">Error: &#123;error&#125;</span></div>
                        <div>&#123;:<span class="text-[#c586c0]">else if</span> <span class="text-[#9cdcfe]">capabilities</span>&#125;</div>
                        <div class="pl-4"><span class="text-[#ce9178]">Status: &#123;capabilities.available ? 'Available' : 'Not Available'&#125;</span></div>
                        <div>&#123;/<span class="text-[#c586c0]">if</span>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'Svelte' && activeCodeStep === 4}
                    <!-- Portal Component -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">portal-component.svelte</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div>&lt;<span class="text-[#569cd6]">script</span> <span class="text-[#9cdcfe]">lang</span>=<span class="text-[#ce9178]">"ts"</span>&gt;</div>
                        <div><span class="text-[#c586c0]">import</span> &#123; <span class="text-[#9cdcfe]">onMount</span>, <span class="text-[#9cdcfe]">tick</span> &#125; <span class="text-[#c586c0]">from</span> <span class="text-[#ce9178]">'svelte'</span>;</div>
                        <div><span class="text-[#569cd6]">interface</span> <span class="text-[#4ec9b0]">Props</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">target</span>?: <span class="text-[#4ec9b0]">Element</span> | <span class="text-[#4ec9b0]">string</span>;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">children</span>?: <span class="text-[#c586c0]">import</span>(<span class="text-[#ce9178]">'svelte'</span>).<span class="text-[#4ec9b0]">Snippet</span>;</div>
                        <div>&#125;</div>
                        <div><span class="text-[#569cd6]">let</span> &#123; <span class="text-[#9cdcfe]">target</span> = <span class="text-[#ce9178]">'body'</span>, <span class="text-[#9cdcfe]">children</span> &#125;: <span class="text-[#4ec9b0]">Props</span> = <span class="text-[#dcdcaa]">$props</span>();</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">portal</span>: <span class="text-[#4ec9b0]">Element</span>;</div>
                        <div><span class="text-[#569cd6]">let</span> <span class="text-[#9cdcfe]">mounted</span> = <span class="text-[#dcdcaa]">$state</span>(<span class="text-[#569cd6]">false</span>);</div>
                        <div><span class="text-[#dcdcaa]">onMount</span>(<span class="text-[#c586c0]">async</span> () => &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">tick</span>();</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">portal</span> = <span class="text-[#569cd6]">typeof</span> <span class="text-[#9cdcfe]">target</span> === <span class="text-[#ce9178]">'string'</span></div>
                        <div class="pl-8">? <span class="text-[#9cdcfe]">document</span>.<span class="text-[#dcdcaa]">querySelector</span>(<span class="text-[#9cdcfe]">target</span>) ?? <span class="text-[#9cdcfe]">document</span>.<span class="text-[#9cdcfe]">body</span></div>
                        <div class="pl-8">: <span class="text-[#9cdcfe]">target</span>;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">mounted</span> = <span class="text-[#569cd6]">true</span>;</div>
                        <div>&#125;);</div>
                        <div>&lt;/<span class="text-[#569cd6]">script</span>&gt;</div>
                        <div>&#123;#<span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">mounted</span> && <span class="text-[#9cdcfe]">portal</span>&#125;</div>
                        <div class="pl-4">&#123;<span class="text-[#569cd6]">@render</span> <span class="text-[#9cdcfe]">children</span>?.()&#125;</div>
                        <div>&#123;/<span class="text-[#c586c0]">if</span>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'TypeScript' && activeCodeStep === 0}
                    <!-- Vectorizer Service -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">vectorizer-service.ts</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#c586c0]">async</span> <span class="text-[#dcdcaa]">initialize</span>(<span class="text-[#9cdcfe]">options</span>?: &#123; <span class="text-[#9cdcfe]">threadCount</span>?: <span class="text-[#4ec9b0]">number</span>; <span class="text-[#9cdcfe]">autoInitThreads</span>?: <span class="text-[#4ec9b0]">boolean</span> &#125;): <span class="text-[#4ec9b0]">Promise</span>&lt;<span class="text-[#4ec9b0]">void</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (!<span class="text-[#9cdcfe]">browser</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">throw</span> <span class="text-[#c586c0]">new</span> <span class="text-[#4ec9b0]">Error</span>(<span class="text-[#ce9178]">'VectorizerService can only be initialized in the browser'</span>);</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">isInitialized</span>) <span class="text-[#c586c0]">return</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">initializationPromise</span>) <span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">initializationPromise</span>;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">initializationPromise</span> = <span class="text-[#9cdcfe]">this</span>.<span class="text-[#dcdcaa]">_doInitialize</span>(<span class="text-[#9cdcfe]">options</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">initializationPromise</span>;</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#569cd6]">private</span> <span class="text-[#c586c0]">async</span> <span class="text-[#dcdcaa]">_doInitialize</span>(<span class="text-[#9cdcfe]">options</span>?: &#123; <span class="text-[#9cdcfe]">threadCount</span>?: <span class="text-[#4ec9b0]">number</span>; <span class="text-[#9cdcfe]">autoInitThreads</span>?: <span class="text-[#4ec9b0]">boolean</span> &#125;): <span class="text-[#4ec9b0]">Promise</span>&lt;<span class="text-[#4ec9b0]">void</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">try</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#608b4e]">// Lazy-load the vectorizer and create a new instance</span></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">wasmModule</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">loadVectorizer</span>(&#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">initializeThreads</span>: <span class="text-[#9cdcfe]">options</span>?.<span class="text-[#9cdcfe]">autoInitThreads</span> ?? <span class="text-[#569cd6]">false</span>,</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">threadCount</span>: <span class="text-[#9cdcfe]">options</span>?.<span class="text-[#9cdcfe]">threadCount</span>,</div>
                        <div class="pl-8">&#125;);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">vectorizer</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">createVectorizer</span>();</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">isInitialized</span> = <span class="text-[#569cd6]">true</span>;</div>
                        <div class="pl-4">&#125; <span class="text-[#c586c0]">catch</span> (<span class="text-[#9cdcfe]">error</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">wasmError</span>: <span class="text-[#4ec9b0]">VectorizerError</span> = &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">type</span>: <span class="text-[#ce9178]">'unknown'</span>,</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">message</span>: <span class="text-[#ce9178]">'Failed to initialize WASM module'</span>,</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">details</span>: <span class="text-[#9cdcfe]">error</span> <span class="text-[#c586c0]">instanceof</span> <span class="text-[#4ec9b0]">Error</span> ? <span class="text-[#9cdcfe]">error</span>.<span class="text-[#9cdcfe]">message</span> : <span class="text-[#4ec9b0]">String</span>(<span class="text-[#9cdcfe]">error</span>),</div>
                        <div class="pl-8">&#125;;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">throw</span> <span class="text-[#9cdcfe]">wasmError</span>;</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'TypeScript' && activeCodeStep === 1}
                    <!-- Converter State Store -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">converter-state-store.ts</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#c586c0]">async</span> <span class="text-[#dcdcaa]">setInputFile</span>(<span class="text-[#9cdcfe]">file</span>: <span class="text-[#4ec9b0]">File</span>): <span class="text-[#4ec9b0]">Promise</span>&lt;<span class="text-[#4ec9b0]">void</span>&gt; &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">try</span> &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#dcdcaa]">clearError</span>();</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">_imageState</span>.<span class="text-[#9cdcfe]">input_file</span> = <span class="text-[#9cdcfe]">file</span>;</div>
                        <div class="mb-2"></div>
                        <div class="pl-8"><span class="text-[#608b4e]">// Convert file into ImageData</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">imageData</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">this</span>.<span class="text-[#dcdcaa]">fileToImageData</span>(<span class="text-[#9cdcfe]">file</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">_imageState</span>.<span class="text-[#9cdcfe]">input_image</span> = <span class="text-[#9cdcfe]">imageData</span>;</div>
                        <div class="mb-2"></div>
                        <div class="pl-8"><span class="text-[#608b4e]">// Persist the file to IndexedDB for session restoration</span></div>
                        <div class="pl-8"><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">result</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">imagePersistence</span>.<span class="text-[#dcdcaa]">saveImageSession</span>([<span class="text-[#9cdcfe]">file</span>]);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">result</span>.<span class="text-[#9cdcfe]">success</span> && <span class="text-[#9cdcfe]">result</span>.<span class="text-[#9cdcfe]">sessionId</span>) &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#9cdcfe]">currentSessionId</span> = <span class="text-[#9cdcfe]">result</span>.<span class="text-[#9cdcfe]">sessionId</span>;</div>
                        <div class="pl-8">&#125;</div>
                        <div class="mb-2"></div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">console</span>.<span class="text-[#dcdcaa]">log</span>(<span class="text-[#ce9178]">`[ConverterStateStore] Set input file: $&#123;file.name&#125; ($&#123;imageData.width&#125;x$&#123;imageData.height&#125;)`</span>);</div>
                        <div class="pl-4">&#125; <span class="text-[#c586c0]">catch</span> (<span class="text-[#9cdcfe]">error</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">fileError</span> = &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">type</span>: <span class="text-[#ce9178]">'processing'</span> <span class="text-[#569cd6]">as</span> <span class="text-[#569cd6]">const</span>,</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">message</span>: <span class="text-[#ce9178]">'Failed to load image file'</span>,</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">details</span>: <span class="text-[#9cdcfe]">error</span> <span class="text-[#c586c0]">instanceof</span> <span class="text-[#4ec9b0]">Error</span> ? <span class="text-[#9cdcfe]">error</span>.<span class="text-[#9cdcfe]">message</span> : <span class="text-[#4ec9b0]">String</span>(<span class="text-[#9cdcfe]">error</span>),</div>
                        <div class="pl-8">&#125;;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">this</span>.<span class="text-[#dcdcaa]">setError</span>(<span class="text-[#9cdcfe]">fileError</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">throw</span> <span class="text-[#9cdcfe]">error</span>;</div>
                        <div class="pl-4">&#125;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Frontend User Experience' && activeLanguage === 'TypeScript' && activeCodeStep === 2}
                    <!-- Optimized Image Helpers -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">optimized-image-helpers.ts</div>
                      </div>

                      <!-- Code content -->
                      <div class="p-2 text-xs font-mono leading-relaxed text-[#d4d4d4] overflow-y-auto max-h-[300px]">
                        <div><span class="text-[#569cd6]">function</span> <span class="text-[#dcdcaa]">getFormatSource</span>(<span class="text-[#9cdcfe]">format</span>: <span class="text-[#4ec9b0]">string</span>): <span class="text-[#4ec9b0]">string</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">lastDot</span> = <span class="text-[#9cdcfe]">src</span>.<span class="text-[#dcdcaa]">lastIndexOf</span>(<span class="text-[#ce9178]">'.'</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">lastDot</span> === -<span class="text-[#b5cea8]">1</span>) <span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">src</span>;</div>
                        <div class="pl-4"><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">basePath</span> = <span class="text-[#9cdcfe]">src</span>.<span class="text-[#dcdcaa]">substring</span>(<span class="text-[#b5cea8]">0</span>, <span class="text-[#9cdcfe]">lastDot</span>);</div>
                        <div class="pl-4"><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">currentExt</span> = <span class="text-[#9cdcfe]">src</span>.<span class="text-[#dcdcaa]">substring</span>(<span class="text-[#9cdcfe]">lastDot</span> + <span class="text-[#b5cea8]">1</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">currentExt</span> === <span class="text-[#9cdcfe]">format</span>) <span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">src</span>;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Special handling: convert before image to after-webp</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">format</span> === <span class="text-[#ce9178]">'webp'</span> && <span class="text-[#9cdcfe]">src</span>.<span class="text-[#dcdcaa]">includes</span>(<span class="text-[#ce9178]">'/before/'</span>)) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">src</span></div>
                        <div class="pl-12">.<span class="text-[#dcdcaa]">replace</span>(<span class="text-[#ce9178]">'/before/'</span>, <span class="text-[#ce9178]">'/after-webp/'</span>)</div>
                        <div class="pl-12">.<span class="text-[#dcdcaa]">replace</span>(<span class="text-[#ce9178]">/\.[^.]+$/</span>, <span class="text-[#ce9178]">'.webp'</span>);</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4"><span class="text-[#608b4e]">// Otherwise, assume alternate formats exist with the same base name</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#ce9178]">`$&#123;basePath&#125;.$&#123;format&#125;`</span>;</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                        <div><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">originalFormat</span> = <span class="text-[#9cdcfe]">src</span>.<span class="text-[#dcdcaa]">split</span>(<span class="text-[#ce9178]">'.'</span>).<span class="text-[#dcdcaa]">pop</span>()?.<span class="text-[#dcdcaa]">toLowerCase</span>() || <span class="text-[#ce9178]">'jpg'</span>;</div>
                        <div><span class="text-[#569cd6]">const</span> <span class="text-[#9cdcfe]">useFormats</span> = <span class="text-[#9cdcfe]">formats</span>.<span class="text-[#9cdcfe]">length</span> > <span class="text-[#b5cea8]">0</span></div>
                        <div class="pl-4">? <span class="text-[#9cdcfe]">formats</span></div>
                        <div class="pl-4">: <span class="text-[#9cdcfe]">originalFormat</span> === <span class="text-[#ce9178]">'avif'</span></div>
                        <div class="pl-8">? [<span class="text-[#ce9178]">'avif'</span>, <span class="text-[#ce9178]">'webp'</span>, <span class="text-[#ce9178]">'jpg'</span>]</div>
                        <div class="pl-8">: <span class="text-[#9cdcfe]">originalFormat</span> === <span class="text-[#ce9178]">'webp'</span></div>
                        <div class="pl-12">? [<span class="text-[#ce9178]">'webp'</span>, <span class="text-[#ce9178]">'jpg'</span>]</div>
                        <div class="pl-12">: [<span class="text-[#ce9178]">'avif'</span>, <span class="text-[#ce9178]">'webp'</span>, <span class="text-[#9cdcfe]">originalFormat</span> <span class="text-[#569cd6]">as</span> <span class="text-[#569cd6]">any</span>];</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Performance & Optimization' && activeLanguage === 'TypeScript' && activeCodeStep === 0}
                    <!-- Performance Utils -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">performance.ts</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div class="text-[#6a9955]">// Debounce function – wait delay ms after last call before invoking</div>
                        <div><span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">debounce</span>&lt;<span class="text-[#4ec9b0]">T</span> <span class="text-[#c586c0]">extends</span> (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#c586c0]">any</span>[]) =&gt; <span class="text-[#c586c0]">any</span>&gt;(<span class="text-[#9cdcfe]">fn</span>: <span class="text-[#4ec9b0]">T</span>, <span class="text-[#9cdcfe]">delay</span>: <span class="text-[#4ec9b0]">number</span>): <span class="text-[#4ec9b0]">T</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">timer</span>: <span class="text-[#4ec9b0]">ReturnType</span>&lt;<span class="text-[#c586c0]">typeof</span> <span class="text-[#dcdcaa]">setTimeout</span>&gt; | <span class="text-[#569cd6]">null</span> = <span class="text-[#569cd6]">null</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">function</span> (<span class="text-[#c586c0]">this</span>: <span class="text-[#c586c0]">any</span>, ...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#c586c0]">any</span>[]) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">timer</span>) <span class="text-[#dcdcaa]">clearTimeout</span>(<span class="text-[#9cdcfe]">timer</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">timer</span> = <span class="text-[#dcdcaa]">setTimeout</span>(() => <span class="text-[#9cdcfe]">fn</span>.<span class="text-[#dcdcaa]">apply</span>(<span class="text-[#c586c0]">this</span>, <span class="text-[#9cdcfe]">args</span>), <span class="text-[#9cdcfe]">delay</span>);</div>
                        <div class="pl-4">&#125; <span class="text-[#c586c0]">as</span> <span class="text-[#4ec9b0]">T</span>;</div>
                        <div>&#125;</div>
                        <div class="mt-1"></div>
                        <div class="text-[#6a9955]">// Throttle function – invoke at most once per interval</div>
                        <div><span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">throttle</span>&lt;<span class="text-[#4ec9b0]">T</span> <span class="text-[#c586c0]">extends</span> (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#c586c0]">any</span>[]) =&gt; <span class="text-[#c586c0]">any</span>&gt;(<span class="text-[#9cdcfe]">fn</span>: <span class="text-[#4ec9b0]">T</span>, <span class="text-[#9cdcfe]">interval</span>: <span class="text-[#4ec9b0]">number</span>): <span class="text-[#4ec9b0]">T</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">lastCallTime</span> = <span class="text-[#b5cea8]">0</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">function</span> (<span class="text-[#c586c0]">this</span>: <span class="text-[#c586c0]">any</span>, ...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#c586c0]">any</span>[]) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">now</span> = <span class="text-[#4ec9b0]">Date</span>.<span class="text-[#dcdcaa]">now</span>();</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">now</span> - <span class="text-[#9cdcfe]">lastCallTime</span> >= <span class="text-[#9cdcfe]">interval</span>) &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">lastCallTime</span> = <span class="text-[#9cdcfe]">now</span>;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">fn</span>.<span class="text-[#dcdcaa]">apply</span>(<span class="text-[#c586c0]">this</span>, <span class="text-[#9cdcfe]">args</span>);</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-4">&#125; <span class="text-[#c586c0]">as</span> <span class="text-[#4ec9b0]">T</span>;</div>
                        <div>&#125;</div>
                        <div class="mb-2"></div>
                      </div>
                    </div>
                  {:else if activeSection === 'Performance & Optimization' && activeLanguage === 'TypeScript' && activeCodeStep === 1}
                    <!-- Memoization Helper -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">memoization-helper.ts</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div><span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">memoize</span>&lt;<span class="text-[#4ec9b0]">T</span> <span class="text-[#c586c0]">extends</span> (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#c586c0]">any</span>[]) =&gt; <span class="text-[#c586c0]">any</span>&gt;(</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">func</span>: <span class="text-[#4ec9b0]">T</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">keyGenerator</span>?: (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#4ec9b0]">Parameters</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;) =&gt; <span class="text-[#c586c0]">string</span></div>
                        <div>): <span class="text-[#4ec9b0]">T</span> &amp; &#123; <span class="text-[#9cdcfe]">cache</span>: <span class="text-[#4ec9b0]">Map</span>&lt;<span class="text-[#c586c0]">string</span>, <span class="text-[#4ec9b0]">ReturnType</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;&gt;; <span class="text-[#9cdcfe]">clearCache</span>: () =&gt; <span class="text-[#c586c0]">void</span> &#125; &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">cache</span> = <span class="text-[#c586c0]">new</span> <span class="text-[#4ec9b0]">Map</span>&lt;<span class="text-[#c586c0]">string</span>, <span class="text-[#4ec9b0]">ReturnType</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;&gt;();</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">memoizedFunc</span> = (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#4ec9b0]">Parameters</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;): <span class="text-[#4ec9b0]">ReturnType</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt; =&gt; &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">key</span> = <span class="text-[#9cdcfe]">keyGenerator</span> ? <span class="text-[#dcdcaa]">keyGenerator</span>(...<span class="text-[#9cdcfe]">args</span>) : <span class="text-[#4ec9b0]">JSON</span>.<span class="text-[#dcdcaa]">stringify</span>(<span class="text-[#9cdcfe]">args</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">cache</span>.<span class="text-[#dcdcaa]">has</span>(<span class="text-[#9cdcfe]">key</span>)) &#123;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">cache</span>.<span class="text-[#dcdcaa]">get</span>(<span class="text-[#9cdcfe]">key</span>)!;</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">result</span> = <span class="text-[#dcdcaa]">func</span>(...<span class="text-[#9cdcfe]">args</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">cache</span>.<span class="text-[#dcdcaa]">set</span>(<span class="text-[#9cdcfe]">key</span>, <span class="text-[#9cdcfe]">result</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">result</span>;</div>
                        <div class="pl-4">&#125;;</div>
                        <div class="pl-4">(<span class="text-[#9cdcfe]">memoizedFunc</span> <span class="text-[#c586c0]">as</span> <span class="text-[#c586c0]">any</span>).<span class="text-[#9cdcfe]">cache</span> = <span class="text-[#9cdcfe]">cache</span>;</div>
                        <div class="pl-4">(<span class="text-[#9cdcfe]">memoizedFunc</span> <span class="text-[#c586c0]">as</span> <span class="text-[#c586c0]">any</span>).<span class="text-[#9cdcfe]">clearCache</span> = () =&gt; <span class="text-[#9cdcfe]">cache</span>.<span class="text-[#dcdcaa]">clear</span>();</div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">memoizedFunc</span> <span class="text-[#c586c0]">as</span> <span class="text-[#c586c0]">any</span>;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Performance & Optimization' && activeLanguage === 'TypeScript' && activeCodeStep === 2}
                    <!-- Debounce & Throttle -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">debounce-and-throttle-utility.ts</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div class="text-[#6a9955]">// Debounce function: invokes `func` after `wait` milliseconds of inactivity</div>
                        <div><span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">debounce</span>&lt;<span class="text-[#4ec9b0]">T</span> <span class="text-[#c586c0]">extends</span> (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#c586c0]">any</span>[]) =&gt; <span class="text-[#c586c0]">any</span>&gt;(</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">func</span>: <span class="text-[#4ec9b0]">T</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">wait</span>: <span class="text-[#c586c0]">number</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">immediate</span>?: <span class="text-[#c586c0]">boolean</span></div>
                        <div>): (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#4ec9b0]">Parameters</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;) =&gt; <span class="text-[#c586c0]">void</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">timeout</span>: <span class="text-[#4ec9b0]">NodeJS</span>.<span class="text-[#4ec9b0]">Timeout</span> | <span class="text-[#569cd6]">null</span> = <span class="text-[#569cd6]">null</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">executedFunction</span>(...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#4ec9b0]">Parameters</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#dcdcaa]">later</span> = () =&gt; &#123;</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">timeout</span> = <span class="text-[#569cd6]">null</span>;</div>
                        <div class="pl-12"><span class="text-[#c586c0]">if</span> (!<span class="text-[#9cdcfe]">immediate</span>) <span class="text-[#dcdcaa]">func</span>(...<span class="text-[#9cdcfe]">args</span>);</div>
                        <div class="pl-8">&#125;;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">callNow</span> = <span class="text-[#9cdcfe]">immediate</span> &amp;&amp; !<span class="text-[#9cdcfe]">timeout</span>;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">timeout</span>) <span class="text-[#dcdcaa]">clearTimeout</span>(<span class="text-[#9cdcfe]">timeout</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">timeout</span> = <span class="text-[#dcdcaa]">setTimeout</span>(<span class="text-[#9cdcfe]">later</span>, <span class="text-[#9cdcfe]">wait</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">callNow</span>) <span class="text-[#dcdcaa]">func</span>(...<span class="text-[#9cdcfe]">args</span>);</div>
                        <div class="pl-4">&#125;;</div>
                        <div>&#125;</div>
                        <div class="mt-1"></div>
                        <div class="text-[#6a9955]">// Throttle function: ensures `func` is called at most once every `limit` milliseconds</div>
                        <div><span class="text-[#c586c0]">export</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">throttle</span>&lt;<span class="text-[#4ec9b0]">T</span> <span class="text-[#c586c0]">extends</span> (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#c586c0]">any</span>[]) =&gt; <span class="text-[#c586c0]">any</span>&gt;(</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">func</span>: <span class="text-[#4ec9b0]">T</span>,</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">limit</span>: <span class="text-[#c586c0]">number</span></div>
                        <div>): (...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#4ec9b0]">Parameters</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;) =&gt; <span class="text-[#c586c0]">void</span> &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">inThrottle</span>: <span class="text-[#c586c0]">boolean</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">executedFunction</span>(...<span class="text-[#9cdcfe]">args</span>: <span class="text-[#4ec9b0]">Parameters</span>&lt;<span class="text-[#4ec9b0]">T</span>&gt;) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">if</span> (!<span class="text-[#9cdcfe]">inThrottle</span>) &#123;</div>
                        <div class="pl-12"><span class="text-[#dcdcaa]">func</span>(...<span class="text-[#9cdcfe]">args</span>);</div>
                        <div class="pl-12"><span class="text-[#9cdcfe]">inThrottle</span> = <span class="text-[#569cd6]">true</span>;</div>
                        <div class="pl-12"><span class="text-[#dcdcaa]">setTimeout</span>(() =&gt; (<span class="text-[#9cdcfe]">inThrottle</span> = <span class="text-[#569cd6]">false</span>), <span class="text-[#9cdcfe]">limit</span>);</div>
                        <div class="pl-8">&#125;</div>
                        <div class="pl-4">&#125;;</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Performance & Optimization' && activeLanguage === 'Build Tools' && activeCodeStep === 0}
                    <!-- WASM Rebuild -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">wasm-rebuild.js</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div class="text-[#6a9955]">// Check and install prerequisites for Rust/WASM</div>
                        <div><span class="text-[#c586c0]">async</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">checkPrerequisites</span>() &#123;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">info</span>(<span class="text-[#ce9178]">'Checking prerequisites...'</span>);</div>
                        <div class="pl-4 text-[#6a9955]">// Install Rust if needed</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (!<span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">commandExists</span>(<span class="text-[#ce9178]">'rustc'</span>)) &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">warning</span>(<span class="text-[#ce9178]">'Rust not found. Installing...'</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">execAsync</span>(<span class="text-[#ce9178]">"curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y"</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">process</span>.<span class="text-[#9cdcfe]">env</span>.<span class="text-[#9cdcfe]">PATH</span> = <span class="text-[#ce9178]">`$&#123;process.env.HOME&#125;/.cargo/bin:$&#123;process.env.PATH&#125;`</span>;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">execAsync</span>(<span class="text-[#ce9178]">'rustup target add wasm32-unknown-unknown'</span>);</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">success</span>(<span class="text-[#ce9178]">'Rust installed'</span>);</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4 text-[#6a9955]">// Install wasm-pack if missing (fallback to cargo)</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (!<span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">commandExists</span>(<span class="text-[#ce9178]">'wasm-pack'</span>)) &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">warning</span>(<span class="text-[#ce9178]">'wasm-pack not found. Installing...'</span>);</div>
                        <div class="pl-8"><span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">execAsync</span>(<span class="text-[#ce9178]">'curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh'</span>)</div>
                        <div class="pl-12">.<span class="text-[#dcdcaa]">catch</span>(<span class="text-[#c586c0]">async</span> () =&gt; &#123;</div>
                        <div class="pl-16"><span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">execAsync</span>(<span class="text-[#ce9178]">'cargo install wasm-pack'</span>);</div>
                        <div class="pl-16"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">success</span>(<span class="text-[#ce9178]">'wasm-pack installed via cargo'</span>);</div>
                        <div class="pl-12">&#125;);</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4 text-[#6a9955]">// Verify versions</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> &#123; <span class="text-[#9cdcfe]">stdout</span>: <span class="text-[#9cdcfe]">rustVersion</span> &#125; = <span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">execAsync</span>(<span class="text-[#ce9178]">'rustc --version'</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> &#123; <span class="text-[#9cdcfe]">stdout</span>: <span class="text-[#9cdcfe]">wasmVersion</span> &#125; = <span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">execAsync</span>(<span class="text-[#ce9178]">'wasm-pack --version'</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">info</span>(<span class="text-[#ce9178]">`Rust: $&#123;rustVersion.trim()&#125;`</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">info</span>(<span class="text-[#ce9178]">`wasm-pack: $&#123;wasmVersion.trim()&#125;`</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">log</span>.<span class="text-[#dcdcaa]">success</span>(<span class="text-[#ce9178]">'Prerequisites check complete'</span>);</div>
                        <div>&#125;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Performance & Optimization' && activeLanguage === 'Build Tools' && activeCodeStep === 1}
                    <!-- WASM Loader -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">wasm-loader.js</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div><span class="text-[#c586c0]">let</span> <span class="text-[#9cdcfe]">wasmModule</span> = <span class="text-[#569cd6]">null</span>;</div>
                        <div class="mt-1"></div>
                        <div><span class="text-[#c586c0]">async</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">loadWasmModule</span>() &#123;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">wasmModule</span>) <span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">wasmModule</span>;</div>
                        <div class="pl-4 text-[#6a9955]">// Load the generated JS wrapper as a script tag</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">script</span> = <span class="text-[#9cdcfe]">document</span>.<span class="text-[#dcdcaa]">createElement</span>(<span class="text-[#ce9178]">'script'</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">script</span>.<span class="text-[#9cdcfe]">src</span> = <span class="text-[#ce9178]">'/wasm/vectorize_wasm.js'</span>;</div>
                        <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">scriptLoaded</span> = <span class="text-[#c586c0]">new</span> <span class="text-[#4ec9b0]">Promise</span>((<span class="text-[#9cdcfe]">resolve</span>, <span class="text-[#9cdcfe]">reject</span>) =&gt; &#123;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">script</span>.<span class="text-[#9cdcfe]">onload</span> = <span class="text-[#9cdcfe]">resolve</span>;</div>
                        <div class="pl-8"><span class="text-[#9cdcfe]">script</span>.<span class="text-[#9cdcfe]">onerror</span> = <span class="text-[#9cdcfe]">reject</span>;</div>
                        <div class="pl-4">&#125;);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">document</span>.<span class="text-[#9cdcfe]">head</span>.<span class="text-[#dcdcaa]">appendChild</span>(<span class="text-[#9cdcfe]">script</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">scriptLoaded</span>;</div>
                        <div class="mt-1"></div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> (<span class="text-[#c586c0]">typeof</span> <span class="text-[#9cdcfe]">wasm_bindgen</span> === <span class="text-[#ce9178]">'undefined'</span>) &#123;</div>
                        <div class="pl-8"><span class="text-[#c586c0]">throw</span> <span class="text-[#c586c0]">new</span> <span class="text-[#4ec9b0]">Error</span>(<span class="text-[#ce9178]">'wasm_bindgen not found after loading script'</span>);</div>
                        <div class="pl-4">&#125;</div>
                        <div class="pl-4 text-[#6a9955]">// Initialize the WASM module</div>
                        <div class="pl-4"><span class="text-[#c586c0]">await</span> <span class="text-[#dcdcaa]">wasm_bindgen</span>(<span class="text-[#ce9178]">'/wasm/vectorize_wasm_bg.wasm'</span>);</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">wasmModule</span> = <span class="text-[#9cdcfe]">wasm_bindgen</span>;</div>
                        <div class="pl-4"><span class="text-[#9cdcfe]">console</span>.<span class="text-[#dcdcaa]">log</span>(<span class="text-[#ce9178]">'✅ WASM module loaded successfully'</span>);</div>
                        <div class="pl-4"><span class="text-[#c586c0]">return</span> <span class="text-[#9cdcfe]">wasmModule</span>;</div>
                        <div>&#125;</div>
                        <div><span class="text-[#9cdcfe]">window</span>.<span class="text-[#9cdcfe]">loadWasmModule</span> = <span class="text-[#9cdcfe]">loadWasmModule</span>;</div>
                      </div>
                    </div>
                  {:else if activeSection === 'Performance & Optimization' && activeLanguage === 'Build Tools' && activeCodeStep === 2}
                    <!-- Vercel Build -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">vercel-build.sh</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div><span class="text-[#6a9955]">#!/bin/bash</span></div>
                        <div><span class="text-[#6a9955]"># Ensure required tools are available</span></div>
                        <div><span class="text-[#c586c0]">if</span> ! <span class="text-[#dcdcaa]">command</span> <span class="text-[#c586c0]">-v</span> <span class="text-[#9cdcfe]">rustc</span> <span class="text-[#c586c0]">&></span> <span class="text-[#ce9178]">/dev/null</span>; <span class="text-[#c586c0]">then</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"🦀 Installing Rust..."</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">curl</span> <span class="text-[#c586c0]">--proto</span> <span class="text-[#ce9178]">'=https'</span> <span class="text-[#c586c0]">--tlsv1.2</span> <span class="text-[#c586c0]">-sSf</span> <span class="text-[#ce9178]">https://sh.rustup.rs</span> | <span class="text-[#dcdcaa]">sh</span> <span class="text-[#c586c0]">-s</span> <span class="text-[#c586c0]">--</span> <span class="text-[#c586c0]">-y</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">source</span> <span class="text-[#9cdcfe]">$HOME</span><span class="text-[#ce9178]">/.cargo/env</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">rustup</span> <span class="text-[#c586c0]">target</span> <span class="text-[#c586c0]">add</span> <span class="text-[#ce9178]">wasm32-unknown-unknown</span></div>
                        <div><span class="text-[#c586c0]">fi</span></div>
                        <div><span class="text-[#c586c0]">if</span> ! <span class="text-[#dcdcaa]">command</span> <span class="text-[#c586c0]">-v</span> <span class="text-[#9cdcfe]">wasm-pack</span> <span class="text-[#c586c0]">&></span> <span class="text-[#ce9178]">/dev/null</span>; <span class="text-[#c586c0]">then</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"📦 Installing wasm-pack..."</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">curl</span> <span class="text-[#ce9178]">https://rustwasm.github.io/wasm-pack/installer/init.sh</span> <span class="text-[#c586c0]">-sSf</span> | <span class="text-[#dcdcaa]">sh</span></div>
                        <div><span class="text-[#c586c0]">fi</span></div>
                        <div><span class="text-[#6a9955]"># Build and verify output</span></div>
                        <div><span class="text-[#ce9178]">./scripts/rebuild-wasm.sh</span></div>
                        <div><span class="text-[#9cdcfe]">required_files</span>=(<span class="text-[#ce9178]">"frontend/src/lib/wasm/vectorize_wasm.js"</span> <span class="text-[#ce9178]">"frontend/src/lib/wasm/vectorize_wasm_bg.wasm"</span> ...)</div>
                        <div><span class="text-[#c586c0]">for</span> <span class="text-[#9cdcfe]">file</span> <span class="text-[#c586c0]">in</span> <span class="text-[#ce9178]">"$&#123;required_files[@]&#125;"</span>; <span class="text-[#c586c0]">do</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">if</span> [ ! <span class="text-[#c586c0]">-f</span> <span class="text-[#ce9178]">"$file"</span> ]; <span class="text-[#c586c0]">then</span></div>
                        <div class="pl-8"><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"❌ Required file missing: $file"</span></div>
                        <div class="pl-8"><span class="text-[#dcdcaa]">exit</span> <span class="text-[#b5cea8]">1</span></div>
                        <div class="pl-4"><span class="text-[#c586c0]">fi</span></div>
                        <div><span class="text-[#c586c0]">done</span></div>
                        <div><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"🎉 WASM build completed successfully for Vercel deployment!"</span></div>
                      </div>
                    </div>
                  {:else if activeSection === 'Performance & Optimization' && activeLanguage === 'Build Tools' && activeCodeStep === 3}
                    <!-- Type Generation -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">generate-types.sh</div>
                      </div>
                      <!-- Code content -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                        <div><span class="text-[#6a9955]">#!/bin/bash</span></div>
                        <div><span class="text-[#6a9955]"># Regenerate TypeScript types from Rust parameter registry</span></div>
                        <div><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"🔄 Generating TypeScript types from Rust parameter registry..."</span></div>
                        <div><span class="text-[#dcdcaa]">cd</span> <span class="text-[#ce9178]">../wasm/vectorize-core</span></div>
                        <div><span class="text-[#dcdcaa]">cargo</span> <span class="text-[#c586c0]">run</span> <span class="text-[#c586c0]">--bin</span> <span class="text-[#ce9178]">generate-types</span> <span class="text-[#c586c0]">--quiet</span> <span class="text-[#c586c0]">--</span> <span class="text-[#ce9178]">../../frontend/src/lib/types/generated-parameters.ts</span></div>
                        <div><span class="text-[#c586c0]">if</span> [ <span class="text-[#9cdcfe]">$?</span> <span class="text-[#c586c0]">-eq</span> <span class="text-[#b5cea8]">0</span> ]; <span class="text-[#c586c0]">then</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"✅ TypeScript types generated successfully"</span></div>
                        <div><span class="text-[#c586c0]">else</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"❌ Failed to generate TypeScript types"</span></div>
                        <div class="pl-4"><span class="text-[#dcdcaa]">exit</span> <span class="text-[#b5cea8]">1</span></div>
                        <div><span class="text-[#c586c0]">fi</span></div>
                        <div><span class="text-[#dcdcaa]">cd</span> <span class="text-[#ce9178]">../../frontend</span></div>
                        <div><span class="text-[#dcdcaa]">echo</span> <span class="text-[#ce9178]">"🏁 Type generation complete!"</span></div>
                      </div>
                    </div>
                  {:else}
                    <!-- Default placeholder for unimplemented code snippets -->
                    <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                      <!-- VS Code-style header -->
                      <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                        <div class="flex items-center gap-1">
                          <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                          <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                        </div>
                        <div class="ml-4 text-[#cccccc] text-xs font-mono">{currentCodeTitle || 'Code Sample'}</div>
                      </div>
                      <!-- Code content placeholder -->
                      <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto flex items-center justify-center" style="height: calc(100% - 24px);">
                        <div class="text-center text-gray-400">
                          <div class="text-lg mb-2">📝</div>
                          <div class="text-sm">Code sample for</div>
                          <div class="text-xs text-primary mt-1">{currentCodeTitle}</div>
                          <div class="text-xs text-gray-500 mt-1">will be implemented next</div>
                        </div>
                      </div>
                    </div>
                  {/if}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tech Stack Showcase -->
        <div class="w-full flex justify-center mt-8 lg:mt-16 px-4 lg:px-0">
          <div class="grid py-[20px] lg:py-[25px] px-[20px] lg:px-[57px] bg-[#F3F4F6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] grid-cols-1 lg:grid-cols-4 grid-rows-auto lg:grid-rows-3 gap-x-2 lg:gap-x-4 gap-y-3">
            <!-- Title - positioned in grid -->
            <div class="text-text-heading text-[20px] lg:text-[26px] font-inter text-center font-semibold col-span-1 lg:col-span-4 row-span-1 mb-2 lg:mb-0">
              Technology Stack
            </div>

            <!-- Row 2 Tech Cards -->
            <!-- Rust -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[150px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__rust-icon.svg" alt="Rust" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-black font-inter font-medium">Rust</div>
            </div>

            <!-- SvelteKit -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[114px] lg:pl-4 bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__sveltekit-icon.svg" alt="SvelteKit" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-black font-inter font-medium">SvelteKit</div>
            </div>

            <!-- Vercel -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[135px] lg:pl-[9px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__vercel-icon.svg" alt="Vercel" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-black font-inter font-medium">Vercel</div>
            </div>

            <!-- Formspark -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[120px] lg:pl-[10px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__formspark-icon.svg" alt="Formspark" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-black font-inter font-medium">Formspark</div>
            </div>

            <!-- Row 3 Tech Cards -->
            <!-- WebAssembly -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[80px] lg:pl-[8px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__wasm-icon.svg" alt="WebAssembly" class="w-[34px] h-[34px]" />
              </div>
              <div class="text-black font-inter font-medium">WebAssembly</div>
            </div>

            <!-- Turnstile -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[125px] lg:pl-[12px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__turnstile-icon.svg" alt="Turnstile" class="w-[32px] h-[32px]" />
              </div>
              <div class="text-black font-inter font-medium">Turnstile</div>
            </div>

            <!-- TypeScript -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[110px] lg:pl-[13px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__typescript-icon.svg" alt="TypeScript" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-black font-inter font-medium">TypeScript</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>

  <footer class="w-full bg-bg-dark flex justify-center">
    <Footer />
  </footer>
</div>