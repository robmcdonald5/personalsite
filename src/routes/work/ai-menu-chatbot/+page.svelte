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
      </section>
    </div>

    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-[#F5F5F5] flex justify-center">
    <Footer />
  </footer>
</div>