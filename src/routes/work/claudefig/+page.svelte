<script lang="ts">
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';

  // Section tab state
  let activeSection = $state<string>('Interactive TUI');
  let activeImageStep = $state<number>(0);

  const sections = ['Interactive TUI', 'CLI Commands'];

  // Image steps keyed by section
  const imageSteps: Record<string, { title: string; image: string }[]> = {
    'Interactive TUI': [
      { title: 'Table of Contents', image: 'claudefig/claudefig__TUI_tableofcontents.png' },
      { title: 'Config Menu', image: 'claudefig/claudefig__TUI_configmenu.png' },
      { title: 'Project Overview Stats', image: 'claudefig/claudefig__TUI_projectoverviewstatscreen.png' },
      { title: 'File Instance System', image: 'claudefig/claudefig__TUI_fileinstancesystem.png' },
      { title: 'Presets Screen', image: 'claudefig/claudefig__TUI_presetsscreen.png' },
      { title: 'Create from Repo', image: 'claudefig/claudefig__TUI_presetcreatefromreposcreen.png' },
      { title: 'Initialize Project', image: 'claudefig/claudefig__TUI_initializeprojectscreen.png' }
    ],
    'CLI Commands': [
      { title: 'Help Command', image: 'claudefig/claudefig__CLI_helpcommandshowcase.png' },
      { title: 'Show Command', image: 'claudefig/claudefig__CLI_showcommand.png' },
      { title: 'Component Breakdown', image: 'claudefig/claudefig__CLI_componentbreakdownsystem.png' },
      { title: 'Validation System', image: 'claudefig/claudefig__CLI_validationsystem.png' },
      { title: 'Preset Validation', image: 'claudefig/claudefig__CLI_presetvalidationsystem.png' }
    ]
  };

  // Derived values
  const currentSteps = $derived(imageSteps[activeSection] || []);
  const totalSteps = $derived(currentSteps.length);
  const currentImageStep = $derived(currentSteps[activeImageStep]);

  function setActiveSection(section: string) {
    activeSection = section;
    activeImageStep = 0;
  }

  function previousImage() {
    activeImageStep = activeImageStep > 0 ? activeImageStep - 1 : totalSteps - 1;
  }

  function nextImage() {
    activeImageStep = activeImageStep < totalSteps - 1 ? activeImageStep + 1 : 0;
  }
</script>

<svelte:head>
  <title>claudefig - Joshua McDonald</title>
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
              claudefig
            </h1>
            <a
              href="https://github.com/robmcdonald5/claudefig"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-text-heading hover:bg-[#4D4D4D] transition-colors duration-200 text-white flex-shrink-0"
              aria-label="View claudefig on GitHub"
            >
              <svg class="w-4 h-4 lg:w-6 lg:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </div>
          <p class="text-text-heading text-sm lg:text-lg font-inter text-center max-w-[650px] lg:max-w-[900px] px-4 lg:px-0">
            Universal configuration management CLI/TUI for Claude Code projects. Manage presets, file instances, and project initialization with a scriptable CLI and an interactive Textual-based TUI.
          </p>
        </div>

        <!-- Project Overview -->
        <div class="w-full flex justify-center mb-8 lg:mb-12 px-4 lg:px-0">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 w-full max-w-[850px]">
            <!-- Problem Card -->
            <div class="flex flex-col gap-2 bg-[#F9FAFB] rounded-xl p-5">
              <span class="text-primary text-xs font-inter font-semibold uppercase tracking-wider">Problem</span>
              <p class="text-text-heading text-sm font-inter">
                Coding CLI tools lack a standard way to manage complex configurations across
                environments. Settings are scattered, hard to share, and tedious to set up for new projects.
              </p>
            </div>
            <!-- Solution Card -->
            <div class="flex flex-col gap-2 bg-[#F9FAFB] rounded-xl p-5">
              <span class="text-primary text-xs font-inter font-semibold uppercase tracking-wider">Solution</span>
              <p class="text-text-heading text-sm font-inter">
                A dual-interface tool with a CLI for automation and an interactive TUI for
                exploration, with a preset system for sharing and reusing configurations.
              </p>
            </div>
            <!-- Outcome Card -->
            <div class="flex flex-col gap-2 bg-[#F9FAFB] rounded-xl p-5">
              <span class="text-primary text-xs font-inter font-semibold uppercase tracking-wider">Outcome</span>
              <p class="text-text-heading text-sm font-inter">
                Published on PyPI. Supports file instances, preset import/export, project
                initialization, and full config validation. All from the terminal.
              </p>
            </div>
          </div>
        </div>

        <!-- Section Tabs -->
        <div class="w-full flex justify-center mb-6 lg:mb-8 px-4 lg:px-0">
          <div class="flex flex-wrap justify-center gap-2 lg:gap-4">
            {#each sections as section}
              <button
                class="px-4 lg:px-6 py-1.5 lg:py-2 rounded-full border text-xs lg:text-sm font-inter font-medium transition-all duration-200 {activeSection === section ? 'bg-primary text-white border-primary' : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:border-primary'}"
                onclick={() => setActiveSection(section)}
              >
                {section}
              </button>
            {/each}
          </div>
        </div>

        <!-- Image Carousel (browser-chrome style) -->
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

        <!-- Step Indicator Dots -->
        <div class="w-full flex justify-center gap-2 mb-8 lg:mb-16">
          {#each currentSteps as _, i}
            <button
              class="w-2.5 h-2.5 rounded-full transition-all duration-200 {activeImageStep === i ? 'bg-primary scale-125' : 'bg-[#D1D5DB] hover:bg-[#9CA3AF]'}"
              onclick={() => activeImageStep = i}
              aria-label="Go to image {i + 1}"
            ></button>
          {/each}
        </div>

        <!-- Tech Stack Showcase -->
        <div class="w-full flex justify-center mt-8 lg:mt-16 px-4 lg:px-0">
          <div class="grid py-[20px] lg:py-[25px] px-[20px] lg:px-[57px] bg-[#F3F4F6] rounded-lg shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] grid-cols-2 lg:grid-cols-4 grid-rows-auto gap-x-2 lg:gap-x-4 gap-y-3">
            <!-- Title -->
            <div class="text-text-heading text-[20px] lg:text-[26px] font-inter text-center font-semibold col-span-2 lg:col-span-4 row-span-1 mb-2 lg:mb-0">
              Technology Stack
            </div>

            <!-- Python -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[139px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__python-icon.svg" alt="Python" class="w-[28px] h-[29px]" />
              </div>
              <div class="text-black font-inter font-medium">Python</div>
            </div>

            <!-- Click -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[139px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__click-icon.svg" alt="Click" class="w-[40px] h-[40px]" />
              </div>
              <div class="text-black font-inter font-medium">Click</div>
            </div>

            <!-- Textual -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[139px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__textual-icon.svg" alt="Textual" class="w-[28px] h-[29px]" />
              </div>
              <div class="text-black font-inter font-medium">Textual</div>
            </div>

            <!-- TOML -->
            <div class="w-full lg:w-[230px] h-[56px] flex justify-start items-center flex-row gap-2 lg:gap-1 py-3 px-4 lg:pr-[139px] lg:pl-[15px] bg-[#F9FAFB] rounded-lg">
              <div>
                <img src="/tech-stack__toml-icon.svg" alt="TOML" class="w-[28px] h-[29px]" />
              </div>
              <div class="text-black font-inter font-medium">TOML</div>
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
