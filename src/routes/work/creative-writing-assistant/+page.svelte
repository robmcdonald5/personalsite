<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
  <title>AI Creative Writing Assistant - Joshua McDonald</title>
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
              AI Creative Writing Assistant
            </h1>
            <a
              href="https://github.com/robmcdonald5/AI-Menu-Chatbot"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-text-heading hover:bg-[#4D4D4D] transition-colors duration-200 text-white flex-shrink-0"
              aria-label="View AI Creative Writing Assistant on GitHub"
            >
              <svg class="w-4 h-4 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <p class="text-text-heading text-sm lg:text-lg font-inter text-center max-w-[650px] lg:max-w-[800px] px-4 lg:px-0">
            In progress development of AI creative writing assistant / web app. Leverages agentic framework using LangChain to help users properly utilize AI for creative writing. More soon..
          </p>
        </div>

        <!-- Coming Soon Section -->
        <div class="flex justify-center items-center mb-[60px] lg:mb-[120px]">
          <span class="text-black text-xl lg:text-3xl font-inter text-center font-bold">
            Coming Soon..
          </span>
        </div>

        <!-- Features Section -->
        <div class="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-[113px] mb-[60px] lg:mb-[120px] px-4 lg:px-0">
          <!-- Edit Feature -->
          <div class="w-full lg:w-[248px] flex flex-col gap-[13px] text-center lg:text-left">
            <div class="text-primary text-2xl font-dm-sans font-bold">
              edit
            </div>
            <div class="text-text-heading text-2xl font-inter font-semibold">
              Mutate Existing Work
            </div>
            <div class="text-[#6B7280] text-sm font-inter">
              Leverage easy to use framework to edit existing writing you have with specific style guides.
            </div>
          </div>

          <!-- Create Feature -->
          <div class="w-full lg:w-[209px] flex flex-col gap-[13px] text-center lg:text-left">
            <div class="text-primary text-2xl font-dm-sans font-bold">
              create
            </div>
            <div class="text-text-heading text-2xl font-inter font-semibold">
              Write New Stories
            </div>
            <div class="text-[#6B7280] text-sm font-inter">
              Use LLMs such as ChatGPT, Claude, & Gemini to write new stories like a pro would.
            </div>
          </div>

          <!-- Pipeline Feature -->
          <div class="w-full lg:w-[227px] flex flex-col gap-[13px] text-center lg:text-left">
            <div class="text-primary text-2xl font-dm-sans font-bold">
              pipeline
            </div>
            <div class="text-text-heading text-2xl font-inter font-semibold">
              Agentic Framework
            </div>
            <div class="text-[#6B7280] text-sm font-inter">
              Build custom frameworks to create a writing style for AI you see fit.
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
            
            <!-- Python -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3.5 px-4 lg:pr-[128px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__python-icon.svg" alt="Python" class="w-[28px] h-[28px]" />
              </div>
              <div class="text-black font-inter font-medium">Python</div>
            </div>
            
            <!-- PostgreSQL -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[115px] lg:pl-[11px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__postgres-icon.svg" alt="PostgreSQL" class="w-[32px] h-[33px]" />
              </div>
              <div class="text-black font-inter font-medium">PostgreSQL</div>
            </div>
            
            <!-- Row 3 Tech Cards -->
            <!-- FastAPI -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[124px] lg:pl-[13px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__fastapi-icon.svg" alt="FastAPI" class="w-[30px] h-[30px]" />
              </div>
              <div class="text-black font-inter font-medium">FastAPI</div>
            </div>
            
            <!-- LangChain -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-[18px] px-4 lg:pr-[101px] lg:pl-[3px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__langchain-icon.svg" alt="LangChain" class="w-[40px] h-[20px]" />
              </div>
              <div class="text-black font-inter font-medium">LangChain</div>
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

    <div class="w-full h-[4px] gradient-divider"></div>
  </main>

  <footer class="w-full bg-bg-footer flex justify-center">
    <Footer />
  </footer>
</div>