<script>
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  
  // State management for showcase display
  let activeSection = $state('Natural Language Intent Parsing');
  let activeLanguage = $state('Python');
  
  // Navigation sections with their corresponding icons
  const sections = [
    { name: 'Natural Language Intent Parsing', icon: 'nlp_nav_icon.svg' },
    { name: 'Intent Fine-Tuning', icon: 'intent_nav_icon.svg' },
    { name: 'Interactive Chat Interface', icon: 'interactive_chat_nav_icon.svg' },
    { name: 'Backend API & Data Persistence', icon: 'backend_nav_icon.svg' }
  ];
  
  // @ts-ignore
  function setActiveSection(section) {
    activeSection = section;
  }
  
  // @ts-ignore
  function setActiveLanguage(language) {
    activeLanguage = language;
  }
</script>

<svelte:head>
  <title>Chipotle AI Menu - Joshua McDonald</title>
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
            Chipotle AI Menu
          </h1>
          <p class="text-[#2D2D2D] text-lg font-inter text-center max-w-[650px]">
            Conversational AI chatbot that lets users place Chipotle orders using natural language — built with React, MongoDB, Flask, spaCy, NLTK, PyTorch.
          </p>
        </div>

        <!-- Navigation Tabs -->
        <div class="w-full flex justify-center mb-8">
          <div class="flex gap-8">
            {#each sections as section}
              <button
                class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 {activeSection === section.name ? 'bg-[#4A90E2] text-white border-[#4A90E2]' : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-[#4A90E2]'}"
                onclick={() => setActiveSection(section.name)}
              >
                <img src="/{section.icon}" alt="{section.name}" class="w-4 h-4" />
                <span class="text-sm font-medium">{section.name}</span>
              </button>
            {/each}
          </div>
        </div>

        <!-- Main Display Area -->
        <div class="w-full max-w-[1200px] mx-auto flex gap-8 items-start">
          <!-- Left Side - Image Showcase -->
          <div class="flex-1 max-w-[580px]">
            <!-- Image Container -->
            <div class="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
              <div class="h-[400px] bg-[#FAFAFA] flex items-center justify-center">
                <!-- Placeholder for pipeline image -->
                <div class="w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <div class="text-gray-400 text-sm">Pipeline Visualization</div>
                </div>
              </div>
              
              <!-- Navigation Footer -->
              <div class="h-[60px] bg-white border-t border-[#E5E7EB] flex items-center justify-center gap-4">
                <button class="p-2 hover:bg-gray-50 rounded" aria-label="Previous pipeline step">
                  <svg class="w-4 h-4 text-gray-600 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
                <span class="text-sm font-medium text-[#2D2D2D]">NLP Pipeline</span>
                <button class="p-2 hover:bg-gray-50 rounded" aria-label="Next pipeline step">
                  <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Right Side - Code Showcase -->
          <div class="flex-1 max-w-[480px]">
            <div class="bg-white border border-[#E5E7EB] rounded-lg overflow-hidden shadow-sm">
              <!-- Code Title Bar -->
              <div class="h-[50px] bg-[#F9FAFB] border-b border-[#E5E7EB] flex items-center px-6">
                <span class="text-sm font-medium text-[#2D2D2D]">Precomputing Intent Embeddings</span>
              </div>

              <!-- Language Tabs -->
              <div class="bg-[#F3F4F6] border-b border-[#E5E7EB] px-6 pt-4">
                <div class="flex gap-1">
                  <button
                    class="px-6 py-2 text-sm font-medium rounded-t-md transition-all {activeLanguage === 'Python' ? 'bg-white text-[#1F2937] border-b-2 border-[#4A90E2]' : 'text-[#6B7280] hover:text-[#1F2937]'}"
                    onclick={() => setActiveLanguage('Python')}
                  >
                    Python
                  </button>
                  <button
                    class="px-6 py-2 text-sm font-medium rounded-t-md transition-all {activeLanguage === 'JSON' ? 'bg-white text-[#1F2937] border-b-2 border-[#4A90E2]' : 'text-[#6B7280] hover:text-[#1F2937]'}"
                    onclick={() => setActiveLanguage('JSON')}
                  >
                    JSON
                  </button>
                </div>
              </div>

              <!-- Code Display Area -->
              <div class="h-[350px] bg-white p-6">
                <div class="w-full h-full bg-[#1E1E1E] rounded-lg flex items-center justify-center">
                  <!-- Placeholder for code display -->
                  <div class="text-gray-400 text-sm">Code Display Area</div>
                </div>
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
            
            <!-- spaCy - between Flask and PyTorch (col 3, row 3) -->
            <div class="w-[230px] h-[56px] flex justify-start items-center pl-[17px] bg-[#F9FAFB] rounded-lg col-start-3 row-start-3">
              <img src="/tech-stack__spacy-icon+title.svg" alt="spaCy" class="w-[120px] h-[30px]" />
            </div>
            
            <!-- Row 2 Tech Cards -->
            <!-- React -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 pt-[13px] pb-[14.5px] pr-[139px] pl-[15px] bg-[#F9FAFB] rounded-lg col-start-1 row-start-2">
              <div>
                <img src="/tech-stack__react-icon.svg" alt="React" class="w-[29px] h-[29px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">React</div>
            </div>
            
            <!-- Next.js -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 pt-[13px] pb-[13px] pr-[130px] pl-[13px] bg-[#F9FAFB] rounded-lg col-start-2 row-start-2">
              <div>
                <img src="/tech-stack__nextjs-icon.svg" alt="Next.js" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Next.js</div>
            </div>
            
            <!-- Heroku -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-[13px] pr-[127px] pl-4 bg-[#F9FAFB] rounded-lg col-start-3 row-start-2">
              <div>
                <img src="/tech-stack__heroku-icon.svg" alt="Heroku" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Heroku</div>
            </div>
            
            <!-- Python -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-[14px] pr-[128px] pl-[15px] bg-[#F9FAFB] rounded-lg col-start-4 row-start-2">
              <div>
                <img src="/tech-stack__python-icon.svg" alt="Python" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Python</div>
            </div>
            
            <!-- Row 3 Tech Cards -->
            <!-- MongoDB -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-[13px] pr-[120px] pl-[17px] bg-[#F9FAFB] rounded-lg col-start-1 row-start-3">
              <div>
                <img src="/tech-stack__mongodb-icon.svg" alt="MongoDB" class="w-[29px] h-[29px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">MongoDB</div>
            </div>
            
            <!-- Flask -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-[14px] pr-[143px] pl-[17px] bg-[#F9FAFB] rounded-lg col-start-2 row-start-3">
              <div>
                <img src="/tech-stack__flask-icon.svg" alt="Flask" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">Flask</div>
            </div>
            
            <!-- PyTorch -->
            <div class="w-[230px] h-[56px] flex justify-start items-center flex-row gap-1 py-[13px] pr-[120px] pl-[17px] bg-[#F9FAFB] rounded-lg col-start-4 row-start-3">
              <div>
                <img src="/tech-stack__pytorch-icon.svg" alt="PyTorch" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-[#000000] font-inter font-medium">PyTorch</div>
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