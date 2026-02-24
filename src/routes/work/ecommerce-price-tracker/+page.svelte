<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // State management for showcase display (placeholder for future implementation)
  let activeImageStep = $state(0);
  
  // Image steps for E-commerce Price Tracker showcase
  const imageSteps = [
    { title: 'website crawler interactive page', image: 'crawler__image.png' },
    { title: 'progress dashboard', image: 'dashboard__image.png' },
    { title: 'crawler initiation', image: '' },
    { title: 'scraper initiation', image: '' },
    { title: 'ui logic', image: '' }
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
  <title>E-Commerce Price Tracker + Scraper - Joshua McDonald</title>
</svelte:head>

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
              E-Commerce Tracker + Scraper
            </h1>
            <a
              href="https://github.com/robmcdonald5/deltaP"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-text-heading hover:bg-[#4D4D4D] transition-colors duration-200 text-white flex-shrink-0"
              aria-label="View E-Commerce Price Tracker on GitHub"
            >
              <svg class="w-4 h-4 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <p class="text-text-heading text-sm lg:text-lg font-inter text-center max-w-[650px] lg:max-w-[900px] px-4 lg:px-0">
            In progress development of price tracking & alert desktop application. Web scraping done with BeautifulSoup & Selenium. Application logic and visuals will use Python + TypeScript (Tauri). Storage and persistent data analysis / gen will use PostgreSQL. Finished product will be able to 'board' a website, scrape trackable data from them and allow for persistent tracking of specific targeted elements (price deltas, addition / removals to charts, etc..).
          </p>
        </div>

        <!-- Single Image Display -->
        <div class="w-full flex justify-center mb-8 lg:mb-16 px-4 lg:px-0">
          <div class="w-full max-w-[850px] flex flex-col">
            <!-- Title Card Header -->
            <div class="w-full h-[20px] bg-text-heading rounded-tl-md rounded-tr-md relative">
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
            <div class="w-full h-[300px] lg:h-[500px] flex justify-center items-center bg-[#1E1E1E] border-solid border-text-heading border-b-[6px] border-x-[6px] rounded-br-md rounded-bl-md shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]">
              <div class="w-full h-full flex justify-center items-center p-2 lg:p-3">
                {#if currentImageStep && currentImageStep.title === 'crawler initiation'}
                  <!-- VS Code-style code display for crawler initiation -->
                  <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                    <!-- VS Code-style header -->
                    <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                      <div class="flex items-center gap-1">
                        <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                      </div>
                      <div class="ml-4 text-[#cccccc] text-xs font-mono">Python</div>
                    </div>
                    <!-- Code content -->
                    <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                      <div><span class="text-[#9cdcfe]">options</span> = <span class="text-[#9cdcfe]">webdriver</span>.<span class="text-[#dcdcaa]">ChromeOptions</span>()</div>
                      <div><span class="text-[#9cdcfe]">options</span>.<span class="text-[#dcdcaa]">add_argument</span>(<span class="text-[#ce9178]">'--headless'</span>)</div>
                      <div><span class="text-[#c586c0]">try</span>:</div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">driver</span> = <span class="text-[#9cdcfe]">webdriver</span>.<span class="text-[#dcdcaa]">Chrome</span>(<span class="text-[#9cdcfe]">service</span>=<span class="text-[#dcdcaa]">ChromeService</span>(</div>
                      <div class="pl-8"><span class="text-[#dcdcaa]">ChromeDriverManager</span>().<span class="text-[#dcdcaa]">install</span>()), <span class="text-[#9cdcfe]">options</span>=<span class="text-[#9cdcfe]">options</span>)</div>
                      <div class="mt-1"></div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">driver</span>.<span class="text-[#dcdcaa]">get</span>(<span class="text-[#9cdcfe]">url</span>)</div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">soup</span> = <span class="text-[#dcdcaa]">BeautifulSoup</span>(<span class="text-[#9cdcfe]">driver</span>.<span class="text-[#9cdcfe]">page_source</span>, <span class="text-[#ce9178]">'html.parser'</span>)</div>
                      <div class="mt-1"></div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">title_element</span> = <span class="text-[#9cdcfe]">soup</span>.<span class="text-[#dcdcaa]">select_one</span>(<span class="text-[#ce9178]">'h1.product-title'</span>)</div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">price_element</span> = <span class="text-[#9cdcfe]">soup</span>.<span class="text-[#dcdcaa]">select_one</span>(<span class="text-[#ce9178]">'span.price-tag'</span>)</div>
                      <div class="mt-1"></div>
                      <div class="pl-4"><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">title_element</span> <span class="text-[#c586c0]">and</span> <span class="text-[#9cdcfe]">price_element</span>:</div>
                      <div class="pl-8"><span class="text-[#9cdcfe]">product_data</span> = &#123;</div>
                      <div class="pl-12"><span class="text-[#ce9178]">'title'</span>: <span class="text-[#9cdcfe]">title_element</span>.<span class="text-[#dcdcaa]">get_text</span>(<span class="text-[#9cdcfe]">strip</span>=<span class="text-[#569cd6]">True</span>),</div>
                      <div class="pl-12"><span class="text-[#ce9178]">'price'</span>: <span class="text-[#9cdcfe]">price_element</span>.<span class="text-[#dcdcaa]">get_text</span>(<span class="text-[#9cdcfe]">strip</span>=<span class="text-[#569cd6]">True</span>)</div>
                      <div class="pl-8">&#125;</div>
                      <div class="pl-8"><span class="text-[#dcdcaa]">print</span>(<span class="text-[#9cdcfe]">json</span>.<span class="text-[#dcdcaa]">dumps</span>(<span class="text-[#9cdcfe]">product_data</span>))</div>
                      <div class="pl-4"><span class="text-[#c586c0]">else</span>:</div>
                      <div class="pl-8"><span class="text-[#dcdcaa]">print</span>(<span class="text-[#9cdcfe]">json</span>.<span class="text-[#dcdcaa]">dumps</span>(&#123;<span class="text-[#ce9178]">'error'</span>: <span class="text-[#ce9178]">'Could not find product information.'</span>&#125;))</div>
                      <div class="mt-1"></div>
                      <div><span class="text-[#c586c0]">except</span> <span class="text-[#dcdcaa]">Exception</span> <span class="text-[#c586c0]">as</span> <span class="text-[#9cdcfe]">e</span>:</div>
                      <div class="pl-4"><span class="text-[#dcdcaa]">print</span>(<span class="text-[#9cdcfe]">json</span>.<span class="text-[#dcdcaa]">dumps</span>(&#123;<span class="text-[#ce9178]">'error'</span>: <span class="text-[#dcdcaa]">str</span>(<span class="text-[#9cdcfe]">e</span>)&#125;))</div>
                      <div><span class="text-[#c586c0]">finally</span>:</div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">driver</span>.<span class="text-[#dcdcaa]">quit</span>()</div>
                      <div class="mb-2"></div>
                    </div>
                  </div>
                {:else if currentImageStep && currentImageStep.title === 'scraper initiation'}
                  <!-- VS Code-style code display for scraper initiation -->
                  <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                    <!-- VS Code-style header -->
                    <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                      <div class="flex items-center gap-1">
                        <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                      </div>
                      <div class="ml-4 text-[#cccccc] text-xs font-mono">Python</div>
                    </div>
                    <!-- Code content -->
                    <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                      <div><span class="text-[#9cdcfe]">postgrest_url</span> = <span class="text-[#ce9178]">'http://localhost:3000/products'</span></div>
                      <div><span class="text-[#9cdcfe]">headers</span> = &#123;<span class="text-[#ce9178]">'Content-Type'</span>: <span class="text-[#ce9178]">'application/json'</span>&#125;</div>
                      <div class="mt-1"></div>
                      <div><span class="text-[#c586c0]">try</span>:</div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">response</span> = <span class="text-[#9cdcfe]">requests</span>.<span class="text-[#dcdcaa]">post</span>(<span class="text-[#9cdcfe]">postgrest_url</span>, <span class="text-[#9cdcfe]">headers</span>=<span class="text-[#9cdcfe]">headers</span>, <span class="text-[#9cdcfe]">json</span>=<span class="text-[#9cdcfe]">product_data</span>)</div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">response</span>.<span class="text-[#dcdcaa]">raise_for_status</span>()</div>
                      <div class="pl-4"><span class="text-[#dcdcaa]">print</span>(<span class="text-[#9cdcfe]">json</span>.<span class="text-[#dcdcaa]">dumps</span>(&#123;<span class="text-[#ce9178]">'success'</span>: <span class="text-[#ce9178]">'Data stored successfully.'</span>&#125;))</div>
                      <div><span class="text-[#c586c0]">except</span> <span class="text-[#9cdcfe]">requests</span>.<span class="text-[#9cdcfe]">exceptions</span>.<span class="text-[#dcdcaa]">RequestException</span> <span class="text-[#c586c0]">as</span> <span class="text-[#9cdcfe]">e</span>:</div>
                      <div class="pl-4"><span class="text-[#dcdcaa]">print</span>(<span class="text-[#9cdcfe]">json</span>.<span class="text-[#dcdcaa]">dumps</span>(&#123;<span class="text-[#ce9178]">'error'</span>: <span class="text-[#ce9178]">f'Could not store data: &#123;e&#125;'</span>&#125;))</div>
                      <div class="mt-1"></div>
                      <div class="mt-1"></div>
                      <div class="text-[#6a9955]"># In your scrape_product_info function, after successfully scraping:</div>
                      <div><span class="text-[#c586c0]">if</span> <span class="text-[#9cdcfe]">title_element</span> <span class="text-[#c586c0]">and</span> <span class="text-[#9cdcfe]">price_element</span>:</div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">product_data</span> = &#123;</div>
                      <div class="pl-8"><span class="text-[#ce9178]">'title'</span>: <span class="text-[#9cdcfe]">title_element</span>.<span class="text-[#dcdcaa]">get_text</span>(<span class="text-[#9cdcfe]">strip</span>=<span class="text-[#569cd6]">True</span>),</div>
                      <div class="pl-8"><span class="text-[#ce9178]">'price'</span>: <span class="text-[#9cdcfe]">price_element</span>.<span class="text-[#dcdcaa]">get_text</span>(<span class="text-[#9cdcfe]">strip</span>=<span class="text-[#569cd6]">True</span>)</div>
                      <div class="pl-8"><span class="text-[#6a9955]"># variable logic will go below</span></div>
                      <div class="pl-4">&#125;</div>
                      <div class="mb-2"></div>
                    </div>
                  </div>
                {:else if currentImageStep && currentImageStep.title === 'ui logic'}
                  <!-- VS Code-style code display for ui logic -->
                  <div class="w-full h-full bg-[#1e1e1e] rounded-lg overflow-hidden">
                    <!-- VS Code-style header -->
                    <div class="h-[24px] bg-[#323233] flex items-center px-2 border-b border-[#2d2d30]">
                      <div class="flex items-center gap-1">
                        <div class="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                        <div class="w-3 h-3 rounded-full bg-[#27ca3f]"></div>
                      </div>
                      <div class="ml-4 text-[#cccccc] text-xs font-mono">TypeScript</div>
                    </div>
                    <!-- Code content -->
                    <div class="p-2 lg:p-3 text-[10px] lg:text-xs font-mono leading-tight text-[#d4d4d4] overflow-auto" style="height: calc(100% - 24px);">
                      <div><span class="text-[#c586c0]">async</span> <span class="text-[#c586c0]">function</span> <span class="text-[#dcdcaa]">trackProduct</span>(<span class="text-[#9cdcfe]">url</span>: <span class="text-[#4ec9b0]">string</span>) &#123;</div>
                      <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">outputDiv</span> = <span class="text-[#9cdcfe]">document</span>.<span class="text-[#dcdcaa]">getElementById</span>(<span class="text-[#ce9178]">'output'</span>);</div>
                      <div class="pl-4"><span class="text-[#c586c0]">if</span> (!<span class="text-[#9cdcfe]">outputDiv</span>) <span class="text-[#c586c0]">return</span>;</div>
                      <div class="mt-1"></div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">outputDiv</span>.<span class="text-[#9cdcfe]">innerHTML</span> = <span class="text-[#ce9178]">'Scraping...'</span>;</div>
                      <div class="mt-1"></div>
                      <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">command</span> = <span class="text-[#c586c0]">new</span> <span class="text-[#dcdcaa]">Command</span>(<span class="text-[#ce9178]">'python'</span>, [<span class="text-[#ce9178]">'-u'</span>, <span class="text-[#ce9178]">'path/to/your/scraper.py'</span>, <span class="text-[#9cdcfe]">url</span>]);</div>
                      <div class="pl-4"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">child</span> = <span class="text-[#c586c0]">await</span> <span class="text-[#9cdcfe]">command</span>.<span class="text-[#dcdcaa]">spawn</span>();</div>
                      <div class="mt-1"></div>
                      <div class="pl-4"><span class="text-[#9cdcfe]">command</span>.<span class="text-[#9cdcfe]">stdout</span>.<span class="text-[#dcdcaa]">on</span>(<span class="text-[#ce9178]">'data'</span>, (<span class="text-[#9cdcfe]">line</span>: <span class="text-[#4ec9b0]">string</span>) => &#123;</div>
                      <div class="pl-8"><span class="text-[#c586c0]">try</span> &#123;</div>
                      <div class="pl-12"><span class="text-[#c586c0]">const</span> <span class="text-[#9cdcfe]">data</span> = <span class="text-[#dcdcaa]">JSON</span>.<span class="text-[#dcdcaa]">parse</span>(<span class="text-[#9cdcfe]">line</span>);</div>
                      <div class="pl-12"><span class="text-[#c586c0]">if</span> (<span class="text-[#9cdcfe]">data</span>.<span class="text-[#9cdcfe]">error</span>) &#123;</div>
                      <div class="pl-16"><span class="text-[#9cdcfe]">outputDiv</span>.<span class="text-[#9cdcfe]">innerHTML</span> = <span class="text-[#ce9178]">`&lt;p&gt;Error: $&#123;data.error&#125;&lt;/p&gt;`</span>;</div>
                      <div class="pl-12">&#125; <span class="text-[#c586c0]">else</span> &#123;</div>
                      <div class="pl-16"><span class="text-[#9cdcfe]">outputDiv</span>.<span class="text-[#9cdcfe]">innerHTML</span> = <span class="text-[#ce9178]">`</span></div>
                      <div class="pl-20"><span class="text-[#ce9178]">&lt;h2&gt;$&#123;data.title&#125;&lt;/h2&gt;</span></div>
                      <div class="pl-20"><span class="text-[#ce9178]">&lt;p&gt;Price: $&#123;data.price&#125;&lt;/p&gt;</span></div>
                      <div class="pl-16"><span class="text-[#ce9178]">`</span>;</div>
                      <div class="pl-12">&#125;</div>
                      <div class="pl-8">&#125; <span class="text-[#c586c0]">catch</span> (<span class="text-[#9cdcfe]">e</span>) &#123;</div>
                      <div class="pl-12"><span class="text-[#9cdcfe]">outputDiv</span>.<span class="text-[#9cdcfe]">innerHTML</span> = <span class="text-[#ce9178]">`&lt;p&gt;Error parsing data from scraper.&lt;/p&gt;`</span>;</div>
                      <div class="pl-8">&#125;</div>
                      <div class="pl-4">&#125;);</div>
                      <div>&#125;</div>
                      <div class="mb-2"></div>
                    </div>
                  </div>
                {:else if currentImageStep}
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
            <div class="text-text-heading text-[20px] lg:text-[26px] font-inter text-center font-semibold col-span-1 lg:col-span-4 row-span-1 mb-2 lg:mb-0">
              Technology Stack
            </div>
            
            <!-- Row 2 Tech Cards -->
            <!-- Python -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3.5 px-4 lg:pr-[128px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__python-icon.svg" alt="Python" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-black font-inter font-medium">Python</div>
            </div>
            
            <!-- TypeScript -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3.5 px-4 lg:pr-[99px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__typescript-icon.svg" alt="TypeScript" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-black font-inter font-medium">TypeScript</div>
            </div>
            
            <!-- Tauri -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[145px] lg:pl-[11px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__tauri-icon.svg" alt="Tauri" class="w-[32px] h-[36px]" />
              </div>
              <div class="text-black font-inter font-medium">Tauri</div>
            </div>
            
            <!-- PostgreSQL -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[115px] lg:pl-[11px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__postgres-icon.svg" alt="PostgreSQL" class="w-[32px] h-[33px]" />
              </div>
              <div class="text-black font-inter font-medium">PostgreSQL</div>
            </div>
            
            <!-- Row 3 Tech Cards -->
            <!-- BeautifulSoup -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[71px] lg:pl-[13px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__beautifulsoup-icon.svg" alt="BeautifulSoup" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-black font-inter font-medium">BeautifulSoup</div>
            </div>
            
            <!-- Selenium -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[122px] lg:pl-[13px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__selenium-icon.svg" alt="Selenium" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-black font-inter font-medium">Selenium</div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-bg-footer flex justify-center">
    <Footer />
  </footer>
</div>