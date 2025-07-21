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
  
  function setActiveSection(section) {
    activeSection = section;
  }
  
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
        
        <!-- Showcase Display -->
        <div class="w-full max-w-[1440px] h-[611px] relative mx-auto mb-[60px]">
          <!-- Navigation Bar -->
          <div class="w-full h-[55px] flex justify-center items-center flex-row px-[167px] bg-[#FFFFFF] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] absolute top-0 left-0">
            {#each sections as section}
              <button
                class="flex justify-center items-start flex-row gap-1.5 pt-[17px] pb-[20px] px-3 {activeSection === section.name ? 'border-solid border-[#4A90E2] border-b-2' : ''}"
                onclick={() => setActiveSection(section.name)}
              >
                <div class="text-sm font-inter text-center font-medium {activeSection === section.name ? 'text-[#4A90E2]' : 'text-[#4B5563]'}">
                  {section.name}
                </div>
                <div>
                  <img src="/{section.icon}" alt="{section.name} icon" class="w-[18px] h-[18px]" />
                </div>
              </button>
            {/each}
          </div>
          
          <!-- Left Side - Image Showcase -->
          <div class="w-[580px] h-[458px] flex justify-center items-center flex-col absolute top-[135px] left-1/2 transform -translate-x-[640px]">
            <div class="w-[580px] h-[411px] flex justify-center items-center flex-row pb-[18px] px-[18px] bg-[#FFFFFF] border-solid border-[#EEEEEE] border-b border-x rounded-br-lg rounded-bl-lg">
              <div class="w-[544px] h-[393px] flex justify-center items-center flex-row pt-[71px] pb-[247px] pr-[49px] pl-[50px] bg-[#FAFAFA] rounded-lg">
                <div>
                  <img src="/pipeline-image.png" alt="pipeline image" class="w-[75px] h-[75px]" />
                </div>
              </div>
            </div>
            <div class="w-[580px] h-[65px] flex justify-center items-center flex-row bg-[#FFFFFF] border-solid border-[#EEEEEE] border-t border-x rounded-tl-lg rounded-tr-lg">
              <button class="mr-2" style="transform: rotate(-180deg)">
                <img src="/nav-button-prev.svg" alt="previous" class="w-[16px] h-[16px]" />
              </button>
              <button class="mr-4">
                <img src="/nav-button-next.svg" alt="next" class="w-[16px] h-[16px]" />
              </button>
              <div class="text-[#2D2D2D] text-sm font-inter font-medium">
                NLP Pipeline
              </div>
            </div>
          </div>
          
          <!-- Right Side - Code Showcase -->
          <div class="w-[480px] h-[440px] flex justify-start items-start flex-col absolute top-[171px] left-1/2 transform translate-x-[60px]">
            <!-- Code Title Bar -->
            <div class="w-[480px] h-[36px] flex justify-start items-center flex-row py-[9px] pr-[236px] pl-[20px] bg-[#F9FAFB] border-solid border-[#E5E7EB] border-b rounded-tl-xl rounded-tr-xl absolute left-0 top-[-36px]">
              <div class="text-[#2D2D2D] text-sm font-inter font-medium">
                Precomputing Intent Embeddings
              </div>
            </div>
            
            <!-- Language Tabs -->
            <div class="w-[480px] h-[65px] flex self-stretch justify-start items-start flex-row pt-[18px] pb-[17px] pr-[266px] pl-[24px] bg-[#F3F4F6]">
              <button
                class="w-[95px] h-[30px] flex justify-center items-center flex-row py-[7px] pr-[23px] pl-[24px] rounded-tl-md rounded-tr-md {activeLanguage === 'JSON' ? 'bg-[#FFFFFF] border-solid border-[#4A90E2] border-b-2' : ''}"
                onclick={() => setActiveLanguage('JSON')}
              >
                <div class="text-[#1F2937] text-sm font-inter text-center font-medium">
                  JSON
                </div>
              </button>
              <button
                class="w-[95px] h-[30px] flex justify-center items-center flex-row py-[7px] pr-[23px] pl-[24px] rounded-tl-md rounded-tr-md {activeLanguage === 'Python' ? 'bg-[#FFFFFF] border-solid border-[#4A90E2] border-b-2' : ''}"
                onclick={() => setActiveLanguage('Python')}
              >
                <div class="text-[#1F2937] text-sm font-inter text-center font-medium">
                  Python
                </div>
              </button>
            </div>
            
            <!-- Code Display Area -->
            <div class="w-[480px] h-[375px] flex self-stretch justify-center items-center flex-row pt-[47px] pb-[48px] px-[25px] bg-[#FFFFFF] rounded-br-xl rounded-bl-xl">
              <div class="w-[430px] h-[280px] flex justify-center items-center flex-row rounded-xl bg-gradient-to-b from-[rgba(37,37,37,0.05)] to-[rgba(37,37,37,0.05)] bg-cover bg-center">
                <img src="/code-display-placeholder.png" alt="code display" class="w-[430px] h-[280px] object-cover rounded-xl" />
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